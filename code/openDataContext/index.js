/**
 * 微信开放数据域
 * 使用 Canvas2DAPI 在 SharedCanvas 渲染一个排行榜，
 * 并在主域中渲染此 SharedCanvas
 */







/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
const assetsUrl = {
  // icon: "assets/icon.png",
  // box: "assets/box.png",
  // panel: "assets/panel.png",
  // button_l: "assets/button_l.png",
  // button_r: "assets/button_r.png",
  // title: "assets/rankingtitle.png",
  // rank1: "assets/icon_rank1.png",
  // rank2: "assets/icon_rank2.png",
  // rank3: "assets/icon_rank3.png",
  // headbg: "assets/icon_zhuanpan.png",
  // scroebg: "assets/grid9_ditiao.png",
  // itembg: "assets/itembg.png",
  //rankbg: "assets/headkuang_haoyou.png",
  //selfrankbg: "assets/headkuang_wanjia.png",
  //headdefault: "assets/headdefault.png",
  //shengzi: "assets/img_shengzi.png"
};

let avatarUrlList = {};

/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
let assets = {};
let assetsAvatarUrl = {};
/**
 * canvas 大小
 * 这里暂时写死
 * 需要从主域传入
 */
let canvasWidth;
let canvasHeight;

let startIndex = 0;

//获取canvas渲染上下文
const context = sharedCanvas.getContext("2d");
context.globalCompositeOperation = "source-over";

/**
 * 所有头像数据
 * 包括姓名，头像图片，得分
 * 排位序号i会根据parge*perPageNum+i+1进行计算
 */
let totalGroup = [{
  key: 1,
  name: "1111111111",
  url: "",
  scroes: 10000
}];

//
let openContext = wx.getSharedCanvas().getContext("2d");
openContext["canvas"]["userDataList"] = JSON.stringify(totalGroup);

/**
 * 根据屏幕大小初始化所有绘制数据
 */
function init() {
  stageWidth = sharedCanvas.width;
  stageHeight = sharedCanvas.height;
  startX = stageWidth / 6;
  startY = 0; //50;
  avatarSize = 90;
  intervalX = 40;

  let data = wx.getSystemInfoSync();
  canvasWidth = data.windowWidth;
  canvasHeight = data.windowHeight;
}

/**
 * 创建两个点击按钮
 */
function drawButton() {
  // context_drawImage(assets.button_r, nextButtonX, nextButtonY, buttonWidth, buttonHeight);
  // context_drawImage(assets.button_l, lastButtonX, lastButtonY, buttonWidth, buttonHeight);
}


/**
 * 根据当前绘制组绘制排行榜
 */
function drawRankByGroup(currentGroup) {
  if (userDataList == null) {
    return;
  }
  for (let i = startIndex; i < startIndex + 5; i++) {
    if (userDataList[i]) {
      drawByData(userDataList[i], (i - startIndex));
    }
  }
}

/**
 * 根据绘制信息以及当前i绘制元素
 */
