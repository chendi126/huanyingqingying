// 最新资讯数据 - 按日期从新到旧排序
export const newsData = [
  // 2025-02-19 (2条)
  {
    id: 13,
    category: '灯影胡声',
    categoryEn: 'Team Official',
    color: '#faad14',
    title: '华县皮影文化传承项目进展',
    source: '灯影胡声',
    date: '2025-02-19',
    url: 'https://mp.weixin.qq.com/s/i8G-T-oUegkDpexqoitFOw'
  },
  {
    id: 14,
    category: '灯影胡声',
    categoryEn: 'Team Official',
    color: '#faad14',
    title: '实践团队活动纪实',
    source: '灯影胡声',
    date: '2025-02-19',
    url: 'https://mp.weixin.qq.com/s/aQYCMZ5JpfdoHRxzB3rd1A'
  },

  // 2025-02-17 (1条)
  {
    id: 12,
    category: '灯影胡声',
    categoryEn: 'Team Official',
    color: '#faad14',
    title: '团队最新动态与活动回顾',
    source: '灯影胡声',
    date: '2025-02-17',
    url: 'https://mp.weixin.qq.com/s/58DmrUrSFgHH2SyNsRxcvQ'
  },

  // 2025-02-16 (3条)
  {
    id: 3,
    category: '央级媒体',
    categoryEn: 'National Media',
    color: '#c41e3a',
    title: '大学生社会实践报道',
    source: '大学生网',
    date: '2025-02-16',
    url: 'http://www.dcdxsw.com/shsj/shsjbg/93868.html'
  },
  {
    id: 4,
    category: '央级媒体',
    categoryEn: 'National Media',
    color: '#c41e3a',
    title: '华县皮影文化传承实践',
    source: '今日大学生网',
    date: '2025-02-16',
    url: 'http://www.jrdxsw.com/shsj/shsjbg/56367.html'
  },
  {
    id: 5,
    category: '央级媒体',
    categoryEn: 'National Media',
    color: '#c41e3a',
    title: '青年学子传承非遗文化',
    source: '新门户',
    date: '2025-02-16',
    url: 'http://www.xinmenhu.com/shsj/3879.html'
  },

  // 2025-02-15 (2条)
  {
    id: 1,
    category: '央级媒体',
    categoryEn: 'National Media',
    color: '#c41e3a',
    title: '华县皮影实践报道',
    source: '大学生网',
    date: '2025-02-15',
    url: 'https://m.dxsyb.com/mpaper/2025/0215/678023.html?t=1'
  },
  {
    id: 2,
    category: '央级媒体',
    categoryEn: 'National Media',
    color: '#c41e3a',
    title: '文化传承的青春力量',
    source: '中国教育报',
    date: '2025-02-15',
    url: 'https://m.jyrmt.com/mob/2025/0215/46307.html?t=1'
  },

  // 2025-02-07 (2条)
  {
    id: 9,
    category: '西财商学院',
    categoryEn: 'XAUFE Business School',
    color: '#52c41a',
    title: '商学院实践团队华县行',
    source: '西安财经大学商学院',
    date: '2025-02-07',
    url: 'https://mp.weixin.qq.com/s/9HYtL0Jyypp6Xns8j2RIEw'
  },
  {
    id: 10,
    category: '西财校团委',
    categoryEn: 'XAUFE Youth League',
    color: '#1890ff',
    title: '校团委组织文化实践活动',
    source: '西安财经大学校团委',
    date: '2025-02-07',
    url: 'https://mp.weixin.qq.com/s/6d8ezzRgs0vUJ_gmuheP-A'
  },

  // 2025-02-06 (1条)
  {
    id: 8,
    category: '西财商学院',
    categoryEn: 'XAUFE Business School',
    color: '#52c41a',
    title: '探寻皮影文化，传承非遗精神',
    source: '西安财经大学商学院',
    date: '2025-02-06',
    url: 'https://mp.weixin.qq.com/s/Ci524YKlstrl_5G_Kwxp3g'
  },

  // 2025-02-05 (1条)
  {
    id: 7,
    category: '西财商学院',
    categoryEn: 'XAUFE Business School',
    color: '#52c41a',
    title: '商学院学生深入华县开展实践活动',
    source: '西安财经大学商学院',
    date: '2025-02-05',
    url: 'https://mp.weixin.qq.com/s/UBj2KrZgIMl5xG4DVIWfog'
  },

  // 2025-01-18 (1条)
  {
    id: 11,
    category: '西财校团委',
    categoryEn: 'XAUFE Youth League',
    color: '#1890ff',
    title: '青年学子传承传统文化',
    source: '西安财经大学校团委',
    date: '2025-01-18',
    url: 'https://mp.weixin.qq.com/s/ij9jplYiUkTt2Wn6uLrbwA'
  },

  // 2025-01-15 (1条)
  {
    id: 6,
    category: '央级媒体',
    categoryEn: 'National Media',
    color: '#c41e3a',
    title: '西安财经大学学生实践活动',
    source: '微信公众号',
    date: '2025-01-15',
    url: 'https://mp.weixin.qq.com/s/4xguQTj2uY0Xx-yGnshyYQ'
  }
];

// 获取所有分类
export const categories = [
  { name: '全部', nameEn: 'All', color: '#c41e3a', count: newsData.length },
  { name: '央级媒体', nameEn: 'National Media', color: '#c41e3a', count: 6 },
  { name: '西财商学院', nameEn: 'Business School', color: '#52c41a', count: 3 },
  { name: '西财校团委', nameEn: 'Youth League', color: '#1890ff', count: 2 },
  { name: '灯影胡声', nameEn: 'Team Official', color: '#faad14', count: 3 }
];

