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
    let res = ''

    const life = astro.bySolar('1998-9-28', 9, '男')

    const shengNianSiHuas = getShengNianSiHuas(life)
    const liXinSiHuas = getLiXinSiHuas(life)
    const xiangXinSiHuas = getXiangXinSiHuas(life)
    const feiGongSiHuaMap = getFeiGongSiHuaMap(life)
    const sanHeGongMap = getSanHeGongMap(life)
    const siZhengGongMap = getSiZhengGongMap(life)
    const gongNanNvMap = getGongNanNvMap(life)

    res += `===紫微斗数解盘===`
    res += `\n\n【生年四化】`
    for (let item of shengNianSiHuas) {
        res += `\n${item[0]} ${item[1]} 生年化 ${item[2]}`
    }

    res += `\n\n【离心四化】`
    for (let item of liXinSiHuas) {
        res += `\n${item[0]} ↑ ${item[1]} 离心化 ${item[2]}`
    }

    res += `\n\n【向心四化】`
    for (let item of xiangXinSiHuas) {
        res += `\n${item[0]} → ${item[1]} ${item[2]} 向心化 ${item[3]}`
    }

    res += `\n\n【飞宫四化】`
    for (let item in feiGongSiHuaMap) {
        res += `\n${item}`
        for (let feigong of feiGongSiHuaMap[item]) {
            res += `\n    飞 ${feigong[0]} ${feigong[1]} 飞宫化 ${feigong[2]}`
        }
        res += `\n`
    }

    res += `\n\n【三合宫位】`
    for (let item in sanHeGongMap) {
        res += `\n${item}: ${sanHeGongMap[item][0]} ${sanHeGongMap[item][1]} ${sanHeGongMap[item][2]}`
    }

    res += `\n\n【四正宫位】`
    for (let item in siZhengGongMap) {
        res += `\n${item}: ${siZhengGongMap[item][0]} ${siZhengGongMap[item][1]} ${siZhengGongMap[item][2]} ${siZhengGongMap[item][3]}`
    }

    res += `\n\n【宫位男女】`
    for (let item in gongNanNvMap) {
        if (gongNanNvMap[item].length > 0) {
            res += `\n${item}: `
        }
        for (let star of gongNanNvMap[item]) {
            res += `${star[0]}${star[1]} `
        }
    }

    // console.log(shengNianSiHuas)
    // console.log(liXinSiHuas)
    // console.log(xiangXinSiHuas)
    // console.log(feiGongSiHuaMap)
    // console.log(sanHeGongMap)
    // console.log(siZhengGongMap)
    // console.log(gongNanNvMap)

    // console.log(res)
    return res
}

module.exports = { getRes }