function drawByData(data, i) {
  let x = startX;
  // //绘制底框
  // context_drawImage(assets.box, startX, startY + i * preOffsetY, barWidth, barHeight);
  // x += 10;
  // //设置字体
  // context.font = fontSize + "px Arial";
  // context.fillStyle = "#000000";
  // //绘制序号
  // context.fillText(data.key + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
  // x += indexWidth + intervalX;
  // //绘制头像
  // if (data.url) {
  //   var image = wx.createImage();
  //   image.src = data.url
  //   image.onload = function () {
  //     renderDirty = true;
  //   }
  //   context_drawImage(image, x, startY + i * preOffsetY + (barHeight - avatarSize) / 2, avatarSize, avatarSize);
  // }
  // x += avatarSize + intervalX;
  // //绘制名称
  // context.fillText(data.name + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
  // x += textMaxSize + intervalX;
  // //绘制分数
  // context.fillText(data.scroes + "关", x, startY + i * preOffsetY + textOffsetY, textMaxSize);

  ////////////////////////////////////////////////

  let itemHeight = 138; //503,135
  let itemWidth = 520;
  let index = i + 1 + startIndex;
  let kvDataList = data.KVDataList;
  let kvDataList_1 = kvDataList[0];
  let score = kvDataList_1.value;

  //绘制背景
  //context_drawImage(assets['itembg'], 4, startY + i * itemHeight + 4, 503, 135);

  context.textAlign = "center";
  //排名
  if (1 <= index && index <= 3) {
    context_drawImage(assets['rank' + index], 30, startY + i * itemHeight + 50, 62, 48);
  } else {
    context.font = '26px Arial'
    context.fillStyle = '#A52C2C'; //'yellow'
    context.fillText(index + "", 54, startY + i * itemHeight + 80);
  }

  //绘制头像
  //context_drawImage(assets["headbg"], 104, startY + i * itemHeight + 16, 105, 104);
  context_drawImage(assetsAvatarUrl[data.openid], 100, startY + i * itemHeight + 28, avatarSize, avatarSize);

  //绘制名称
  context.font = '26px Arial'
  context.fillStyle = '#A52C2C'; //'yellow'
  // context.fillText(getNameSlice(data.nickname) + "", 140, startY + i * itemHeight + 58);
  context.fillText(getNameSlice(data.nickname) + "", 280, startY + i * itemHeight + 80);

  //分数
  //context_drawImage(assets['scroebg'], 22, startY + i * itemHeight + 166, 125, 40);
  context.font = '26px Arial'
  context.fillStyle = '#A52C2C' //'yellow'
  context.fillText(score + '关', 420, startY + i * itemHeight + 80);
}

/**
 * 点击处理
 */
function onTouchEnd(event) {
  let x = event.clientX * sharedCanvas.width / canvasWidth;
  let y = event.clientY * sharedCanvas.height / canvasHeight;
  if (x > lastButtonX && x < lastButtonX + buttonWidth &&
    y > lastButtonY && y < lastButtonY + buttonHeight) {
    //在last按钮的范围内
    if (page > 0) {
      buttonClick(0);
    }
  }
  if (x > nextButtonX && x < nextButtonX + buttonWidth &&
    y > nextButtonY && y < nextButtonY + buttonHeight) {
    //在next按钮的范围内
    if ((page + 1) * perPageMaxNum < totalGroup.length) {
      buttonClick(1);
    }
  }

}
/**
 * 根据传入的buttonKey 执行点击处理
 * 0 为上一页按钮
 * 1 为下一页按钮
 */
function buttonClick(buttonKey) {
  let old_buttonY;
  if (buttonKey == 0) {
    //上一页按钮
    old_buttonY = lastButtonY;
    lastButtonY += 10;
    page--;
    renderDirty = true;
    console.log('上一页' + page);
    setTimeout(() => {
      lastButtonY = old_buttonY;
      //重新渲染必须标脏
      renderDirty = true;
    }, 100);
  } else if (buttonKey == 1) {
    //下一页按钮
    old_buttonY = nextButtonY;
    nextButtonY += 10;
    page++;
    renderDirty = true;
    console.log('下一页' + page);
    setTimeout(() => {
      nextButtonY = old_buttonY;
      //重新渲染必须标脏
      renderDirty = true;
    }, 100);
  }

}

/////////////////////////////////////////////////////////////////// 相关缓存数据

///////////////////////////////////数据相关/////////////////////////////////////

/**
 * 渲染标脏量
 * 会在被标脏（true）后重新渲染
 */
let renderDirty = true;

/**
 * 当前绘制组
 */
let currentGroup = [];
/**
 * 每页最多显示个数
 */
let perPageMaxNum = 5;
/**
 * 当前页数,默认0为第一页
 */
let page = 0;

/**
 * 我的当前得分
 */
let myCurrentScore = 0;
/**
 * 我的当前排名
 */
let myRank = 1;
let myRankOld = 0;
let myNickName;
let myOpenId;

let startXResult = 0;

/** 好友排行榜数据 */
let userDataList;
/** 更新前好友排行榜数据 */
let oldUserDataList;
/** 待邀请未注册的好友名单 */
let potFirendList;


///////////////////////////////////绘制相关///////////////////////////////
/**
 * 舞台大小
 */
let stageWidth;
let stageHeight;
/**
 * 排行榜大小
 */
let rankWidth;
let rankHeight;

/**
 * 每个头像条目的大小
 */
let barWidth;
let barHeight;
/**
 * 条目与排行榜边界的水平距离
 */
