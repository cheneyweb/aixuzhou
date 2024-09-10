const Koa = require('koa')
const Router = require('koa-router')
const { koaBody } = require('koa-body')

const router = new Router()

// 首页
router.get('/', async (ctx) => {
    ctx.body = 'hello world'
})

// 小程序调用，获取微信 Open ID
router.get('/xiaoliuren', async (ctx) => {

    const { ToUserName, FromUserName, MsgType, Content, CreateTime } = ctx.request.body

    console.log(ToUserName)
    console.log(FromUserName)
    console.log(MsgType)
    console.log(Content)
    console.log(CreateTime)

    if (MsgType === 'text') {
        ctx.body = {
            ToUserName: FromUserName,
            FromUserName: ToUserName,
            CreateTime: CreateTime,
            MsgType: 'text',
            Content: '这是回复的消息'
        }
    }
})

const app = new Koa()
app.use(koaBody()).use(router.routes()).use(router.allowedMethods())
app.listen(process.env.PORT || 80, () => { console.log('STARTED', process.env.PORT || 80) })