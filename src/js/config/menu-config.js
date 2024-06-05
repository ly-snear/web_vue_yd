import menuAdmin from './menu/admin';
import menuRegion from './menu/region';
import menuSchool from './menu/school';
import menuTeacher from './menu/teacher';

const getMenus = function (level) {
  if (level == 100) return menuTeacher;
  if (level == 1000) return menuSchool;
  if (level == 1100 || level == 1200) return menuRegion;

  return menuAdmin;
};

const getKeys = function (level) {
  return parseKey(getMenus(level));
};

let parseKey = (menus) => {
  let configKey = [];
  for (let menu of menus) {
    configKey.push(menu.key);
    if (menu.children && menu.children.length) {
      configKey.push(...parseKey(menu.children));
    }
  }
  return configKey;
};

export { getMenus, getKeys };
