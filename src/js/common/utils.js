import utils from 'hey-utils';

export default utils.extend({}, utils, {
  getName(id) {
    let list = G.get('organizes');
    for (let i = 0; list && i < list.length; i++) {
      if (list[i].id == id) {
        return list[i].name;
      }
    }
    return '';
  },
  getCity() {
    let now = 0;
    let selects = [];
    let list = G.get('organizes');
    list.forEach(e => {
      if (e.level == 1200) {
        selects.push({
          title: e.name,
          key: e.id
        });
      }
    });
    return { selects, now };
  },
  getZone(idCity) {
    let now = 0;
    let selects = [];
    let list = G.get('organizes');
    list.forEach(e => {
      if (e.level == 1100 && e.idCity == idCity) {
        selects.push({
          title: e.name,
          key: e.id
        });
      }
    });
    return { selects, now };
  },
  getSchool(idZone) {
    let now = 0;
    let selects = [];
    let list = G.get('organizes');
    list.forEach(e => {
      if (e.level == 1000 && e.idZone == idZone) {
        selects.push({
          title: e.name,
          key: e.id
        });
      }
    });
    return { selects, now };
  },
  getYear() {
    let now = 0;
    let str = null;
    let selects = [];
    let list = G.get('years');
    list.forEach(e => {
      selects.push({
        title: e.name,
        key: e.id
      });
      if (e.semester > 0) {
        now = e.id;
        str = e.name;
      }
    });
    return { selects, now, str };
  },
  getNameYear(id) {
    let list = G.get('years');
    for (let i = 0; list && i < list.length; i++) {
      if (list[i].id == id) {
        return list[i].name;
      }
    }
    return '';
  },
  getClss(idYear) {
    let now = 0;
    let selects = [];
    let list = G.get('classes');
    list.forEach(e => {
      if (e.idYear == idYear) {
        selects.push({
          title: e.name,
          key: e.id
        });
      }
    });
    return { selects, now };
  },
  getNameClss(id) {
    let list = G.get('classes');
    for (let i = 0; list && i < list.length; i++) {
      if (list[i].id == id) {
        return list[i].name;
      }
    }
    return '';
  },
  getStep() {
    let now = 0;
    let str = null;
    let selects = [
      { title: '上学期', key: 1 },
      { title: '下学期', key: 2 }
    ];
    let list = G.get('years');
    for (let i = 0; list && i < list.length; i++) {
      if (list[i].semester > 0) {
        now = list[i].semester;
        str = selects[now - 1].title;
        break;
      }
    }
    return { selects, now, str };
  },
  getTitle(obj) {
    let val = '';
    obj.selects.forEach(e => {
      if (e.key == obj.now) {
        val = e.title;
      }
    });
    return val;
  },
  getStamp(str) {
    let strs = str.split('-');
    return new Date(strs[0], strs[1] - 1, strs[2]).getTime();
  },
  getNumber(num) {
    return Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
  },
  confirm(that, content, next) {
    let params = {
      title: '提 醒',
      content: content,
      buttons: [
        {
          type: 'cancel',
          name: '取消'
        },
        {
          type: 'confirm',
          name: '确认',
          color: 'primary'
        }
      ],
      className: 'modal-confirm',
      events: {
        confirm: modal => {
          if (next) next(modal);
          else modal.close();
        },
        cancel: modal => {
          modal.close();
        }
      }
    };
    that.$Modal(params);
  }
});
