const lang = {
  name: 'Web Presentation',
  sidebar: '浏览',
  menu: {
    "new": '新建',
    open: '打开',
    saveAs: '另存为',
    history: '历史版本',
  },
  button: {
    markdown: '使用markdown编辑',
    expand: '展开',
    collapse: '收起',
    add: '添加（在当前页之后）',
    remove: '删除（当前页）',
    fullscreen: '全屏',
    help: '查看帮助',
    signin: '登录',
    menu: '菜单',
  },
  message: {
    fullscreen: '按ESC退出全屏',
    loading: '加载中...',
    nothing: '这里什么也没有...',
    upload: '拖拽到这里上传...',
    background: '设置为默认背景',

    history(time){
      return `创建于 ${time}`;
    },
    historyHint: '点击还原该历史记录',
  },

  time: {
    justnow: '刚刚',
    minutesago(m){
      return `${m} 分钟前`;
    },
    hoursago(h){
      return `${h} 小时前`;
    },
    yesterday: '昨天',
    daysago(d){
      return `${d} 天前`;
    },
    longago: '很久之前',
  },
};

export default lang;
