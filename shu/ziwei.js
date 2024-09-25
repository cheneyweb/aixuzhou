const { astro } = require('iztro')
const ziwei = require('../data/ziwei.js')

// 生年四化 [宫,星,化]
function getShengNianSiHuas(life) {
    const shengNianSiHuas = []
    for (palace of life.palaces) {
        for (let star of palace.majorStars.concat(palace.minorStars)) {
            if (star.mutagen) {
                shengNianSiHuas.push([palace.name, star.name, star.mutagen])
            }
        }
    }
    return shengNianSiHuas
}

// 离心四化 [宫,星,化]
function getLiXinSiHuas(life) {
    const liXinSiHuas = []
    for (let gong of ziwei.GONGS) {
        const palace = life.palace(gong)
        for (let star of palace.majorStars.concat(palace.minorStars)) {
            const starSiHua = ziwei.SIHUAMAP[palace.heavenlyStem][star.name]
            if (starSiHua) {
                liXinSiHuas.push([gong, star.name, starSiHua])
            }
        }
    }
    return liXinSiHuas
}

// 向心四化 [来源宫,目的宫,星,化]
function getXiangXinSiHuas(life) {
    const xiangXinSiHuas = []
    for (let gongFrom of ziwei.GONGS) {
        const palaceFrom = life.palace(gongFrom)
        const palaceTo = life.palace(ziwei.DUIGONGMAP[gongFrom])

        for (let star of palaceTo.majorStars.concat(palaceTo.minorStars)) {
            const starSiHua = ziwei.SIHUAMAP[palaceFrom.heavenlyStem][star.name]
            if (starSiHua) {
                xiangXinSiHuas.push([gongFrom, palaceTo.name, star.name, starSiHua])
            }
        }
    }
    return xiangXinSiHuas
}

// 飞宫四化 {来源宫:[目的宫,星,化]}
function getFeiGongSiHuaMap(life) {
    const feiGongSiHuaMap = {}
    for (let gongFrom of ziwei.GONGS) {
        feiGongSiHuaMap[gongFrom] = []
        for (let gongTo of ziwei.GONGS) {
            const palaceFrom = life.palace(gongFrom)
            const palaceTo = life.palace(gongTo)
            for (let star of palaceTo.majorStars.concat(palaceTo.minorStars)) {
                const starSiHua = ziwei.SIHUAMAP[palaceFrom.heavenlyStem][star.name]
                if (starSiHua) {
                    feiGongSiHuaMap[gongFrom].push([gongTo, star.name, starSiHua])
                }
            }
        }
    }
    return feiGongSiHuaMap
}

// 三合宫位 {三合:[宫,宫,宫]}
function getSanHeGongMap(life) {
    const sanHeGongMap = {}
    for (let sanhe of ziwei.SANHES) {
        sanHeGongMap[sanhe] = []
        for (let i = 0; i < 3; i++) {
            for (palace of life.palaces) {
                if (sanhe[i] === palace.earthlyBranch) {
                    sanHeGongMap[sanhe].push(palace.name)
                }
            }
        }
    }
    return sanHeGongMap
}

// 四正宫位 {四正:[宫,宫,宫,宫]}
function getSiZhengGongMap(life) {
    const siZhengGongMap = {}
    for (let sizheng of ziwei.SIZHENGS) {
        siZhengGongMap[sizheng] = []
        for (let i = 0; i < 4; i++) {
            for (palace of life.palaces) {
                if (sizheng[i] === palace.earthlyBranch) {
                    siZhengGongMap[sizheng].push(palace.name)
                }
            }
        }
    }
    return siZhengGongMap
}

// 宫位男女星
function getGongNanNvMap(life) {
    const gongNanNvMap = {}
    for (let gong of ziwei.GONGS) {
        gongNanNvMap[gong] = []
        const palace = life.palace(gong)
        for (let star of palace.majorStars.concat(palace.minorStars)) {
            if (ziwei.NANXINGS.includes(star.name)) {
                gongNanNvMap[gong].push([star.name, '男'])
            } else if (ziwei.NVXINGS.includes(star.name)) {
                gongNanNvMap[gong].push([star.name, '女'])
            }
            if (star.name === '廉贞' && star.withMutagen('禄')) {
                gongNanNvMap[gong].push([star.name, '男'])
            } else if (star.name === '廉贞' && star.withMutagen('忌')) {
                gongNanNvMap[gong].push([star.name, '女'])
            } else if (star.name === '廉贞') {
                gongNanNvMap[gong].push([star.name, '禄男/忌女'])
            }
        }
    }
    return gongNanNvMap
}

function getRes(Content) {
    var life = astro.bySolar('1998-9-28', 9, '男')
    // console.log(JSON.stringify(life))
    // console.log(life.palace(4).majorStars[0])

    // console.log(life.palace('命宫').fliesTo('疾厄', '禄'))
    // console.log(life.palace('迁移').selfMutaged('忌'))

    const shengNianSiHuas = getShengNianSiHuas(life)
    const liXinSiHuas = getLiXinSiHuas(life)
    const xiangXinSiHuas = getXiangXinSiHuas(life)
    const feiGongSiHuaMap = getFeiGongSiHuaMap(life)
    const sanHeGongMap = getSanHeGongMap(life)
    const siZhengGongMap = getSiZhengGongMap(life)
    const gongNanNvMap = getGongNanNvMap(life)


    console.log(shengNianSiHuas)
    console.log(liXinSiHuas)
    console.log(xiangXinSiHuas)
    console.log(feiGongSiHuaMap)
    console.log(sanHeGongMap)
    console.log(siZhengGongMap)
    console.log(gongNanNvMap)
}

module.exports = { getRes }