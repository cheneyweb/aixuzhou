const lunar = require('./lunar.js')
const xiaoliuren = require('../data/xiaoliuren.js')

function getRes(Content) {
    const MENU_A = '小六壬'
    const MENU_B = '九宫小六壬'

    const cmd = Content.split(/\s+/)
    const n1 = +cmd[1]
    const n2 = +cmd[2]
    const n3 = +cmd[3]

    let res = ''
    let type = xiaoliuren.CHUANTONGS

    if ((cmd[0] !== MENU_A && cmd[0] !== MENU_B) || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        res = '【输入格式错误】，参考如下举例：\n小六壬 5 19 6\n或\n九宫小六壬 21 2 11'
    } else {
        if (cmd[0] === MENU_A) {
            res = `【传统小六壬】出卦 - `
        } else if (cmd[0] === MENU_B) {
            type = xiaoliuren.JIUGONGS
            res = `【九宫小六壬】出卦 - `
        }

        const lunarHour = lunar.getLunarHour()
        res += `${lunar.getLunarHourFormat(lunarHour)}\n`

        const tian = type[(n1 - 1) % type.length]
        const di = type[(n1 + n2 - 2) % type.length]
        const ren = type[(n1 + n2 + n3 - 3) % type.length]

        if (cmd[0] === MENU_A) {
            const filters = xiaoliuren.CHUANTONGS.filter(o => o.name !== tian.name && o.name !== di.name && o.name !== ren.name)

            res += `\n${xiaoliuren.CHUANTONGLIUQINMAP[ren.name][tian.name]} [${tian.name}] ${tian.liushou}|${tian.wuxing} ${xiaoliuren.SHIERZHANGSHENGMAP[tian.wuxing + lunarHour]}○`
            res += `\n${xiaoliuren.CHUANTONGLIUQINMAP[ren.name][di.name]} [${di.name}] ${di.liushou}|${di.wuxing} ${xiaoliuren.SHIERZHANGSHENGMAP[di.wuxing + lunarHour]}◐`
            res += `\n世位•人宫 [${ren.name}] ${ren.liushou}|${ren.wuxing} ${xiaoliuren.SHIERZHANGSHENGMAP[ren.wuxing + lunarHour]}●`

            res += `\n\n【六亲八卦十神】`
            for (let item of filters) {
                res += `\n${xiaoliuren.CHUANTONGLIUQINMAP[ren.name][item.name]} [${item.name}] ${item.liushou}|${item.wuxing} ${xiaoliuren.SHIERZHANGSHENGMAP[item.wuxing + lunarHour]}`
            }

            res += `\n\n【大象运势卦意】`
            res += `\n[${tian.name}] ${tian.title}；${tian.detail}\n`
            res += `\n[${di.name}] ${di.title}；${di.detail}\n`
            res += `\n[${ren.name}] ${ren.title}；${ren.detail}\n`
        } else if (cmd[0] === MENU_B) {
            const filters = xiaoliuren.JIUGONGS.filter(o => o.name !== tian.name && o.name !== di.name && o.name !== ren.name)

            res += `\n${xiaoliuren.JIUGONGLIUQINMAP[ren.name][tian.name]} [${tian.name}] ${tian.bagua}|${tian.wuxing} ${xiaoliuren.SHIERZHANGSHENGMAP[tian.wuxing + lunarHour]}○`
            res += `\n${xiaoliuren.JIUGONGLIUQINMAP[ren.name][di.name]} [${di.name}] ${di.bagua}|${di.wuxing} ${xiaoliuren.SHIERZHANGSHENGMAP[di.wuxing + lunarHour]}◐`
            res += `\n世位•人宫 [${ren.name}] ${ren.bagua}|${ren.wuxing} ${xiaoliuren.SHIERZHANGSHENGMAP[ren.wuxing + lunarHour]}●`

            res += `\n\n【六亲八卦十神】`
            for (let item of filters) {
                res += `\n${xiaoliuren.JIUGONGLIUQINMAP[ren.name][item.name]} [${item.name}] ${item.bagua}|${item.wuxing} ${xiaoliuren.SHIERZHANGSHENGMAP[item.wuxing + lunarHour]}`
            }

            res += `\n\n【大象运势卦意】`
            res += `\n[${tian.name}] ${tian.title}；${tian.detail}\n${tian.fangwei} ${tian.xing}\n`
            res += `\n[${di.name}] ${di.title}；${di.detail}\n${di.fangwei} ${di.xing}\n`
            res += `\n[${ren.name}] ${ren.title}；${ren.detail}\n${ren.fangwei} ${ren.xing}\n`
        }
    }

    return res
}

module.exports = { getRes }