let offsetX_barToRank
/**
 * 绘制排行榜起始点X
 */
let startX;
/**
 * 绘制排行榜起始点Y
 */
let startY;
/**
 * 每行Y轴间隔offsetY
 */
let preOffsetY;
/**
 * 按钮大小
 */
let buttonWidth;
let buttonHeight;
/**
 * 上一页按钮X坐标
 */
let lastButtonX;
/**
 * 下一页按钮x坐标
 */
let nextButtonX;
/**
 * 上一页按钮y坐标
 */
let lastButtonY;
/**
 * 下一页按钮y坐标
 */
let nextButtonY;
/**
 * 两个按钮的间距
 */
let buttonOffset;

/**
 * 字体大小
 */
let fontSize;
/**
 * 文本文字Y轴偏移量
 * 可以使文本相对于图片大小居中
 */
let textOffsetY;
/**
 * 头像大小
 */
let avatarSize;
/**
 * 名字文本最大宽度，名称会根据
 */
let textMaxSize;
/**
 * 绘制元素之间的间隔量
 */
let intervalX;
/**
 * 排行榜与舞台边界的水平距离
 */
let offsetX_rankToBorder;
/**
 * 排行榜与舞台边界的竖直距离
 */
let offsetY_rankToBorder;
/**
 * 绘制排名的最大宽度
 */
let indexWidth;

//////////////////////////////////////////////////////////
/**
 * 监听点击
 */
wx.onTouchEnd((event) => {
  const l = event.changedTouches.length;
  for (let i = 0; i < l; i++) {
    onTouchEnd(event.changedTouches[i]);
  }
});


/**
 * 是否加载过资源的标记量
 */
let hasLoadRes;

/**
 * 资源加载
 */
function preloadAssets() {
  let preloaded = 0;
  let count = 0;
  for (let asset in assetsUrl) {
    count++;
    const img = wx.createImage();
    img.onload = () => {
      preloaded++;
      if (preloaded == count) {
        // console.log("加载完成");
        hasLoadRes = true;
      }

    }
    img.src = assetsUrl[asset];
    assets[asset] = img;
  }
}

function preloadAvatarUrl() {
  let preloaded = 0;
  let count = 0;
  for (let id in avatarUrlList) {
    count++;
    const img = wx.createImage();
    img.onload = () => {
      preloaded++;
      if (preloaded == count) {
        // console.log("头像加载完成");
        hasLoadRes = true;
      }
    }
    // console.log("srcUrl:" + avatarUrlList[id] + " asset:" + id);
    img.src = avatarUrlList[id] || assetsUrl['headdefault'];
    assetsAvatarUrl[id] = img;
  }
}


/**
 * 绘制屏幕
 * 这个函数会在加载完所有资源之后被调用
 */
function createScene() {
  if (sharedCanvas.width && sharedCanvas.height) {
    // console.log('初始化完成')
    stageWidth = sharedCanvas.width;
    stageHeight = sharedCanvas.height;
    init();
    drawRankByGroup();
    return true;
  } else {
    console.log('创建开放数据域失败，请检查是否加载开放数据域资源');
    return false;
  }
}

/**
 * 
 */
function createMyScene() {
  if (sharedCanvas.width && sharedCanvas.height) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, sharedCanvas.height - sharedCanvas.height / 4 - 70, sharedCanvas.width, sharedCanvas.height / 2);
    //序号背景
    stageWidth = sharedCanvas.width;
    stageHeight = sharedCanvas.height;

    let myData = {
      openid: myOpenId,
      rank: myRank,
      name: myNickName,
      score: myCurrentScore
    };
    let userList = [];
    let score = 0;

    if (userDataList && userDataList.length) {
      let len = 4;
      if (userDataList.length > 3 && myRank > 4) {
        len = 3;
      }
      for (let i = 0; i < len; i++) {
        if (userDataList[i]) {
          score = userDataList[i].KVDataList[0].value;
          userList.push({
            openid: userDataList[i].openid,
            rank: (i + 1),
            name: userDataList[i].nickname,
            score: score
          });
        }
      }
      if (len == 3 && myOpenId) {
        userList.push(myData);
      }
    } else {
      if (myOpenId) {
        userList.push(myData);
      }
    }
    for (let i = 0; i < userList.length; i++) {
      let data = userList[i];
      let bself = data.name == myData.name;
      drawRankItemData(data, i, bself);
    }
    return true;
  } else {
    console.log('创建开放数据域失败，请检查是否加载开放数据域资源');
    return false;
  }
}

