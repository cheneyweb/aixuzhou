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
        const typeA = {
            liushenArr: ['大安', '留连', '速喜', '赤口', '小吉', '空亡']
        }
        const typeB = {
            liushenArr: ['大安', '留连', '速喜', '赤口', '小吉', '空亡', '病符', '桃花', '天德']
        }
        const cmd = Content.split(/\s+/)
        const n1 = +cmd[1]
        const n2 = +cmd[2]
        const n3 = +cmd[3]

        let res = ''
        let type = typeA

        if (cmd[0] !== '小六壬A' || cmd[0] !== '小六壬B' || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
            return ctx.body = '【输入格式错误】，参考如下举例：\n小六壬A 23 5 11'
        }

        if (cmd[0] === '小六壬A') {
            res = `【李淳风小六壬】出卦\n\n`
        } else if (cmd[0] === '小六壬B') {
            type = typeB
            res = `【九宫小六壬】出卦\n\n`
        } else {
            res = '输入格式有误'
        }

        const index1 = (n1 - 1) % type.liushenArr.length
        const index2 = (n1 + n2 - 2) % type.liushenArr.length
        const index3 = (n1 + n2 + n3 - 3) % type.liushenArr.length

        res += `${type.liushenArr[index1]} -> ${type.liushenArr[index2]} -> ${type.liushenArr[index3]}`

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