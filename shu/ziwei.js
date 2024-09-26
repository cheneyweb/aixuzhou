const { astro } = require('iztro')
const ziwei = require('../data/ziwei.js')

function getSiHuas(life) {
    // const palaces = [life.palace(ziwei.GONGS[0]), life.palace(ziwei.GONGS[1]), life.palace(ziwei.GONGS[2]), life.palace(ziwei.GONGS[3]), life.palace(ziwei.GONGS[4]), life.palace(ziwei.GONGS[5]), life.palace(ziwei.GONGS[6]), life.palace(ziwei.GONGS[7]), life.palace(ziwei.GONGS[8]), life.palace(ziwei.GONGS[9]), life.palace(ziwei.GONGS[10]), life.palace(ziwei.GONGS[11])]
    // 生年四化 [宫,星,化]
    const shengNianSiHuas = []
    // 离心四化 [宫,星,化]
    const liXinSiHuas = []
    // 向心四化 [来源宫,目的宫,星,化]
    const xiangXinSiHuas = []
    // 飞宫四化 {来源宫:[目的宫,星,化]}
    const feiGongSiHuaMap = {}
    // 三合宫位 {三合:[宫,宫,宫]}
    const sanHeGongMap = {}
    // 四正宫位 {四正:[宫,宫,宫,宫]}
    const siZhengGongMap = {}
    // 宫位男女星 {宫:[[星,男/女]]}
    const gongNanNvMap = {}

    // 地支宫位索引MAP
    const diZhiGongMap = {}

    // 三合破
    const sanHePos = []
    // 四正破
    const siZhengPos = []

    // 遍历三合宫位
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

    // 遍历四正宫位
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

    // 遍历每宫
    for (palaceFrom of life.palaces) {
        // 建立地支宫位索引MAP
        diZhiGongMap[palaceFrom.earthlyBranch] = palaceFrom
        // 合并每宫主辅星耀
        const starFroms = palaceFrom.majorStars.concat(palaceFrom.minorStars)
        // 获取对宫
        const palaceTo = life.palace(ziwei.DUIGONGMAP[palaceFrom.name])
        const starTos = palaceTo.majorStars.concat(palaceTo.minorStars)
        // 宫位男女星
        gongNanNvMap[palaceFrom.name] = []

        // 遍历每宫星耀
        for (let star of starFroms) {
            // 生年四化
            if (star.mutagen) {
                shengNianSiHuas.push([palaceFrom.name, star.name, star.mutagen])
            }
            // 离心四化
            const starSiHua = ziwei.SIHUAMAP[palaceFrom.heavenlyStem][star.name]
            if (starSiHua) {
                liXinSiHuas.push([palaceFrom.name, star.name, starSiHua])
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
            // 向心四化
            const starSiHua = ziwei.SIHUAMAP[palaceFrom.heavenlyStem][star.name]
            if (starSiHua) {
                xiangXinSiHuas.push([palaceFrom.name, palaceTo.name, star.name, starSiHua])
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

        // 遍历生年四化
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
        }
    }

    return { shengNianSiHuas, liXinSiHuas, xiangXinSiHuas, feiGongSiHuaMap, sanHeGongMap, siZhengGongMap, gongNanNvMap, sanHePos, siZhengPos }
}

// // 生年四化 [宫,星,化]
// function getShengNianSiHuas(life) {
//     const shengNianSiHuas = []
//     for (palace of life.palaces) {
//         for (let star of palace.majorStars.concat(palace.minorStars)) {
//             if (star.mutagen) {
//                 shengNianSiHuas.push([palace.name, star.name, star.mutagen])
//             }
//         }
//     }
//     return shengNianSiHuas
// }
// // 离心四化 [宫,星,化]
// function getLiXinSiHuas(life) {
//     const liXinSiHuas = []
//     for (let gong of ziwei.GONGS) {
//         const palace = life.palace(gong)
//         for (let star of palace.majorStars.concat(palace.minorStars)) {
//             const starSiHua = ziwei.SIHUAMAP[palace.heavenlyStem][star.name]
//             if (starSiHua) {
//                 liXinSiHuas.push([gong, star.name, starSiHua])
//             }
//         }
//     }
//     return liXinSiHuas
// }
// // 向心四化 [来源宫,目的宫,星,化]
// function getXiangXinSiHuas(life) {
//     const xiangXinSiHuas = []
//     for (let gongFrom of ziwei.GONGS) {
//         const palaceFrom = life.palace(gongFrom)
//         const palaceTo = life.palace(ziwei.DUIGONGMAP[gongFrom])

//         for (let star of palaceTo.majorStars.concat(palaceTo.minorStars)) {
//             const starSiHua = ziwei.SIHUAMAP[palaceFrom.heavenlyStem][star.name]
//             if (starSiHua) {
//                 xiangXinSiHuas.push([gongFrom, palaceTo.name, star.name, starSiHua])
//             }
//         }
//     }
//     return xiangXinSiHuas
// }
// // 飞宫四化 {来源宫:[目的宫,星,化]}
// function getFeiGongSiHuaMap(life) {
//     const feiGongSiHuaMap = {}
//     for (let gongFrom of ziwei.GONGS) {
//         feiGongSiHuaMap[gongFrom] = []
//         for (let gongTo of ziwei.GONGS) {
//             const palaceFrom = life.palace(gongFrom)
//             const palaceTo = life.palace(gongTo)
//             for (let star of palaceTo.majorStars.concat(palaceTo.minorStars)) {
//                 const starSiHua = ziwei.SIHUAMAP[palaceFrom.heavenlyStem][star.name]
//                 if (starSiHua) {
//                     feiGongSiHuaMap[gongFrom].push([gongTo, star.name, starSiHua])
//                 }
//             }
//         }
//     }
//     return feiGongSiHuaMap
// }
// // 三合宫位 {三合:[宫,宫,宫]}
// function getSanHeGongMap(life) {
//     const sanHeGongMap = {}
//     for (let sanhe of ziwei.SANHES) {
//         sanHeGongMap[sanhe] = []
//         for (let i = 0; i < 3; i++) {
//             for (palace of life.palaces) {
//                 if (sanhe[i] === palace.earthlyBranch) {
//                     sanHeGongMap[sanhe].push(palace.name)
//                 }
//             }
//         }
//     }
//     return sanHeGongMap
// }

// 四正宫位 {四正:[宫,宫,宫,宫]}
// function getSiZhengGongMap(life) {
//     const siZhengGongMap = {}
//     for (let sizheng of ziwei.SIZHENGS) {
//         siZhengGongMap[sizheng] = []
//         for (let i = 0; i < 4; i++) {
//             for (palace of life.palaces) {
//                 if (sizheng[i] === palace.earthlyBranch) {
//                     siZhengGongMap[sizheng].push(palace.name)
//                 }
//             }
//         }
//     }
//     return siZhengGongMap
// }

// 宫位男女星 {宫:[[星,男/女]]}
// function getGongNanNvMap(life) {
//     const gongNanNvMap = {}
//     for (let gong of ziwei.GONGS) {
//         gongNanNvMap[gong] = []
//         const palace = life.palace(gong)
//         for (let star of palace.majorStars.concat(palace.minorStars)) {
//             if (ziwei.NANXINGS.includes(star.name)) {
//                 gongNanNvMap[gong].push([star.name, '男'])
//             } else if (ziwei.NVXINGS.includes(star.name)) {
//                 gongNanNvMap[gong].push([star.name, '女'])
//             }
//             if (star.name === '廉贞' && star.withMutagen('禄')) {
//                 gongNanNvMap[gong].push([star.name, '男'])
//             } else if (star.name === '廉贞' && star.withMutagen('忌')) {
//                 gongNanNvMap[gong].push([star.name, '女'])
//             } else if (star.name === '廉贞') {
//                 gongNanNvMap[gong].push([star.name, '禄男/忌女'])
//             }
//         }
//     }
//     return gongNanNvMap
// }

function getRes(Content) {
    let res = ''
    let life
    try {
        const cmd = Content.split(/\s+/)
        const date = cmd[1]
        const time = cmd[2]
        const sex = cmd[3]

        const formattedDate = date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
        const formattedTime = ziwei.SHICHENMAP[time[0]]
        life = astro.bySolar(formattedDate, formattedTime, sex)
    } catch (error) {
        res = '【输入格式错误】，参考如下举例：\n紫微 阳历年月日 时辰 性别\n紫微 19990821 申时 男'
        return
    }

    const { shengNianSiHuas, liXinSiHuas, xiangXinSiHuas, feiGongSiHuaMap, sanHeGongMap, siZhengGongMap, gongNanNvMap, sanHePos, siZhengPos } = getSiHuas(life)

    res += `===紫微斗数解盘===`
    res += `\n\n【生年四化】`
    for (let item of shengNianSiHuas) {
        res += `\n${item[0]} ${item[1]} ${item[2]}`
    }

    res += `\n\n【离心四化】`
    for (let item of liXinSiHuas) {
        res += `\n${item[0]} ↑ ${item[1]} ${item[2]}`
    }

    res += `\n\n【向心四化】`
    for (let item of xiangXinSiHuas) {
        res += `\n${item[0]} → ${item[1]} ${item[2]} ${item[3]}`
    }

    // res += `\n\n【飞宫四化】`
    // for (let item in feiGongSiHuaMap) {
    //     res += `\n${item}`
    //     for (let feigong of feiGongSiHuaMap[item]) {
    //         res += `\n    飞 ${feigong[0]} ${feigong[1]} 飞宫化 ${feigong[2]}`
    //     }
    //     res += `\n`
    // }

    res += `\n\n【三合破】`
    for (let item of sanHePos) {
        // res += `\n${item}: ${sanHeGongMap[item][0]} ${sanHeGongMap[item][1]} ${sanHeGongMap[item][2]}`
        res += `\n${item[0]} ${item[1]} ↔ ${item[3]} ${item[4]} ${item[5]}`
    }

    res += `\n\n【四正破】`
    for (let item of siZhengPos) {
        // res += `\n${item}: ${siZhengGongMap[item][0]} ${siZhengGongMap[item][1]} ${siZhengGongMap[item][2]} ${siZhengGongMap[item][3]}`
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

    console.log(res)

    return res
}

module.exports = { getRes }

// getRes('紫微 19910928 酉时 男')