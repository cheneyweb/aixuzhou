const lunar = require('./lunar.js')
const xiaoliuren = require('../data/xiaoliuren.js')

function getLiuQin() {

}

function getRes(Content) {
    const MENU_A = '小六壬'
    const MENU_B = '九宫小六壬'

    const cmd = Content.split(/\s+/)
    const n1 = +cmd[1]
    const n2 = +cmd[2]
    const n3 = +cmd[3]

    let res = ''
    let type = xiaoliuren.LICHUNFENGS

    if ((cmd[0] !== MENU_A && cmd[0] !== MENU_B) || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        res = '【输入格式错误】，参考如下举例：\n小六壬 5 19 6\n或\n九宫小六壬 21 2 11'
    } else {
        if (cmd[0] === MENU_A) {
            res = `【李淳风小六壬】出卦 - `
        } else if (cmd[0] === MENU_B) {
            type = xiaoliuren.JIUGONGS
            res = `【九宫小六壬】出卦 - `
        }

        res += `${lunar.getLunarHour()}\n`

        const tian = type[(n1 - 1) % type.length]
        const di = type[(n1 + n2 - 2) % type.length]
        const ren = type[(n1 + n2 + n3 - 3) % type.length]

        if (cmd[0] === MENU_A) {
            const filters = xiaoliuren.LICHUNFENGS.filter(o => o.name !== tian.name && o.name !== di.name && o.name !== ren.name)

            res += `\n${xiaoliuren.LICHUNFENGLIUQINMAP[ren.name][tian.name]} ${tian.name}：${tian.liushou}|${tian.wuxing} ○`
            res += `\n${xiaoliuren.LICHUNFENGLIUQINMAP[ren.name][di.name]} ${di.name}：${di.liushou}|${di.wuxing} ⦿`
            res += `\n世位 ${ren.name}：${ren.liushou}|${ren.wuxing} ●`

            res += `\n\n【六亲八卦】`
            for (let item of filters) {
                res += `\n${xiaoliuren.LICHUNFENGLIUQINMAP[ren.name][item.name]} ${item.name}：${item.liushou}|${item.wuxing}`
            }

            res += `\n\n【大象运势】`
            res += `\n[${tian.name}] ${tian.title}；${tian.detail}\n`
            res += `\n[${di.name}] ${di.title}；${di.detail}\n`
            res += `\n[${ren.name}] ${ren.title}；${ren.detail}\n`
        } else if (cmd[0] === MENU_B) {
            res += `${tian.name}(${tian.bagua}${tian.wuxing})->${di.name}(${di.bagua}${di.wuxing})->${ren.name}(${ren.bagua}${ren.wuxing})`
            res += `\n`
            res += `\n[${tian.name}] ${tian.title}；${tian.detail}\n${tian.fangwei} ${tian.xing}\n`
            res += `\n[${di.name}] ${di.title}；${di.detail}\n${di.fangwei} ${di.xing}\n`
            res += `\n[${ren.name}] ${ren.title}；${ren.detail}\n${ren.fangwei} ${ren.xing}\n`
        }
    }

    return res
}

module.exports = { getRes }