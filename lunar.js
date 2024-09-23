const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const WUXING = ['阳水', '阴土', '阳木', '阴木', '阳土', '阴火', '阳火', '阴土', '阳金', '阴金', '阳土', '阴水']
function getLunarHour() {
    const index = Math.floor((new Date().getHours() + 1) % 24 / 2)
    return `${DIZHI[index]}时(${WUXING[index]})`
}

module.exports = { getLunarHour }