let rank_height = 105;
let rank_width = 120;
/**
 * 根据玩家信息绘制玩家头像
 */
function drawRankItemData(data, i, bself) {
  context.textAlign = "center";
  context.textBaseline = "hanging";

  let m_y = i * rank_height;
  let m_x = 0;
  let head_height = 64;
  let head_width = 64;

  //context_drawImage(assets["shengzi"], m_x + 64, m_y - 6, 12, 28);
  let head_x = m_x + (rank_width - head_width) * 0.5 + 8;
  let head_y = m_y + 20;
  if (data.openid) {
    context_drawImage(assetsAvatarUrl[data.openid], head_x, head_y, head_width, head_height);
  } else {
    //context_drawImage(assets["rankbg"], head_x, head_y, head_width, head_height);
  }
  let bg_height = 92;
  let bg_width = 84;
  let bg_x = m_x + 28;
  let bg_y = m_y + 12;

  //let imgStr = "rankbg";
  //if (bself) {
  //  imgStr = "selfrankbg";
  //}
  //context_drawImage(assets[imgStr], bg_x, bg_y, bg_width, bg_height);

  if (data.rank < 4) {
    let rankIcon_y = m_y - 4;
    context_drawImage(assets["rank" + data.rank], 0, rankIcon_y, 62, 48);
  } else {
    context.font = "30px SimHei";
    context.lineWidth = 6;
    context.strokeStyle = '#5f2300';
    context.strokeText(data.rank + "", m_x + 34, m_y + 18);
    context.fillStyle = "#43ff00";
    context.fillText(data.rank + "", m_x + 34, m_y + 18);
  }

  let font_x = bg_x + (bg_width * 0.5);
  let font_y = m_y + 72;
  let txt = data.score + '关';

  context.font = "22px SimHei";
  context.lineWidth = 6;
  context.strokeStyle = '#5f2300';
  context.strokeText(txt, font_x, font_y);
  context.fillStyle = "#ffffff";
  context.fillText(txt, font_x, font_y);
}


//记录requestAnimationFrame的ID
let requestAnimationFrameID;
let hasCreateScene;

/**
 * 增加来自主域的监听函数
 */
function addOpenDataContextListener() {
  console.log('增加监听函数')
  let oldOffset = 0;
  wx.onMessage((data) => {
    console.log(data);
    if (data.command == 'open') {
      startIndex = 0;
      if (data.shareTicket && data.shareTicket != "") {
        getGroupCloudStorage(data.shareTicket);
        setTimeout((e) => {
          createScene();
          //createMyScene();
        }, 500);
      } else {
        createScene();
        //createMyScene();
      }
    } else if (data.command == 'open_myrank') {
      createMyScene();
    } else if (data.command == 'update_myrank') {
      getFriendCloudInfo();
    } else if (data.command == 'scrollView') {
      /** 滚动列表，刷新显示 */
      if (data.offSetY > 0) {
        //手指向下滑（前翻）
        if (0 == startIndex && startY >= 0) {
          //已翻到最前端
          return;
        }
      } else if (data.offSetY < 0) {
        //手指往上滑（后翻）
        if (startIndex + 5 >= userDataList.length && startY <= -36) {
          //已翻到最后端
          return;
        }
      }
      startY = startY + Math.round(data.offSetY / 1);
      // console.log("startY:" + startY + " data.offSetY:" + data.offSetY + " data.offSetY / 10:" + Math.round(data.offSetY / 10) + " startIndex:" + startIndex);

      if (startY > 138) {
        // console.log("----startY:" + startY + " startIndex:" + startIndex);
        startIndex = (startIndex > 0) ? startIndex - 1 : 0;
        startY = 0;
      }

      if (startY <= -36) {
        startY = -36;
        startIndex += 1;
      }

      if (data.offSetY < 0 && startIndex >= userDataList.length - 5) {
        startIndex = userDataList.length - 5;
        startY = -40;
      }
      //控制不再往下拉
      if (data.offSetY > 0 && startIndex == 0 && startY > 10) {
        startY = 10;
      }
      // console.log("startY:" + startY + " startIndex:" + startIndex);

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
      drawRankByGroup();
    } else if (data.command == 'close') {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
      hasCreateScene = false;
    } else if (data.command == 'loadRes' && !hasLoadRes) {
      /**
       * 加载资源函数
       * 只需要加载一次
       */
      // console.log('加载资源')
      getMyUserInfo();
      getFriendCloudInfo();
      preloadAssets();
    } else if (data.command == 'openFriendShareReward') {
      getPotentialFriendInfo();
    } else if (data.command == 'updateFriendShareReward') {
      getPotentialFriendInfo();
    } else if (data.command == 'sendMessageToFriend') {
      sendMessageToFriend(data.index);
    } else if (data.type == 'cleanCanvas') {
      //
      init();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
      hasCreateScene = false;
    } else if (data.type == 'shareTicket') {
      let shareTicket = data.text; // 开放数据域顺利拿到shareTicket
    }
  });
}

