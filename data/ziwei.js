const SHICHENMAP = { '早子': 0, '子': 0, '丑': 1, '寅': 2, '卯': 3, '辰': 4, '巳': 5, '午': 6, '未': 7, '申': 8, '酉': 9, '戌': 10, '亥': 11, '晚子': 12 }
const GONGS = ['命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '仆役', '官禄', '田宅', '福德', '父母']
const NEIWAIGONGMAP = { '命宫': '内', '财帛': '内', '疾厄': '内', '官禄': '内', '田宅': '内', '福德': '内', '兄弟': '外', '夫妻': '外', '子女': '外', '迁移': '外', '仆役': '外', '父母': '外' }

const LIUNEIGONGS = ['命宫', '财帛', '疾厄', '官禄', '田宅', '福德']
const LIUWAIGONGS = ['兄弟', '夫妻', '子女', '迁移', '仆役', '父母']

const DUIGONGMAP = {
    '命宫': '迁移', '兄弟': '仆役', '夫妻': '官禄', '子女': '田宅', '财帛': '福德', '疾厄': '父母',
    '迁移': '命宫', '仆役': '兄弟', '官禄': '夫妻', '田宅': '子女', '福德': '财帛', '父母': '疾厄'
}

const GONGXIANMAP = {
    '命宫': '命迁', '兄弟': '兄仆', '夫妻': '夫官', '子女': '子田', '财帛': '财福', '疾厄': '疾父',
    '迁移': '命迁', '仆役': '兄仆', '官禄': '夫官', '田宅': '子田', '福德': '财福', '父母': '疾父'
}

const SANHES = ['亥卯未', '寅午戌', '巳酉丑', '申子辰']
const SIZHENGS = ['子午卯酉', '寅申巳亥', '辰戌丑未']

const SANHEMAP = {
    '亥': ['卯', '未'], '卯': ['亥', '未'], '未': ['亥', '卯'],
    '寅': ['午', '戌'], '午': ['寅', '戌'], '戌': ['寅', '午'],
    '巳': ['酉', '丑'], '酉': ['巳', '丑'], '丑': ['巳', '酉'],
    '申': ['子', '辰'], '子': ['申', '辰'], '辰': ['申', '子']
}

const SIZHENGMAP = {
    '子': ['午', '卯', '酉'], '午': ['子', '卯', '酉'], '卯': ['子', '午', '酉'], '酉': ['子', '午', '卯'],
    '寅': ['申', '巳', '亥'], '申': ['寅', '巳', '亥'], '巳': ['寅', '申', '亥'], '亥': ['寅', '巳', '申'],
    '辰': ['戌', '丑', '未'], '戌': ['辰', '丑', '未'], '丑': ['辰', '戌', '未'], '未': ['辰', '戌', '丑']
}

const HETUGONGZONGMAP1 = {
    '命宫': '疾厄', '兄弟': '迁移', '夫妻': '仆役', '子女': '官禄', '财帛': '田宅',
    '疾厄': '命宫', '迁移': '兄弟', '仆役': '夫妻', '官禄': '子女', '田宅': '财帛'
}
const HETUGONGZONGMAP2 = {
    '命宫': '福德', '兄弟': '父母',
    '福德': '命宫', '父母': '兄弟'
}
const LUOSHUGONGZONGMAP = {
    '子女': '兄弟', '疾厄': '仆役',
    '兄弟': '子女', '仆役': '疾厄'
}
const YITIGONGMAP1 = {
    '疾厄': '福德', '迁移': '父母', '仆役': '命宫', '官禄': '兄弟', '田宅': '夫妻',
    '福德': '疾厄', '父母': '迁移', '命宫': '仆役', '兄弟': '官禄', '夫妻': '田宅'
}

const YITIGONGMAP2 = {
    '福德': '子女', '父母': '财帛',
    '子女': '福德', '财帛': '父母'
}

const MINGGONGWEIMAP = { '夫妻': '感情位', '子女': '桃花位', '财帛': '支付位', '疾厄': '承载位', '仆役': '寿元位/绝情位', '官禄': '气数位', '田宅': '归魂位/归藏位', '福德': '先天位' }

const NANXINGS = ['天机', '天同', '天梁', '贪狼', '太阳', '廉贞禄', '左辅', '文昌']
const NVXINGS = ['紫微', '破军', '武曲', '巨门', '太阴', '廉贞忌', '右弼', '文曲']

const SIHUAMAP = {
    '甲': { '廉贞': '禄', '破军': '权', '武曲': '科', '太阳': '忌' },
    '乙': { '天机': '禄', '天梁': '权', '紫微': '科', '太阴': '忌' },
    '丙': { '天同': '禄', '天机': '权', '文昌': '科', '廉贞': '忌' },
    '丁': { '太阴': '禄', '天同': '权', '天机': '科', '巨门': '忌' },
    '戊': { '贪狼': '禄', '太阴': '权', '右弼': '科', '天机': '忌' },
    '己': { '武曲': '禄', '贪狼': '权', '天梁': '科', '文曲': '忌' },
    '庚': { '太阳': '禄', '武曲': '权', '太阴': '科', '天同': '忌' },
    '辛': { '巨门': '禄', '太阳': '权', '文曲': '科', '文昌': '忌' },
    '壬': { '天梁': '禄', '紫微': '权', '左辅': '科', '武曲': '忌' },
    '癸': { '破军': '禄', '巨门': '权', '太阴': '科', '贪狼': '忌' }
}

module.exports = { SHICHENMAP, GONGS, NEIWAIGONGMAP, DUIGONGMAP, GONGXIANMAP, SIHUAMAP, SANHES, SIZHENGS, HETUGONGZONGMAP1, HETUGONGZONGMAP2, NANXINGS, NVXINGS, SANHEMAP, SIZHENGMAP }