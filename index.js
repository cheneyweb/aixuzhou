const Koa = require('koa')
const Router = require('koa-router')
const { koaBody } = require('koa-body')

const router = new Router()

router.post('/', async (ctx) => {
    const { ToUserName, FromUserName, MsgType, Content, CreateTime } = ctx.request.body

    // console.log(ToUserName)
    // console.log(FromUserName)
    // console.log(MsgType)
    // console.log(Content)
    // console.log(CreateTime)

    const typeA = {
        liushenArr: ['大安', '留连', '速喜', '赤口', '小吉', '空亡']
    }

    const typeB = {
        liushenArr: ['大安', '留连', '速喜', '赤口', '小吉', '空亡', '病符', '桃花', '天德']
    }

    if (MsgType === 'text') {
        let res = ''
        let type = typeA
        const cmd = Content.split(/\s+/)
        if (cmd[0] === '小六壬A') {
            res = `【李淳风小六壬】出卦\n\n`
        } else if (cmd[0] === '小六壬B') {
            type = typeB
            res = `【九宫小六壬】出卦\n\n`
        }

        const index1 = (cmd[1] - 1) % type.liushenArr.length
        const index2 = (cmd[1] + cmd[2] - 2) % type.liushenArr.length
        const index3 = (cmd[1] + cmd[2] + cmd[3] - 3) % type.liushenArr.length

        console.log(index1)
        console.log(index2)
        console.log(index3)

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