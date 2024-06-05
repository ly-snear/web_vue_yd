export default [
  {
    path: '/student',
    name: 'Student',
    component: (resolve) => require(['components/work/student'], resolve)
  },
  {
    path: '/artroom/set',
    name: 'ArtRoomSet',
    component: (resolve) => require(['components/work/artroom/set'], resolve)
  },
  {
    path: '/artroom/list',
    name: 'ArtRoomList',
    component: (resolve) => require(['components/work/artroom/list'], resolve)
  },
  {
    path: '/picture',
    name: 'Picture',
    component: (resolve) => require(['components/work/picture'], resolve)
  },
  {
    path: '/attendance/set',
    name: 'AttendanceSet',
    component: (resolve) => require(['components/work/attendance/set'], resolve)
  },
  {
    path: '/attendance/list',
    name: 'AttendanceList',
    component: (resolve) => require(['components/work/attendance/list'], resolve)
  },
  {
    path: '/attendance/stat',
    name: 'AttendanceStat',
    component: (resolve) => require(['components/work/attendance/stat'], resolve)
  },
  {
    path: '/participate/set',
    name: 'ParticipateSet',
    component: (resolve) => require(['components/work/participate/set'], resolve)
  },
  {
    path: '/participate/list',
    name: 'ParticipateList',
    component: (resolve) => require(['components/work/participate/list'], resolve)
  },
  {
    path: '/participate/show',
    name: 'ParticipateShow',
    component: (resolve) => require(['components/work/participate/show'], resolve)
  },
  {
    path: '/participate/stat',
    name: 'ParticipateStat',
    component: (resolve) => require(['components/work/participate/stat'], resolve)
  },
  {
    path: '/classwork/set',
    name: 'ClassWorkSet',
    component: (resolve) => require(['components/work/classwork/set'], resolve)
  },
  {
    path: '/classwork/list',
    name: 'ClassWorkList',
    component: (resolve) => require(['components/work/classwork/list'], resolve)
  },
  {
    path: '/classwork/show',
    name: 'ClassWorkShow',
    component: (resolve) => require(['components/work/classwork/show'], resolve)
  },
  {
    path: '/classwork/stat',
    name: 'ClassWorkStat',
    component: (resolve) => require(['components/work/classwork/stat'], resolve)
  },
  {
    path: '/activity/set',
    name: 'ActivitySet',
    component: (resolve) => require(['components/work/activity/set'], resolve)
  },
  {
    path: '/activity/list',
    name: 'ActivityList',
    component: (resolve) => require(['components/work/activity/list'], resolve)
  },
  {
    path: '/activity/stat',
    name: 'ActivityStat',
    component: (resolve) => require(['components/work/activity/stat'], resolve)
  },
  {
    path: '/knowledge/question',
    name: 'QuestionList',
    component: (resolve) => require(['components/work/knowledge/question'], resolve)
  },
  {
    path: '/knowledge/set',
    name: 'PaperSet',
    component: (resolve) => require(['components/work/knowledge/set'], resolve)
  },
  {
    path: '/knowledge/list',
    name: 'PaperList',
    component: (resolve) => require(['components/work/knowledge/list'], resolve)
  },
  {
    path: '/knowledge/score',
    name: 'ScoreList',
    component: (resolve) => require(['components/work/knowledge/score'], resolve)
  },
  {
    path: '/artistic/set',
    name: 'ArtisticSet',
    component: (resolve) => require(['components/work/artistic/set'], resolve)
  },
  {
    path: '/artistic/list',
    name: 'ArtisticList',
    component: (resolve) => require(['components/work/artistic/list'], resolve)
  },
  {
    path: '/artistic/stat',
    name: 'ArtisticStat',
    component: (resolve) => require(['components/work/artistic/stat'], resolve)
  },
  {
    path: '/evaluate/set',
    name: 'EvaluateSet',
    component: (resolve) => require(['components/work/evaluate/set'], resolve)
  },
  {
    path: '/evaluate/list',
    name: 'EvaluateList',
    component: (resolve) => require(['components/work/evaluate/list'], resolve)
  },
  {
    path: '/report/list',
    name: 'ReportList',
    component: (resolve) => require(['components/work/report/list'], resolve)
  },
  {
    path: '/report/stat',
    name: 'ReportStat',
    component: (resolve) => require(['components/work/report/stat'], resolve)
  }
];
