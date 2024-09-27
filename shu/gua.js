const gua = require('../data/gua.js')
const { guaMap, guaShortMap } = getGuaMap()

function getGuaMap() {
    const guaMap = {}
    const guaShortMap = {}
    for (let item of gua.GUAS) {
        guaMap[item.name] = item
        guaShortMap[item.shortName] = item
    }
    return { guaMap, guaShortMap }
}

function getRes(Content) {
    let res = ''
    let item = guaMap[Content] || guaShortMap[Content]
    if (item) {
        res += `${item.symbol} ${item.name} ${item.shortName}卦 ${item.title}•${item.level}`
        res += `\n\n结构｜${item.struct}`
        res += `\n\n卦意｜${item.imagery}`
        res += `\n\n卦辞｜${item.guaci}`
        res += `\n\n推断｜${item.tuiduan}`
        res += `\n\n大象｜${item.daxiang}`
        res += `\n\n运势｜${item.yunshi}`
        res += `\n\n爱情｜${item.aiqing}`
        res += `\n\n疾病｜${item.jibing}`
        res += `\n\n失物｜${item.shiwu}`
        res += `\n\n诉讼｜${item.susong}`
    }
    return res
}

module.exports = { getRes }