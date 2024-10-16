const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const WUXING = ['阳水', '阴土', '阳木', '阴木', '阳土', '阴火', '阳火', '阴土', '阳金', '阴金', '阳土', '阴水']
const WUXINGMAP = { '子': '阳水', '丑': '阴土', '寅': '阳木', '卯': '阴木', '辰': '阳土', '巳': '阴火', '午': '阳火', '未': '阴土', '申': '阳金', '酉': '阴金', '戌': '阳土', '亥': '阴水' }

function getLunarHour() {
    const index = Math.floor((new Date().getHours() + 1) % 24 / 2)
    return DIZHI[index]
}

function getLunarHourFormat(lunarHour) {
    return `${lunarHour}时(${WUXINGMAP[lunarHour]})`
}

module.exports = { getLunarHour, getLunarHourFormat }