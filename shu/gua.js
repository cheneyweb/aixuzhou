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
        res += `${item.name}(${item.shortName}卦 ${item.symbol})`
        res += `\n[结构]${item.struct}`
        res += `\n[卦题]${item.title}(${item.level})`
        res += `\n[卦意]${item.imagery}`
        res += `\n[卦辞]${item.guaci}`
        res += `\n[推断]${item.tuiduan}`
        res += `\n[大象]${item.daxiang}`
        res += `\n[运势]${item.yunshi}`
        res += `\n[爱情]${item.aiqing}`
        res += `\n[疾病]${item.jibing}`
        res += `\n[失物]${item.shiwu}`
        res += `\n[诉讼]${item.susong}`
    }
    return res
}

module.exports = { getRes }