addOpenDataContextListener();

function createFriendShareRewardList() {
  let allWidth = 512;
  let allHeight = 575;
  let itemHeight = allHeight / 4;
  context.clearRect(0, 0, allWidth, allHeight);

  if (!potFirendList || !potFirendList.length) {
    context.fillStyle = "#FCF2D9";
    context.fillRect(0, 0, allWidth, allHeight);
    context.textAlign = "center";
    context.textBaseline = "hanging";
    context.font = "34px SimHei";
    context.lineWidth = 4;
    context.strokeStyle = '#592509';
    context.strokeText("暂无可邀请好友", allWidth * 0.5, allWidth * 0.5);
    context.fillStyle = "#ffffff";
    context.fillText("暂无可邀请好友", allWidth * 0.5, allWidth * 0.5);
    return;
  } else if (potFirendList.length < 4) {
    let num = potFirendList.length;
    context.fillStyle = "#FCF2D9";
    context.fillRect(0, itemHeight * num, allWidth, (4 - potFirendList.length) * itemHeight);
  }

  let descList = [];
  descList.push({
    txt: "有什么游戏可以推荐的吗"
  })
  descList.push({
    txt: "最近还好吗，找个游戏开黑呗！"
  })
  descList.push({
    txt: "消消乐玩不动了，推荐个新鲜的"
  })
  descList.push({
    txt: "在家里呆着玩游戏，就不容易吃胖了"
  })
  descList.push({
    txt: "追剧太伤，还是游戏适合我"
  })
  descList.push({
    txt: "最近有什么好玩的？"
  })
  descList.push({
    txt: "你在玩的游戏一定要记得推荐给我哦"
  })
  descList.push({
    txt: "你还...好么?"
  })
  descList.push({
    txt: "有什么碎片时间可以玩的游戏，丢过来"
  })
  descList.push({
    txt: "你是有多久没联系我了"
  })
  descList.push({
    txt: "来来，三消你能赢我请你吃饭"
  })
  descList.push({
    txt: "动作太累卡牌太贵，还是三消最实惠"
  })
  descList.push({
    txt: "好想当店长，哪怕在游戏里也行"
  })

  for (let i = 0; i < potFirendList.length; i++) {
    let desc = descList[Math.floor(Math.random() * descList.length)];
    createFriendItem(i, potFirendList[i], desc.txt);
  }
}

function createFriendItem(index, data, desc) {
  let name = data.nickname;
  if (data.nickname.length > 6) {
    name = data.nickname.substring(0, 6) + "...";
  }

  let itemY = index * 134;

  const image = wx.createImage()
  image.onload = function () {
    context.drawImage(image, 52, itemY + 20, 100, 100);
  }
  image.src = data.avatarUrl;

  context.textAlign = "left";
  context.textBaseline = "hanging";
  context.font = "26px SimHei";
  context.lineWidth = 4;
  context.strokeStyle = '#592509';
  context.strokeText(name + "", 180, itemY + 16);
  context.fillStyle = "#ffffff";
  context.fillText(name + "", 180, itemY + 16);

  context.font = "20px SimHei";
  context.fillStyle = "#592509";
  let descList = [];
  let descWidth = 0;
  let str = ""
  for (let i = 0; i < desc.length; i++) {
    str += desc[i];
    if (context.measureText(str).width + context.measureText(desc[i]).width > 262) {
      descList.push(str);
      str = "";
    }
  }
  if (str.length) {
    descList.push(str);
  }
  for (let i = 0; i < descList.length; i++) {
    context.fillText(descList[i] + "", 180, itemY + 60 + (i * 21));
  }
}

