export default [
  {
    title: '首页',
    key: 'Home',
    icon: 'iconfont-home-fill',
  },
  {
    title: '学年管理',
    key: 'AdminYear',
    icon: 'iconfont-date',
  },
  {
    title: '组织管理',
    key: 'AdminOrganize',
    icon: 'iconfont-community-fill',
  },
  {
    title: '人员管理',
    key: 'TabUser',
    icon: 'iconfont-users',
    children: [
      {
        title: '管理员',
        key: 'AdminManager',
      },
      {
        title: '教师',
        key: 'AdminTeacher',
      },
      {
        title: '修改密码',
        key: 'AdminPassword',
      }
    ]
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
        title: '课堂任务',
        key: 'TabClassWork',
        children: [
          {
            title: '任务列表',
            key: 'ClassWorkList',
          },
          {
            title: '查看作品',
            key: 'ClassWorkShow',
          },
          {
            title: '任务统计',
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
    title: '艺术特长',
    key: 'TabArtistic',
    icon: 'iconfont-school',
    children: [
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
  }
];