export const CITIES = [{
  name: '全部',
  id: 'all'
}, {
  name: '北京',
  id: 'beijing'
}, {
  name: '上海',
  id: 'shanghai'
}, {
  name: '深圳',
  id: 'shenzhen'
}, {
  name: '广州',
  id: 'guangzhou'
}];

export const L_ROOMLIST = [{
  "startTime": "2018-06-05 14:00",
  "endTime": "2018-06-05 15:00",
  "roomId": "oct001",
  "roomName": "深圳-桃花源",
  "maxAttendees": 2,
  "hasPhone": 0,
  "hasVideo": 1,
  "currentAvailable": 1
}, {
  "startTime": "2017-06-05 15:30",
  "endTime": "2017-06-05 16:00",
  "roomId": "oct002",
  "roomName": "深圳--雅岚阁",
  "maxAttendees": 8,
  "hasPhone": 1,
  "hasVideo": 0,
  "currentAvailable": 0
  }, {
    "startTime": "2017-06-05 15:30",
    "endTime": "2017-06-05 17:00",
    "roomId": "oct003",
    "roomName": "深圳--水云间",
    "maxAttendees": 15,
    "hasPhone": 1,
    "hasVideo": 1,
    "currentAvailable": 0
}, {
  "startTime": "2017-06-05 14:30",
  "endTime": "2017-06-05 16:00",
  "roomId": "oct004",
  "roomName": "深圳--欢乐谷",
  "maxAttendees": 10,
  "hasPhone": 1,
  "hasVideo": 0,
  "currentAvailable": 1
  }, {
    "startTime": "2017-06-05 13:30",
    "endTime": "2017-06-05 16:10",
    "roomId": "oct05",
    "roomName": "深圳--天一阁",
    "maxAttendees": 110,
    "hasPhone": 1,
    "hasVideo": 0,
    "currentAvailable": 0
}, {
  "startTime": "2017-06-05 15:30",
  "endTime": "2017-06-05 21:00",
  "roomId": "oct006",
  "roomName": "深圳--凤凰山",
  "maxAttendees": 5,
  "hasPhone": 1,
  "hasVideo": 0,
  "currentAvailable": 1
  }, {
    "startTime": "2017-06-05 08:30",
    "endTime": "2017-06-05 16:00",
    "roomId": "oct007",
    "roomName": "深圳--科技园",
    "maxAttendees": 13,
    "hasPhone": 1,
    "hasVideo": 1,
    "currentAvailable": 1
  }]
export const CONTACTS = [{
  initial: 'A',
  contactsInfo: [{ email: 'aluba@qq.com', name: '阿鲁巴', check: false }, { email: 'aboluo@qq.com', name: '阿波罗', check: false }]
}, {
  initial: 'B',
  contactsInfo: [{ email: 'baoshijie@qq.com', name: '保时捷', check: false }]
}, {
  initial: 'C',
  contactsInfo: [{ email: 'chenguanxi@qq.com', name: '陈冠西', check: false }, { email: 'chenchen@qq.com', name: '橙橙', check: false }, { email: 'chengli@qq.com', name: '城里', check: false }]
}, {
  initial: 'D',
  contactsInfo: []
}, {
  initial: 'E',
  contactsInfo: []
}, {
  initial: 'F',
  contactsInfo: []
}, {
  initial: 'G',
  contactsInfo: []
}, {
  initial: 'H',
  contactsInfo: []
}, {
  initial: 'I',
  contactsInfo: []
}, {
  initial: 'J',
  contactsInfo: []
}, {
  initial: 'K',
  contactsInfo: []
}, {
  initial: 'L',
  contactsInfo: []
}, {
  initial: 'M',
  contactsInfo: []
}, {
  initial: 'N',
  contactsInfo: [{ email: 'NEIMAER@qq.com', name: '内马尔', check: false }]
}, {
  initial: 'O',
  contactsInfo: []
}, {
  initial: 'P',
  contactsInfo: []
}, {
  initial: 'Q',
  contactsInfo: []
}, {
  initial: 'R',
  contactsInfo: []
}, {
  initial: 'S',
  contactsInfo: []
}, {
  initial: 'T',
  contactsInfo: []
}, {
  initial: 'U',
  contactsInfo: []
}, {
  initial: 'V',
  contactsInfo: []
}, {
  initial: 'W',
  contactsInfo: []
}, {
  initial: 'X',
  contactsInfo: []
}, {
  initial: 'Y',
  contactsInfo: []
}, {
  initial: 'Z',
  contactsInfo: []
}];