/** 发起一次定向分享 */
function sendMessageToFriend(index) {
  let data = potFirendList[index];
  let descList = [
    { txt: "我保证这是你没见过的三消" },
    { txt: "一起创业赚小钱钱" },
    { txt: "盖楼哪家强？中国No.1" }
  ];

  let desc = descList[Math.floor(Math.random() * descList.length)];
  console.log(data);
  wx.shareMessageToFriend({
    openId: data.openid,
    title: desc.txt,
    imageUrl: "https://mu.8zhong.cn/cdn/sxmarket/xxmtl_wx_test_debug/resource/assets/share/share.png?v=1"
  })
}

/**
 * 循环函数
 * 每帧判断一下是否需要渲染
 * 如果被标脏，则重新渲染
 */
function loop() {
  // if (renderDirty) {
  //   // console.log(`stageWidth :${stageWidth}   stageHeight:${stageHeight}`)
  //   context.setTransform(1, 0, 0, 1, 0, 0);
  //   context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
  //   renderDirty = false;
  // }
  // requestAnimationFrameID = requestAnimationFrame(loop);
}

/**
 * 图片绘制函数
 */
function context_drawImage(image, x, y, width, height) {
  if (image && image.width != 0 && image.height != 0 && context) {
    if (width && height) {
      context.drawImage(image, x, y, width, height);
    } else {
      context.drawImage(image, x, y);
    }
  }
}

function setGroupList(groupid) {
  wx.getGroupCloudStorage({
    shareTicket: groupid,
    keyList: ["score"],
    success: res => {
      console.log("getGroupCloudStorage", res);
      if (!res.data) {
        return;
      }
      console.log("group", 1);
      kvlist2totogroup(res.data);
    },
    fail: err => {
      console.log(err);
    },
    complete: () => { }
  });
}

function setFirendList() {
  wx.getFriendCloudStorage({
    keyList: ["score"],
    success: res => {
      console.log("getFriendCloudStorage", res);
      if (!res.data) {
        return;
      }
      console.log("friend", 1);
      kvlist2totogroup(res.data);
    },
    fail: err => {
      console.log(err);
    },
    complete: () => { }
  });
}

/**
 * 把微信的数据转化成我们的数据
 */
function kvlist2totogroup(reslist) {
  let dataList = [];
  reslist.forEach((data) => {
    if (data.KVDataList.length > 0) {
      dataList.push(data);
    }
  });
  if (dataList.length === 0) {
    return;
  }
  dataList.sort((a, b) => {
    return b.KVDataList[0].value - a.KVDataList[0].value;
  });
  totalGroup = [];
  for (var i = 0; i < dataList.length; i++) {
    var obj = {};
    obj.key = i + 1;
    obj.name = dataList[i].nickname;
    obj.url = dataList[i].avatarUrl;
    obj.scroes = dataList[i].KVDataList[0].value;
    totalGroup.push(obj);
    if (obj.name == myNickName) {
      myCurrentScore = obj.scroes;
      myRank = obj.key;
    }
  }
  renderDirty = true;
}

/** 获取未注册的好友名单 */
function getPotentialFriendInfo() {
  wx.getPotentialFriendList({
    success: res => {
      console.log(res.list);
      potFirendList = res.list;
      if (potFirendList == null || potFirendList.length == 0) {
        return;
      } else if (potFirendList.length > 4) {
        potFirendList.length = 4
      }
      for (let i = 0; i < potFirendList.length; i++) {
        let openId = potFirendList[i].openid;
        avatarUrlList[openId] = potFirendList[i].avatarUrl;
      }
      // preloadAvatarUrl();
      createFriendShareRewardList();
    },
    fail: res => {
      console.log(res);
    }
  })
}

