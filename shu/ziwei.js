const { astro } = require('iztro')
const ziwei = require('../data/ziwei.js')

function getSiHuas(life) {
    // const palaces = [life.palace(ziwei.GONGS[0]), life.palace(ziwei.GONGS[1]), life.palace(ziwei.GONGS[2]), life.palace(ziwei.GONGS[3]), life.palace(ziwei.GONGS[4]), life.palace(ziwei.GONGS[5]), life.palace(ziwei.GONGS[6]), life.palace(ziwei.GONGS[7]), life.palace(ziwei.GONGS[8]), life.palace(ziwei.GONGS[9]), life.palace(ziwei.GONGS[10]), life.palace(ziwei.GONGS[11])]

    // 地支宫位索引MAP:{地支:宫}
    const diZhiGongMap = {}
    // 生年四化宫位索引MAP:{化:宫}
    const shengNianSiHuaGongMap = {}

    // 三合宫位 {三合:[宫,宫,宫]}
    const sanHeGongMap = {}
    // 四正宫位 {四正:[宫,宫,宫,宫]}
    const siZhengGongMap = {}

    // 生年四化 [宫,星,化]
    const shengNianSiHuas = []
    // 离心四化 [宫,星,化]
    const liXinSiHuas = []
    // 向心四化 [来源宫,目的宫,星,化]
    const xiangXinSiHuas = []
    // 飞宫四化 {来源宫:[目的宫,星,化]}
    const feiGongSiHuaMap = {}

    // 宫位男女星 {宫:[[星,男/女]]}
    const gongNanNvMap = {}
    // 三合破 [...生年四化, ...离心四化]
    const sanHePos = []
    // 四正破 [...生年四化, ...离心四化]
    const siZhengPos = []

    // 串联 {化:[离心四化/向心四化]}
    const liXinChuanLianMap = { '禄': [], '权': [], '科': [], '忌': [] }
    const xiangXinChuanLianMap = { '禄': [], '权': [], '科': [], '忌': [] }
    // 并联
    // 生年本对双象 shengnianshuangxiang:{宫线:[宫,星,化]}
    // 多宫串联形成生年双象 chuanbing:{化:{lixin:[离心四化],xiangxin:[向心四化]}}
    // 单宫双象自化形成生年并联 dangongshuangxiang:{宫:{lixin:[离心四化],xiangxin:[向心四化]}}
    // 飞宫遇生年产生双象
    const bingLianMap = {
        shengnianshuangxiang: {},
        chuanbing: { '禄': { lixin: [], xiangxin: [] }, '权': { lixin: [], xiangxin: [] }, '科': { lixin: [], xiangxin: [] }, '忌': { lixin: [], xiangxin: [] } },
        dangongshuangxiang: {}
    }
    // 质量变 {宫:{shengnian:[],lixin:[],xiangxin:[]}}
    const zhiLiangBianMap = {}
    // 反背 {化:{lixin:[离心四化],xiangxin:[向心四化]}}
    const fanBeiMap = { '禄': { lixin: [], xiangxin: [] }, '权': { lixin: [], xiangxin: [] }, '科': { lixin: [], xiangxin: [] }, '忌': { lixin: [], xiangxin: [] } }
    // 单爻变
    // 三爻变
    // 双象自化平衡
    // 破象
    // 阻断
    // 分裂

    // ===遍历三合宫位===
    for (let sanhe of ziwei.SANHES) {
        sanHeGongMap[sanhe] = []
        for (let i = 0; i < 3; i++) {
            for (let palace of life.palaces) {
                if (sanhe[i] === palace.earthlyBranch) {
                    sanHeGongMap[sanhe].push(palace.name)
                }
            }
        }
    }
    // ===遍历四正宫位===
    for (let sizheng of ziwei.SIZHENGS) {
        siZhengGongMap[sizheng] = []
        for (let i = 0; i < 4; i++) {
            for (let palace of life.palaces) {
                if (sizheng[i] === palace.earthlyBranch) {
                    siZhengGongMap[sizheng].push(palace.name)
                }
            }
        }
    }
    // ===遍历每宫===
    for (let palaceFrom of life.palaces) {
        // 建立地支宫位索引MAP
        diZhiGongMap[palaceFrom.earthlyBranch] = palaceFrom
        // 合并每宫主辅星耀
        const starFroms = palaceFrom.majorStars.concat(palaceFrom.minorStars)
        // 获取对宫
        const palaceTo = life.palace(ziwei.DUIGONGMAP[palaceFrom.name])
        const starTos = palaceTo.majorStars.concat(palaceTo.minorStars)
        // 获取宫线
        const gongXian = ziwei.GONGXIANMAP[palaceFrom.name]
        const isGongXianRepeat = bingLianMap.shengnianshuangxiang[gongXian] ? true : false
        // 并联生年四化
        bingLianMap.shengnianshuangxiang[gongXian] = isGongXianRepeat ? bingLianMap.shengnianshuangxiang[gongXian] : []
        // 宫位男女星
        gongNanNvMap[palaceFrom.name] = []
        // 遍历每宫星耀
        for (let star of starFroms) {
            // 生年四化
            if (star.mutagen) {
                shengNianSiHuaGongMap[star.mutagen] = palaceFrom
                shengNianSiHuas.push([palaceFrom.name, star.name, star.mutagen])
                !isGongXianRepeat && bingLianMap.shengnianshuangxiang[gongXian].push([palaceFrom.name, star.name, star.mutagen])// 每个本对宫线内的星耀生年四化累叠
            }
            // 离心四化
            const starSiHua = ziwei.SIHUAMAP[palaceFrom.heavenlyStem][star.name]
            if (starSiHua) {
                liXinSiHuas.push([palaceFrom.name, star.name, starSiHua])
                if (!bingLianMap.dangongshuangxiang[palaceFrom.name]) {
                    bingLianMap.dangongshuangxiang[palaceFrom.name] = { lixin: [], xiangxin: [] }
                }
                bingLianMap.dangongshuangxiang[palaceFrom.name].lixin.push(liXinSiHuas.at(-1))
            }

            // 宫位男女星
            if (ziwei.NANXINGS.includes(star.name)) {
                gongNanNvMap[palaceFrom.name].push([star.name, '男'])
            } else if (ziwei.NVXINGS.includes(star.name)) {
                gongNanNvMap[palaceFrom.name].push([star.name, '女'])
            }
            if (star.name === '廉贞' && star.withMutagen('禄')) {
                gongNanNvMap[palaceFrom.name].push([star.name, '男'])
            } else if (star.name === '廉贞' && star.withMutagen('忌')) {
                gongNanNvMap[palaceFrom.name].push([star.name, '女'])
            } else if (star.name === '廉贞') {
                gongNanNvMap[palaceFrom.name].push([star.name, '禄男/忌女'])
            }
        }

        // 遍历对宫星耀
        for (let star of starTos) {
            // 生年四化
            if (star.mutagen) {
                !isGongXianRepeat && bingLianMap.shengnianshuangxiang[gongXian].push([palaceTo.name, star.name, star.mutagen])// 每个本对宫线内的星耀生年四化累叠
            }
            // 向心四化
            const starSiHua = ziwei.SIHUAMAP[palaceFrom.heavenlyStem][star.name]
            if (starSiHua) {
                xiangXinSiHuas.push([palaceFrom.name, palaceTo.name, star.name, starSiHua])
                if (!bingLianMap.dangongshuangxiang[palaceTo.name]) {
                    bingLianMap.dangongshuangxiang[palaceTo.name] = { lixin: [], xiangxin: [] }
                }
                bingLianMap.dangongshuangxiang[palaceTo.name].xiangxin.push(xiangXinSiHuas.at(-1))
            }
        }

        // 遍历其余宫
        feiGongSiHuaMap[palaceFrom.name] = []
        for (let palaceTo of life.palaces) {
            const starTos = palaceTo.majorStars.concat(palaceTo.minorStars)
            for (let star of starTos) {
                const starSiHua = ziwei.SIHUAMAP[palaceFrom.heavenlyStem][star.name]
                if (starSiHua) {
                    feiGongSiHuaMap[palaceFrom.name].push([palaceTo.name, star.name, starSiHua])
                }
            }
        }

        // 整理生年本对双象
        if (bingLianMap.shengnianshuangxiang[gongXian].length < 2) {
            delete bingLianMap.shengnianshuangxiang[gongXian]
        }
    }
    // ===遍历生年四化===
    for (let shengNianSiHua of shengNianSiHuas) {
        const shengNianSiHuaPalace = life.palace(shengNianSiHua[0])
        // 三合破
        const anotherSanHeGongs = ziwei.SANHEMAP[shengNianSiHuaPalace.earthlyBranch]
        const anotherSanHePalace1 = diZhiGongMap[anotherSanHeGongs[0]]
        const anotherSanHePalace2 = diZhiGongMap[anotherSanHeGongs[1]]
        for (let liXinSiHua of liXinSiHuas) {
            if (liXinSiHua[2] === shengNianSiHua[2] && (liXinSiHua[0] === anotherSanHePalace1.name || liXinSiHua[0] === anotherSanHePalace2.name)) {
                sanHePos.push([...shengNianSiHua, ...liXinSiHua])
            }
        }
        // 四正破
        const anotherSiZhengGongs = ziwei.SIZHENGMAP[shengNianSiHuaPalace.earthlyBranch]
        const anotherSiZhengPalace1 = diZhiGongMap[anotherSiZhengGongs[0]]
        const anotherSiZhengPalace2 = diZhiGongMap[anotherSiZhengGongs[1]]
        const anotherSiZhengPalace3 = diZhiGongMap[anotherSiZhengGongs[2]]
        for (let liXinSiHua of liXinSiHuas) {
            if (liXinSiHua[2] === shengNianSiHua[2] && (liXinSiHua[0] === anotherSiZhengPalace1.name || liXinSiHua[0] === anotherSiZhengPalace2.name || liXinSiHua[0] === anotherSiZhengPalace3.name)) {
                siZhengPos.push([...shengNianSiHua, ...liXinSiHua])
            }
        }
        // 质量变
        if (!zhiLiangBianMap[shengNianSiHua[0]]) {
            zhiLiangBianMap[shengNianSiHua[0]] = { shengnian: [], lixin: [], xiangxin: [] }
        }
        zhiLiangBianMap[shengNianSiHua[0]].shengnian.push(shengNianSiHua)
        for (let liXinSiHua of liXinSiHuas) {
            if (shengNianSiHua[0] === liXinSiHua[0] && shengNianSiHua[2] !== liXinSiHua[2]) {
                zhiLiangBianMap[shengNianSiHua[0]].lixin.push(liXinSiHua)
            }
        }
        for (let xiangXinSiHua of xiangXinSiHuas) {
            if (shengNianSiHua[0] === xiangXinSiHua[1] && shengNianSiHua[2] !== xiangXinSiHua[3]) {
                zhiLiangBianMap[shengNianSiHua[0]].xiangxin.push(xiangXinSiHua)
            }
        }
        if (zhiLiangBianMap[shengNianSiHua[0]].lixin.length === 0 && zhiLiangBianMap[shengNianSiHua[0]].xiangxin.length === 0) {
            delete zhiLiangBianMap[shengNianSiHua[0]]
        }
    }
    // ===遍历离心四化===
    for (let liXinSiHua of liXinSiHuas) {
        liXinChuanLianMap[liXinSiHua[2]].push(liXinSiHua)
        fanBeiMap[liXinSiHua[2]].lixin.push(liXinSiHua)
    }
    // ===遍历向心四化===
    for (let xiangXinSiHua of xiangXinSiHuas) {
        xiangXinChuanLianMap[xiangXinSiHua[3]].push(xiangXinSiHua)
        fanBeiMap[xiangXinSiHua[3]].xiangxin.push(xiangXinSiHua)
    }
    // ===反背===
    for (let item in fanBeiMap) {
        fanBeiMap[item].xiangxin = fanBeiMap[item].xiangxin.filter(xiangXinSiHua => fanBeiMap[item].lixin.find(liXinSiHua => liXinSiHua[0] !== xiangXinSiHua[1]))
        if (fanBeiMap[item].lixin.length === 0 || fanBeiMap[item].xiangxin.length === 0) {
            delete fanBeiMap[item]
        }
    }
    // ===遍历离心串联===
    for (let item in liXinChuanLianMap) {
        // 删除非串联
        if (liXinChuanLianMap[item].length < 2) {
            delete liXinChuanLianMap[item]
        } else {
            for (let arr of liXinChuanLianMap[item]) {
                // 检查该宫是否有生年四化
                for (let shengNianSiHua of shengNianSiHuas) {
                    if (arr[0] === shengNianSiHua[0]) {
                        bingLianMap.chuanbing[item].lixin.push(shengNianSiHua)
                    }
                }
            }
            if (bingLianMap.chuanbing[item].lixin.length < 2) {
                bingLianMap.chuanbing[item].lixin = []
            }
        }
    }
    // ===遍历向心串联===
    for (let item in xiangXinChuanLianMap) {
        // 删除非串联
        if (xiangXinChuanLianMap[item].length < 2) {
            delete xiangXinChuanLianMap[item]
        } else {
            for (let arr of xiangXinChuanLianMap[item]) {
                // 检查该宫是否有生年四化
                for (let shengNianSiHua of shengNianSiHuas) {
                    if (arr[1] === shengNianSiHua[0]) {
                        bingLianMap.chuanbing[item].xiangxin.push(shengNianSiHua)
                    }
                }
            }
            if (bingLianMap.chuanbing[item].xiangxin.length < 2) {
                bingLianMap.chuanbing[item].xiangxin = []
            }
        }
    }
    // ===遍历单宫双象并联===
    for (let item in bingLianMap.dangongshuangxiang) {
        if (bingLianMap.dangongshuangxiang[item].lixin.length < 2) {
            bingLianMap.dangongshuangxiang[item].lixin = []
        }

        if (bingLianMap.dangongshuangxiang[item].xiangxin.length < 2) {
            bingLianMap.dangongshuangxiang[item].xiangxin = []
        }
    }

    return {
        sanHeGongMap,
        siZhengGongMap,
        shengNianSiHuas,
        liXinSiHuas,
        xiangXinSiHuas,
        feiGongSiHuaMap,
        gongNanNvMap,
        sanHePos,
        siZhengPos,
        liXinChuanLianMap,
        xiangXinChuanLianMap,
        bingLianMap,
        zhiLiangBianMap,
        fanBeiMap,
    }
}

