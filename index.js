const Koa = require('koa')
const Router = require('koa-router')
const { koaBody } = require('koa-body')

const xiaoliuren = require('./shu/xiaoliuren.js')
const ziwei = require('./shu/ziwei.js')
const gua = require('./shu/gua.js')
const SHUMAP = { '小六壬': xiaoliuren, '紫微': ziwei, '卦': gua }

const router = new Router()

router.post('/', async (ctx) => {
    console.time('用时')
    const { ToUserName, FromUserName, MsgType, Content, CreateTime } = ctx.request.body
    let res = ''
    if (MsgType === 'text') {
        if (Content.includes('小六壬')) {
            res = '小六壬'
        } else if (Content.includes('紫微')) {
            res = '紫微'
        } else {
            res = '卦'
        }
    }

    if (res) {
        res = SHUMAP[res].getRes(Content)
    }

    if (res) {
        ctx.body = {
            ToUserName: FromUserName,
            FromUserName: ToUserName,
            CreateTime: CreateTime,
            MsgType: 'text',
            Content: res
        }
        // console.log(res)
        console.log('长度', res.length)
    }
    console.timeEnd('用时')
})

const app = new Koa()
app.use(koaBody()).use(router.routes()).use(router.allowedMethods())
app.listen(process.env.PORT || 80, () => { console.log('STARTED', process.env.PORT || 80) })



// console.log(SHUMAP['小六壬'].getRes('小六壬 456 75 15'))
// console.log(SHUMAP['小六壬'].getRes('九宫小六壬 456 75 15'))
// console.log(SHUMAP['紫微'].getRes('紫微 19990928 酉时 男'))
// console.log(SHUMAP['紫微'].getRes('紫微 20020328 辰时 女'))
// console.log(SHUMAP['卦'].getRes('乾为天'))
