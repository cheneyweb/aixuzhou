const Koa = require('koa')
const Router = require('koa-router')
const { koaBody } = require('koa-body')

const router = new Router()

// elements = { 0: { "运势": "大安", "九宫": "☳震", "五行": "木", "九星": "天冲星", "八门": "伤门", "方位": "东", "吉凶": "上吉" }, 1: { "运势": "留连", "九宫": "☴巽", "五行": "木", "九星": "天辅星", "八门": "休门", "方位": "东南", "吉凶": "上吉" }, 2: { "运势": "速喜", "九宫": "☲离", "五行": "火", "九星": "天英星", "八门": "景门", "方位": "南", "吉凶": "小凶" }, 3: { "运势": "赤口", "九宫": "☱兑", "五行": "金", "九星": "天柱星", "八门": "惊门", "方位": "西", "吉凶": "小凶" }, 4: { "运势": "小吉", "九宫": "☵坎", "五行": "水", "九星": "天蓬星", "八门": "休门", "方位": "北", "吉凶": "大凶" }, 5: { "运势": "空亡", "九宫": "中", "五行": "土", "九星": "天禽星", "八门": "疑门", "方位": "中", "吉凶": "上吉" }, 6: { "运势": "病符", "九宫": "☷坤", "五行": "土", "九星": "天芮星", "八门": "死门", "方位": "西南", "吉凶": "大凶" }, 7: { "运势": "桃花", "九宫": "☶艮", "五行": "土", "九星": "天任星", "八门": "生门", "方位": "东北", "吉凶": "小吉" }, 8: { "运势": "天德", "九宫": "☰乾", "五行": "金", "九星": "天心星", "八门": "开门", "方位": "西北", "吉凶": "上吉" } }

router.post('/', async (ctx) => {
    const { ToUserName, FromUserName, MsgType, Content, CreateTime } = ctx.request.body

    // console.log(ToUserName)
    // console.log(FromUserName)
    // console.log(MsgType)
    // console.log(Content)
    // console.log(CreateTime)

    if (MsgType === 'text') {
        const typeA = [
            { liushen: '大安', liushou: '青龙', wuxing: '木', title: '长期，缓慢，稳定', detail: '求安稳，大安最吉；求变化，大安不吉' },
            { liushen: '留连', liushou: '四方', wuxing: '土', title: '停止，反复，复杂', detail: '想挽留，留连是吉；否则都很恶心' },
            { liushen: '速喜', liushou: '朱雀', wuxing: '火', title: '惊喜，快速，突然', detail: '意想不到的好事' },
            { liushen: '赤口', liushou: '白虎', wuxing: '金', title: '争斗，凶恶，伤害', detail: '吵架，打架，斗争，诉讼是非，肉体受伤（尤其赤口叠现）' },
            { liushen: '小吉', liushou: '玄武', wuxing: '水', title: '起步，不多，尚可', detail: '成中有缺，适合起步' },
            { liushen: '空亡', liushou: '勾陈', wuxing: '土', title: '失去，虚伪，空想', detail: '先得再失，尤忌金钱事，可多接触玄学，哲学，心理学' }
        ]
        const typeB = [
            {
                liushen: '大安', bagua: '震', wuxing: '木', fangwei: '正东', xing: '三清', title: '长期，缓慢，稳定', detail: '求安稳，大安最吉；求变化，大安不吉'
            },
            {
                liushen: '留连', bagua: '巽', wuxing: '木', fangwei: '东南', xing: '文昌', title: '停止，反复，复杂', detail: '想挽留，留连是吉；否则都很恶心'
            },
            { liushen: '速喜', bagua: '离', wuxing: '火', fangwei: '正南', xing: '雷祖', title: '惊喜，快速，突然', detail: '意想不到的好事' },
            { liushen: '赤口', bagua: '兑', wuxing: '金', fangwei: '正西', xing: '将帅', title: '争斗，凶恶，伤害', detail: '吵架，打架，斗争，诉讼是非，肉体受伤（尤其赤口叠现）' },
            { liushen: '小吉', bagua: '坎', wuxing: '水', fangwei: '正北', xing: '真武', title: '起步，不多，尚可', detail: '成中有缺，适合起步' },
            { liushen: '空亡', bagua: '中', wuxing: '土', fangwei: '内', xing: '玉皇', title: '失去，虚伪，空想', detail: '先得再失，尤忌金钱事，可多接触玄学，哲学，心理学' },
            { liushen: '病符', bagua: '坤', wuxing: '土', fangwei: '西南', xing: '后土', title: '病态，异常，治疗', detail: '先有病，才需要“治”' },
            { liushen: '桃花', bagua: '艮', wuxing: '土', fangwei: '东北', xing: '城隍', title: '欲望，牵绊，异性', detail: '人际关系，牵绊此事' },
            { liushen: '天德', bagua: '乾', wuxing: '金', fangwei: '西北', xing: '紫微', title: '贵人，上司，高远', detail: '求人办事，靠人成事' }
        ]
        const cmd = Content.split(/\s+/)
        const n1 = +cmd[1]
        const n2 = +cmd[2]
        const n3 = +cmd[3]

        let res = ''
        let type = typeA

        if ((cmd[0] !== '小六壬A' && cmd[0] !== '小六壬B') || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
            res = '【输入格式错误】，参考如下举例：\n小六壬A 23 5 11'
        } else {
            if (cmd[0] === '小六壬A') {
                res = `【李淳风小六壬】出卦\n\n`
            } else if (cmd[0] === '小六壬B') {
                type = typeB
                res = `【九宫小六壬】出卦\n\n`
            }

            const index1 = (n1 - 1) % type.length
            const index2 = (n1 + n2 - 2) % type.length
            const index3 = (n1 + n2 + n3 - 3) % type.length

            if (cmd[0] === '小六壬A') {
                res += `${type[index1].liushen}(${type[index1].liushou}${type[index1].wuxing}) -> ${type[index2].liushen}(${type[index2].liushou}${type[index2].wuxing}) -> ${type[index3].liushen}(${type[index3].liushou}${type[index3].wuxing})`
            } else if (cmd[0] === '小六壬B') {
                res += `${type[index1].liushen}(${type[index1].bagua}${type[index1].wuxing}) -> ${type[index2].liushen}(${type[index2].bagua}${type[index2].wuxing}) -> ${type[index3].liushen}(${type[index3].bagua}${type[index3].wuxing})`
                res += `\n\n`
                res += `【${type[index1].liushen}】${type[index1].title}；${type[index1].detail}\n${type[index1].fangwei} ${type[index1].xing}\n`
                res += `【${type[index2].liushen}】${type[index2].title}；${type[index2].detail}\n${type[index2].fangwei} ${type[index2].xing}\n`
                res += `【${type[index3].liushen}】${type[index3].title}；${type[index3].detail}\n${type[index3].fangwei} ${type[index3].xing}\n`
            }
        }

        ctx.body = {
            ToUserName: FromUserName,
            FromUserName: ToUserName,
            CreateTime: CreateTime,
            MsgType: 'text',
            Content: res
        }
    }
})

const app = new Koa()
app.use(koaBody()).use(router.routes()).use(router.allowedMethods())
app.listen(process.env.PORT || 80, () => { console.log('STARTED', process.env.PORT || 80) })