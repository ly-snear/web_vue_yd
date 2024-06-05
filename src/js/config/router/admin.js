export default [
  {
    path: '/admin/profile',
    name: 'Profile',
    component: (resolve) => require(['components/admin/profile'], resolve),
  },
  {
    path: '/admin/year',
    name: 'AdminYear',
    component: (resolve) => require(['components/admin/year'], resolve),
  },
  {
    path: '/admin/organize',
    name: 'AdminOrganize',
    component: (resolve) => require(['components/admin/organize'], resolve),
  },
  {
    path: '/admin/artroom',
    name: 'AdminArtRoom',
    component: (resolve) => require(['components/admin/artroom'], resolve),
  },
  {
    path: '/admin/manager',
    name: 'AdminManager',
    component: (resolve) => require(['components/admin/manager'], resolve),
  },
  {
    path: '/admin/teacher',
    name: 'AdminTeacher',
    component: (resolve) => require(['components/admin/teacher'], resolve),
  },
  {
    path: '/admin/password',
    name: 'AdminPassword',
    component: (resolve) => require(['components/admin/password'], resolve),
  },
  {
    path: '/setting/basic',
    name: 'SettingBasic',
    component: (resolve) => require(['components/setting/basic'], resolve),
  },
  {
    path: '/setting/study',
    name: 'SettingStudy',
    component: (resolve) => require(['components/setting/study'], resolve),
  },
  {
    path: '/setting/devop',
    name: 'SettingDevop',
    component: (resolve) => require(['components/setting/devop'], resolve),
  },
];
