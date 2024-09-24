const { astro } = require('iztro')
const ziwei = require('../data/ziwei.js')

function getShengNianSiHuas(life) {
    const shengNianSiHuas = []
    for (palace of life.palaces) {
        for (let star of palace.majorStars.concat(palace.minorStars)) {
            if (star.mutagen) {
                shengNianSiHuas.push([palace.heavenlyStem, palace.earthlyBranch, palace.name, star.name, star.mutagen])
            }
        }
    }
    return shengNianSiHuas
}

function getLiXinSiHuas(life) {
    const liXinSiHuas = []
    for (let gong of ziwei.GONGS) {
        const palace = life.palace(gong)
        for (let star of palace.majorStars.concat(palace.minorStars)) {
            const starSiHua = ziwei.SIHUAMAP[palace.heavenlyStem][star.name]
            if (starSiHua) {
                liXinSiHuas.push([palace.heavenlyStem, palace.earthlyBranch, gong, star.name, starSiHua])
            }
        }
    }
    return liXinSiHuas
}

function getXiangXinSiHuas(life) {
    const xiangXinSiHuas = []
    for (let gongFrom of ziwei.GONGS) {
        const palaceFrom = life.palace(gongFrom)
        const palaceTo = life.palace(ziwei.DUIGONGMAP[gongFrom])

        for (let star of palaceTo.majorStars.concat(palaceTo.minorStars)) {
            const starSiHua = ziwei.SIHUAMAP[palaceFrom.heavenlyStem][star.name]
            if (starSiHua) {
                xiangXinSiHuas.push([palaceFrom.heavenlyStem, palaceFrom.earthlyBranch, gongFrom, palaceTo.heavenlyStem, palaceTo.earthlyBranch, palaceTo.name, star.name, starSiHua])
            }
        }
    }
    return xiangXinSiHuas
}

function getRes(Content) {
    var life = astro.bySolar('1998-1-28', 9, '男')
    // console.log(JSON.stringify(life))
    // console.log(life.palace(4).majorStars[0])

    // console.log(life.palace('命宫').fliesTo('疾厄', '禄'))
    // console.log(life.palace('迁移').selfMutaged('忌'))

    const shengNianSiHuas = getShengNianSiHuas(life)
    const liXinSiHuas = getLiXinSiHuas(life)
    const xiangXinSiHuas = getXiangXinSiHuas(life)

    console.log(shengNianSiHuas)
    console.log(liXinSiHuas)
    console.log(xiangXinSiHuas)
}

module.exports = { getRes }