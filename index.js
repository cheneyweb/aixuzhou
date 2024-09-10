const Koa = require('koa')
const Router = require('koa-router')
const { koaBody } = require('koa-body')

const router = new Router()

router.post('/', async (ctx) => {
    const { ToUserName, FromUserName, MsgType, Content, CreateTime } = ctx.request.body

    console.log(ToUserName)
    console.log(FromUserName)
    console.log(MsgType)
    console.log(Content)
    console.log(CreateTime)

    if (MsgType === 'text') {
        const res = ''
        const [type, num1, num2, num3] = Content.spilt(/\s+/)

        if (type === '小六壬A') {
            res = `李淳风小六壬出卦结果 ${num1} ${num2} ${num3}`
        } else if (type === '小六壬B') {
            res = `九宫小六壬出卦结果 ${num1} ${num2} ${num3}`
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