export const BOARDROOMS = [{
  initial: '北京',
  boardroomInfo: [{
    id: '001',
    name: '天安门',
    check: false
  }, {
    id: '002',
    name: '地安门',
    check: false
  }, {
    id: '003',
    name: '八达岭长城',
    check: false
  }, {
    id: '004',
    name: '故宫',
    check: false
  }, {
    id: '005',
    name: '颐和园',
    check: false
  }]
}, {
  initial: '上海',
  boardroomInfo: [{
    id: '001',
    name: '东方明珠电视塔',
    check: false
  }]
}, {
  initial: '深圳',
  boardroomInfo: [{
    id: '001',
    name: '桃花源',
    check: false
  }, {
    id: '002',
    name: '欢乐谷',
    check: false
  }, {
    id: '003',
    name: '天一阁',
    check: false
  }, {
    id: '004',
    name: '雅岚阁',
    check: false
  }, {
    id: '005',
    name: '水云间',
    check: false
  }]
}, {
  initial: '广州',
  boardroomInfo: [{
    id: '001',
    name: '小蛮腰',
    check: false
  }]
}];
export const R_DATALIST = {
  fullSatisfied: [{
    startTime: "2018-06-05 14:00",
    endTime: "2018-06-05 15:00",
    meetingRooms: [{
      roomId: "oct001",
      roomName: "深圳--桃花源（含视频会议）",
      maxAttendees: 10,
      hasPhone: 1,
      hasVideo: 1,
      currentAvailable: 1
    },
    {
      roomId: "oct001",
      roomName: "北京--天安门（含视频会议）",
      maxAttendees: 10,
      hasPhone: 1,
      hasVideo: 1,
      currentAvailable: 0
    }],
  }, {
    startTime: "2018-06-08 14:00",
    endTime: "2018-06-08 15:00",
    meetingRooms: [{
      roomId: "oct001",
      roomName: "深圳--桃花源",
      maxAttendees: 20,
      hasPhone: 0,
      hasVideo: 1,
      currentAvailable: 1
    },
    {
      roomId: "oct001",
      roomName: "上海--东方明珠电视塔",
      maxAttendees: 15,
      hasPhone: 0,
      hasVideo: 1,
      currentAvailable: 0
    }],
  }],
  lackDevice: [{
    startTime: "2018-06-05 14:00",
    endTime: "2018-06-05 15:00",
    meetingRooms: [{
      roomId: "oct001",
      roomName: "深圳--欢乐谷（含视频会议）",
      maxAttendees: 10,
      hasPhone: 1,
      hasVideo: 0,
      currentAvailable: 1
    },
    {
      roomId: "oct001",
      roomName: "北京--八达岭长城（含视频会议）",
      maxAttendees: 15,
      hasPhone: 0,
      hasVideo: 0,
      currentAvailable: 0
    }],
  }],
  lackPeople: [{
    startTime: "2018-06-05 14:00",
    endTime: "2018-06-05 15:00",
    meetingRooms: [{
      roomId: "oct001",
      roomName: "深圳--天一阁（含视频会议）",
      maxAttendees: 5,
      hasPhone: 1,
      hasVideo: 0,
      currentAvailable: 1
    },
    {
      roomId: "oct001",
      roomName: "北京--八达岭长城（含视频会议）",
      maxAttendees: 15,
      hasPhone: 0,
      hasVideo: 0,
      currentAvailable: 0
    }],
  }]
};