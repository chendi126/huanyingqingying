// 剧目数据
export const plays = [
  {
    id: 'play1',
    name: '西游记',
    nameEn: 'JOURNEY TO THE WEST',
    description: '经典神话故事，讲述唐僧师徒四人西天取经的传奇历程',
    thumbnail: '/huabu.jpg',
    position: { x: 0, y: 0 },
    connections: ['play2', 'play3'],
    characters: [
      { id: 'char1', name: '孙悟空', image: '/wangtianwen.png', role: '主角' },
      { id: 'char2', name: '唐僧', image: '/xuehongquan.png', role: '主角' },
      { id: 'char3', name: '猪八戒', image: '/dangfeihua.png', role: '主角' },
      { id: 'char4', name: '沙僧', image: '/wanghaiyan.png', role: '主角' }
    ]
  },
  {
    id: 'play2',
    name: '三国演义',
    nameEn: 'ROMANCE OF THREE KINGDOMS',
    description: '历史演义巨著，展现三国时期英雄豪杰的风云际会',
    thumbnail: '/huabu.jpg',
    position: { x: 1, y: -1 },
    connections: ['play1', 'play4'],
    characters: [
      { id: 'char5', name: '刘备', image: '/wangtianwen.png', role: '主角' },
      { id: 'char6', name: '关羽', image: '/xuehongquan.png', role: '主角' },
      { id: 'char7', name: '张飞', image: '/dangfeihua.png', role: '主角' },
      { id: 'char8', name: '诸葛亮', image: '/wanghaiyan.png', role: '主角' }
    ]
  },
  {
    id: 'play3',
    name: '白蛇传',
    nameEn: 'LEGEND OF WHITE SNAKE',
    description: '经典爱情传说，白娘子与许仙的千古绝唱',
    thumbnail: '/huabu.jpg',
    position: { x: -1, y: -1 },
    connections: ['play1', 'play5'],
    characters: [
      { id: 'char9', name: '白素贞', image: '/wangtianwen.png', role: '主角' },
      { id: 'char10', name: '许仙', image: '/xuehongquan.png', role: '主角' },
      { id: 'char11', name: '小青', image: '/dangfeihua.png', role: '配角' },
      { id: 'char12', name: '法海', image: '/wanghaiyan.png', role: '配角' }
    ]
  },
  {
    id: 'play4',
    name: '封神演义',
    nameEn: 'INVESTITURE OF THE GODS',
    description: '神魔小说经典，商周交替的神话史诗',
    thumbnail: '/huabu.jpg',
    position: { x: 1, y: 1 },
    connections: ['play2', 'play5'],
    characters: [
      { id: 'char13', name: '姜子牙', image: '/wangtianwen.png', role: '主角' },
      { id: 'char14', name: '哪吒', image: '/xuehongquan.png', role: '主角' },
      { id: 'char15', name: '杨戬', image: '/dangfeihua.png', role: '主角' },
      { id: 'char16', name: '妲己', image: '/wanghaiyan.png', role: '配角' }
    ]
  },
  {
    id: 'play5',
    name: '红楼梦',
    nameEn: 'DREAM OF RED MANSIONS',
    description: '古典文学巅峰之作，贾宝玉与林黛玉的爱情悲剧',
    thumbnail: '/huabu.jpg',
    position: { x: -1, y: 1 },
    connections: ['play3', 'play4'],
    characters: [
      { id: 'char17', name: '贾宝玉', image: '/wangtianwen.png', role: '主角' },
      { id: 'char18', name: '林黛玉', image: '/xuehongquan.png', role: '主角' },
      { id: 'char19', name: '薛宝钗', image: '/dangfeihua.png', role: '主角' },
      { id: 'char20', name: '王熙凤', image: '/wanghaiyan.png', role: '配角' }
    ]
  },
  {
    id: 'play6',
    name: '水浒传',
    nameEn: 'WATER MARGIN',
    description: '英雄传奇，一百零八位好汉的忠义故事',
    thumbnail: '/huabu.jpg',
    position: { x: 0, y: 2 },
    connections: ['play1', 'play7'],
    characters: [
      { id: 'char21', name: '宋江', image: '/wangtianwen.png', role: '主角' },
      { id: 'char22', name: '武松', image: '/xuehongquan.png', role: '主角' },
      { id: 'char23', name: '林冲', image: '/dangfeihua.png', role: '主角' },
      { id: 'char24', name: '鲁智深', image: '/wanghaiyan.png', role: '主角' }
    ]
  },
  {
    id: 'play7',
    name: '牡丹亭',
    nameEn: 'PEONY PAVILION',
    description: '昆曲经典，杜丽娘与柳梦梅的生死恋情',
    thumbnail: '/huabu.jpg',
    position: { x: 2, y: 0 },
    connections: ['play6', 'play8'],
    characters: [
      { id: 'char25', name: '杜丽娘', image: '/wangtianwen.png', role: '主角' },
      { id: 'char26', name: '柳梦梅', image: '/xuehongquan.png', role: '主角' },
      { id: 'char27', name: '春香', image: '/dangfeihua.png', role: '配角' }
    ]
  },
  {
    id: 'play8',
    name: '长生殿',
    nameEn: 'PALACE OF ETERNAL LIFE',
    description: '唐明皇与杨贵妃的爱情悲剧',
    thumbnail: '/huabu.jpg',
    position: { x: -2, y: 0 },
    connections: ['play7', 'play9'],
    characters: [
      { id: 'char28', name: '唐明皇', image: '/wangtianwen.png', role: '主角' },
      { id: 'char29', name: '杨贵妃', image: '/xuehongquan.png', role: '主角' },
      { id: 'char30', name: '高力士', image: '/dangfeihua.png', role: '配角' }
    ]
  },
  {
    id: 'play9',
    name: '桃花扇',
    nameEn: 'PEACH BLOSSOM FAN',
    description: '明末清初的历史爱情故事',
    thumbnail: '/huabu.jpg',
    position: { x: 0, y: -2 },
    connections: ['play8', 'play10'],
    characters: [
      { id: 'char31', name: '侯方域', image: '/wangtianwen.png', role: '主角' },
      { id: 'char32', name: '李香君', image: '/xuehongquan.png', role: '主角' },
      { id: 'char33', name: '苏昆生', image: '/dangfeihua.png', role: '配角' }
    ]
  },
  {
    id: 'play10',
    name: '窦娥冤',
    nameEn: 'INJUSTICE TO DOU E',
    description: '元杂剧经典，窦娥的冤屈与抗争',
    thumbnail: '/huabu.jpg',
    position: { x: 1.5, y: -1.5 },
    connections: ['play9', 'play1'],
    characters: [
      { id: 'char34', name: '窦娥', image: '/wangtianwen.png', role: '主角' },
      { id: 'char35', name: '窦天章', image: '/xuehongquan.png', role: '配角' },
      { id: 'char36', name: '蔡婆婆', image: '/dangfeihua.png', role: '配角' }
    ]
  }
];

// 根据ID获取剧目
export function getPlayById(id) {
  return plays.find(play => play.id === id);
}

// 获取剧目的连接线
export function getPlayConnections() {
  const connections = [];
  plays.forEach(play => {
    play.connections.forEach(connId => {
      const targetPlay = plays.find(p => p.id === connId);
      if (targetPlay) {
        connections.push({
          from: play.position,
          to: targetPlay.position
        });
      }
    });
  });
  return connections;
}