/** 获取好友排行榜 */
function getFriendCloudInfo() {
  //获取当前用户也玩该小游戏的好友的用户数据
  wx.getFriendCloudStorage({
    keyList: ['score', 'uploadTime'], //
    success: res => {
      console.log(res);
      userDataList = res.data;
      if (userDataList == null || userDataList.length == 0) {
        console.log("userDataList is null");
        return;
      }
      //排序
      userDataList.sort(compare("KVDataList"));
      perPageMaxNum = userDataList.length;
      myRank = perPageMaxNum + 1;
      // console.log("过滤后");
      // console.log(userDataList);
      if (userDataList.length >= 1) {
        for (let i = 0; i < userDataList.length; i++) {
          let openId = userDataList[i].openid;
          if (userDataList[i].nickname == myNickName) {
            let kvDataList = userDataList[i].KVDataList;
            let kvDataScore_1 = kvDataList[0];
            let score = kvDataScore_1.value;
            myCurrentScore = score;
            myRank = i + 1;
            // console.log("我的排名:" + myRank + " 得分:" + myCurrentScore);           
          }
          // console.log("openId:" + openId + " nickname:" + userDataList[i].nickname);
          avatarUrlList[openId] = userDataList[i].avatarUrl;
        }
      }
      preloadAvatarUrl();
    },
    fail: res => {
      console.log(res);
    }
  });
}

/** 获取群好友排行榜 */
function getGroupCloudStorage(ticket) {
  //获取当前用户在某个群中也玩该小游戏的成员的用户数据
  wx.getGroupCloudStorage({
    shareTicket: ticket, // 需要带上shareTicket
    keyList: ['score', 'uploadTime'],
    success: res => {
      // console.log(res.data);
      userDataList = res.data;

      if (userDataList == null || userDataList.length == 0) {
        return;
      }
      //排序
      userDataList.sort(compare("KVDataList"));
      perPageMaxNum = userDataList.length;
      myRank = perPageMaxNum + 1;
      // console.log("排序后");
      // console.log(userDataList);
      if (userDataList.length >= 1) {
        for (let i = 0; i < userDataList.length; i++) {
          let openId = userDataList[i].openid;
          if (userDataList[i].nickname == myNickName) {
            let kvDataList = userDataList[i].KVDataList;
            let kvDataList_1 = kvDataList[0];
            let score = kvDataList_1.value;
            myCurrentScore = score;
            myRank = i + 1;
            // console.log("我的排名:" + myRank + " 得分:" + myCurrentScore);
          }
          // console.log("openId:" + openId + " nickname:" + userDataList[i].nickname);
          avatarUrlList[openId] = userDataList[i].avatarUrl;
        }
      }
      preloadAvatarUrl();
    },
    fail: res => {
      console.log(res.data);
    }
  });
}

/** 获取自己信息 */
function getMyUserInfo() {
  wx.getUserInfo({
    openIdList: ['selfOpenId'],
    success: res => {
      var userInfo = res.data
      var nickName = userInfo[0].nickName
      var avatarUrl = userInfo[0].avatarUrl
      var gender = userInfo[0].gender //性别 0：未知、1：男、2：女
      var province = userInfo[0].province
      var city = userInfo[0].city
      var country = userInfo[0].country
      var openid = userInfo[0].openId

      console.log("self -> nickName:" + nickName + " openid:" + openid + " avatarUrl:" + avatarUrl);
      myNickName = nickName;
      myOpenId = openid;
      avatarUrlList[myOpenId] = avatarUrl;
      myCurrentScore

      preloadAvatarUrl();
    }
  })
}

//给排行榜排序(降序)
var compare = function (prop) {
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    var int1 = val1[0]["value"];
    var int2 = val2[0]["value"];
    if (!isNaN(Number(int1)) && !isNaN(Number(int2))) {
      int1 = Number(int1);
      int2 = Number(int2);
    }
    if (int1 < int2) {
      return 1;
    } else if (int1 > int2) {
      return -1;
    } else {
      return 0;
    }
  }
}

/**
 * 缩短昵称，超过12个字符，都缩短
 */
function getNameSlice(nameStr) {
  let tempName = nameStr;
  if (strlen(nameStr) > 6) {
    tempName = nameStr.substring(0, 3) + "...";
  }
  return tempName;
}

//获取字符串长度(英文占1个字符，中文汉字占2个字符)
function strlen(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1   
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}