function getRes(Content) {
    let res = ''
    let life
    try {
        const cmd = Content.split(/\s+/)
        const date = cmd[1]
        const time = cmd[2]
        const gender = cmd[3]

        const formattedDate = date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
        const formattedTime = ziwei.SHICHENMAP[time[0]]
        life = astro.bySolar(formattedDate, formattedTime, gender)
    } catch (error) {
        return res = '【输入格式错误】，格式如下：\n紫微 阳历年月日 时辰 性别\n\n【参考如下举例】\n紫微 19990821 申时 男'
    }

    const {
        sanHeGongMap,
        siZhengGongMap,
        shengNianSiHuas,
        liXinSiHuas,
        xiangXinSiHuas,
        feiGongSiHuaMap,
        gongNanNvMap,
        sanHePos,
        siZhengPos,
        liXinChuanLianMap,
        xiangXinChuanLianMap,
        bingLianMap,
        zhiLiangBianMap,
        fanBeiMap,
    } = getSiHuas(life)

    res += `紫微解盘-${life.gender === '男' ? '乾' : '坤'}造`
    res += `\n${life.chineseDate[0]} ${life.chineseDate[3]} ${life.chineseDate[6]} ${life.chineseDate[9]}`
    res += `\n${life.chineseDate[1]} ${life.chineseDate[4]} ${life.chineseDate[7]} ${life.chineseDate[10]}`

    res += `\n\n【生年四化】`
    for (let item of shengNianSiHuas) {
        res += `\n${item[0]}•${ziwei.NEIWAIGONGMAP[item[0]]} ${item[1]} ${item[2]}`
    }

    res += `\n\n【离心四化】`
    for (let item of liXinSiHuas) {
        res += `\n${item[0]}•${ziwei.NEIWAIGONGMAP[item[0]]} ↑ ${item[1]} ${item[2]}`
    }

    res += `\n\n【向心四化】`
    for (let item of xiangXinSiHuas) {
        res += `\n${item[0]}•${ziwei.NEIWAIGONGMAP[item[0]]} → ${item[1]}•${ziwei.NEIWAIGONGMAP[item[1]]} ${item[2]} ${item[3]}`
    }

    // res += `\n\n【飞宫四化】`
    // for (let item in feiGongSiHuaMap) {
    //     res += `\n${item}`
    //     for (let feigong of feiGongSiHuaMap[item]) {
    //         res += `\n    飞 ${feigong[0]} ${feigong[1]} 飞宫化 ${feigong[2]}`
    //     }
    //     res += `\n`
    // }

    res += `\n\n【串联】\n`
    for (let item in liXinChuanLianMap) {
        res += `${liXinChuanLianMap[item][0][2]} ↑ `
        for (let arr of liXinChuanLianMap[item]) {
            res += `${arr[0]} `
        }
        res += `\n`
    }
    for (let item in xiangXinChuanLianMap) {
        res += `${xiangXinChuanLianMap[item][0][3]} → `
        for (let arr of xiangXinChuanLianMap[item]) {
            res += `${arr[1]} `
        }
    }

    res += `\n\n【并联】`
    for (let item in bingLianMap.shengnianshuangxiang) {
        res += `\n${item} | `
        for (let i = 0; i < bingLianMap.shengnianshuangxiang[item].length; i++) {
            const arr = bingLianMap.shengnianshuangxiang[item][i]
            res += ` ${arr[0]} ${arr[1]} ${arr[2]}`
        }
    }
    res += `\n`
    for (let item in bingLianMap.chuanbing) {
        if (bingLianMap.chuanbing[item].lixin.length > 0) {
            res += `\n${item} ↑`
        }
        for (let arr of bingLianMap.chuanbing[item].lixin) {
            res += ` ${arr[0]} ${arr[1]} ${arr[2]}`
        }
        if (bingLianMap.chuanbing[item].xiangxin.length > 0) {
            res += `\n${item} →`
        }
        for (let arr of bingLianMap.chuanbing[item].xiangxin) {
            res += ` ${arr[0]} ${arr[1]} ${arr[2]}`
        }
    }
    res += `\n`
    for (let item in bingLianMap.dangongshuangxiang) {
        if (bingLianMap.dangongshuangxiang[item].lixin.length > 0) {
            res += `\n${item} ↑`
        }
        for (let arr of bingLianMap.dangongshuangxiang[item].lixin) {
            res += ` ${arr[1]} ${arr[2]}`
        }
        if (bingLianMap.dangongshuangxiang[item].xiangxin.length > 0) {
            res += `\n${item} →`
        }
        for (let arr of bingLianMap.dangongshuangxiang[item].xiangxin) {
            res += ` ${arr[2]} ${arr[3]}`
        }
    }

    res += `\n\n【质量变】\n`
    for (let item in zhiLiangBianMap) {
        res += `${item}`
        for (let arr of zhiLiangBianMap[item].shengnian) {
            res += ` ${arr[1]} ${arr[2]}`
        }
        if (zhiLiangBianMap[item].lixin.length > 0) {
            res += ` ↑`
        }
        for (let arr of zhiLiangBianMap[item].lixin) {
            res += ` ${arr[1]} ${arr[2]}`
        }
        if (zhiLiangBianMap[item].xiangxin.length > 0) {
            res += ` →`
        }
        for (let arr of zhiLiangBianMap[item].xiangxin) {
            res += ` ${arr[2]} ${arr[3]}`
        }
        res += `\n`
    }

    res += `\n【反背】`
    for (let item in fanBeiMap) {
        res += `\n${item} ↑`
        for (let arr of fanBeiMap[item].lixin) {
            res += ` ${arr[0]}`
        }
        res += ` →`
        for (let arr of fanBeiMap[item].xiangxin) {
            res += ` ${arr[1]}`
        }
    }

    res += `\n\n【三合破】`
    for (let item of sanHePos) {
        res += `\n${item[0]} ${item[1]} ↔ ${item[3]} ${item[4]} ${item[5]}`
    }

    res += `\n\n【四正破】`
    for (let item of siZhengPos) {
        res += `\n${item[0]} ${item[1]} ↔ ${item[3]} ${item[4]} ${item[5]}`
    }

    res += `\n\n【宫位男女】`
    for (let item in gongNanNvMap) {
        if (gongNanNvMap[item].length > 0) {
            res += `\n${item}: `
        }
        for (let star of gongNanNvMap[item]) {
            res += `${star[0]}${star[1]} `
        }
    }

    // console.log(shengNianSiHuas)
    // console.log(liXinSiHuas)
    // console.log(xiangXinSiHuas)
    // console.log(feiGongSiHuaMap)
    // console.log(sanHeGongMap)
    // console.log(siZhengGongMap)
    // console.log(gongNanNvMap)
    // console.log(sanHePos)
    // console.log(siZhengPos)
    // console.log(liXinChuanLianMap)
    // console.log(xiangXinChuanLianMap)
    // console.log(JSON.stringify(fanBeiMap, null, 2))
    // console.log(JSON.stringify(zhiLiangBianMap, null, 2))
    // console.log(bingLianMap.shengnianshuangxiang)
    // console.log(JSON.stringify(bingLianMap.chuanbing, null, 2))
    // console.log(JSON.stringify(bingLianMap.dangongshuangxiang, null, 2))

    return res
}

module.exports = { getRes }