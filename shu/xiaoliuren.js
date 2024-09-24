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

        res += `${lunar.getLunarHour()}\n\n`

        const index1 = (n1 - 1) % type.length
        const index2 = (n1 + n2 - 2) % type.length
        const index3 = (n1 + n2 + n3 - 3) % type.length

        if (cmd[0] === MENU_A) {
            res += `${type[index1].liushen}(${type[index1].liushou}${type[index1].wuxing})->${type[index2].liushen}(${type[index2].liushou}${type[index2].wuxing})->${type[index3].liushen}(${type[index3].liushou}${type[index3].wuxing})`
            res += `\n`
            res += `\n【${type[index1].liushen}】${type[index1].title}；${type[index1].detail}\n`
            res += `\n【${type[index2].liushen}】${type[index2].title}；${type[index2].detail}\n`
            res += `\n【${type[index3].liushen}】${type[index3].title}；${type[index3].detail}\n`
        } else if (cmd[0] === MENU_B) {
            res += `${type[index1].liushen}(${type[index1].bagua}${type[index1].wuxing})->${type[index2].liushen}(${type[index2].bagua}${type[index2].wuxing})->${type[index3].liushen}(${type[index3].bagua}${type[index3].wuxing})`
            res += `\n`
            res += `\n【${type[index1].liushen}】${type[index1].title}；${type[index1].detail}\n${type[index1].fangwei} ${type[index1].xing}\n`
            res += `\n【${type[index2].liushen}】${type[index2].title}；${type[index2].detail}\n${type[index2].fangwei} ${type[index2].xing}\n`
            res += `\n【${type[index3].liushen}】${type[index3].title}；${type[index3].detail}\n${type[index3].fangwei} ${type[index3].xing}\n`
        }
    }

    return res
}

module.exports = { getRes }