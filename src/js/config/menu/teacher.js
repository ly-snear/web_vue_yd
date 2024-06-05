export default [
  {
    title: '首页',
    key: 'Home',
    icon: 'iconfont-home-fill',
  },
  {
    title: '学生管理',
    key: 'Student',
    icon: 'iconfont-users',
  },
  {
    title: '课堂学习',
    key: 'TabClassRoom',
    icon: 'iconfont-books',
    children: [
      {
        title: '考勤',
        key: 'TabAttendance',
        children: [
          {
            title: '设置考勤',
            key: 'AttendanceSet',
          },
          {
            title: '考勤列表',
            key: 'AttendanceList',
          },
          {
            title: '考勤统计',
            key: 'AttendanceStat',
          }
        ]
      },
      {
        title: '参与度',
        key: 'TabParticipate',
        children: [
          {
            title: '参与度评定',
            key: 'ParticipateSet',
          },
          {
            title: '参与度列表',
            key: 'ParticipateList',
          },
          {
            title: '查看学生',
            key: 'ParticipateShow',
          },
          {
            title: '参与度统计',
            key: 'ParticipateStat',
          }
        ]
      },
      {
        title: '问题与练习',
        key: 'TabClassWork',
        children: [
          {
            title: '布置',
            key: 'ClassWorkSet',
          },
          {
            title: '已布置',
            key: 'ClassWorkList',
          },
          {
            title: '批改与欣赏',
            key: 'ClassWorkShow',
          },
          {
            title: '学情报告',
            key: 'ClassWorkStat',
          }
        ]
      }
    ]
  },
  {
    title: '活动学习',
    key: 'TabActivity',
    icon: 'iconfont-flag',
    children: [
      {
        title: '添加活动',
        key: 'ActivitySet',
      },
      {
        title: '活动列表',
        key: 'ActivityList',
      },
      {
        title: '活动统计',
        key: 'ActivityStat',
      }
    ]
  },
  {
    title: '知识技能',
    key: 'TabKnowledge',
    icon: 'iconfont-knowledge',
    children: [
      {
        title: '试题管理',
        key: 'QuestionList',
      },
      {
        title: '添加试卷',
        key: 'PaperSet',
      },
      {
        title: '组卷管理',
        key: 'PaperList',
      },
      {
        title: '成绩管理',
        key: 'ScoreList',
      }
    ]
  },
  {
    title: '艺术特长',
    key: 'TabArtistic',
    icon: 'iconfont-school',
    children: [
      {
        title: '添加特长',
        key: 'ArtisticSet',
      },
      {
        title: '特长列表',
        key: 'ArtisticList',
      },
      {
        title: '特长统计',
        key: 'ArtisticStat',
      }
    ]
  },
  {
    title: '综合评价',
    key: 'TabEvaluate',
    icon: 'iconfont-chart',
    children: [
      {
        title: '添加评价',
        key: 'EvaluateSet',
      },
      {
        title: '评价列表',
        key: 'EvaluateList',
      }
    ]
  },
  {
    title: '统计报告',
    key: 'TabReport',
    icon: 'iconfont-knowledge',
    children: [
      {
        title: '学生报告',
        key: 'ReportList',
      },
      {
        title: '学科报表',
        key: 'ReportStat',
      }
    ]
  },
  /*{
    title: '艺术教室',
    key: 'TabArtRoom',
    icon: 'iconfont-classroom',
    children: [
      {
        title: '设置教室',
        key: 'ArtRoomSet',
      },
      {
        title: '查看教室',
        key: 'ArtRoomList',
      }
    ]
  },*/
  {
    title: '书画资源',
    key: 'Picture',
    icon: 'iconfont-resource',
  },
];