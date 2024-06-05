<style lang="less" scoped>
.modal-dialog {
  padding: 60px 40px 0 40px;
}
.block {
  padding-right: 20px;
  border-right: 1px solid #d5d5d5;

  .icon {
    margin-left: calc(50% - 50px);
    margin-top: 40px;
  }
  .btn {
    margin-left: calc(50% - 60px);
    margin-top: 40px;
  }

  .qiniu {
    margin-left: calc(50% - 38px);
    margin-top: 40px;
  }
}
.content {
  padding: 20px 50px;
}
</style>
<template>
<div>
  <div class="frame-page">
    <div class="h-panel page-header">
      <div class="h-panel-body">
        <Row type="flex" :space="20">
          <Cell :width="2" v-for="(it, idx) in type" :key="idx">
            <Button :class="it.color" @click="select(it)">{{it.name}}</Button>
          </Cell>
          <Cell :flex="1">
            <Button color="primary" @click="opened = true">新建类型</Button>
          </Cell>
        </Row>
      </div>
    </div>
    <div class="h-panel page-header">
      <div class="h-panel-body">
        <Row type="flex" :space="20">
          <Cell :width="4" class="block">
            <Qiniu class="qiniu" :options="upload.options" type="image" data-type="url" v-model="item.url" @input="inputIcon"></Qiniu>
            <Button class="btn" circle size="l" color="primary" @click="remove">删除类型</Button>
          </Cell>
          <Cell :width="18" class="content">
            <Qiniu className="preview" :options="upload.options" type="images" data-type="url" v-model="array" @input="inputImage"></Qiniu>
          </Cell>
        </Row>
      </div>
    </div>
  </div>
  <Modal v-model="opened">
    <div class="modal-dialog">
      <input type="text" v-model="name" placeholder="请输入类型名"/>
      <div>
        <Button circle size="l" class="modal-btn" @click="opened = false">取消</Button>
        <Button color="primary" circle size="l" class="modal-btn" @click="save" :loading="loading">确定</Button>
      </div>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  data() {
    return {
      type: [],
      array: [],
      name: null,
      opened: false,
      loading: false,
      upload: {
        options: {
          max_file_size: '1mb'
        },
      },
      item: {},
      cache: [],
    };
  },
  created() {
    Ajax.get('/type/list', {
    }).then(resp => {
      if (resp.ok) {
        this.type = resp.body;
        if (this.type.length > 0) {
          this.select(this.type[0]);
        }
      }
    });
  },
  methods: {
    inputIcon(url) {
      Ajax.post('/type/update', {
        id: this.item.id,
        url: url
      }).then(resp => {
        if (resp.ok) {
          HeyUI.$Message.success('上传成功');
        }
      });
    },
    inputImage(array) {
      if (array.length > this.cache.length) {
        let i = this.cache.length;
        Ajax.post('/image/create', {
          url: array[i],
          idType: this.item.id
        }).then(resp => {
          if (resp.ok) {
            HeyUI.$Message.success('上传成功');
            this.cache.push(resp.body);
          }
        });
      } else
      if (array.length < this.cache.length) {
        let i = 0;
        for (; i < array.length; i++) {
          if (array[i] != this.cache[i].url) {
            break;
          }
        }

        Ajax.post('/image/delete', {
          id: this.cache[i].id,
        }).then(resp => {
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
            this.cache.splice(i, 1);
          }
        });
      }
    },
    save() {
      Ajax.post('/type/create', {
        name: this.name
      }).then(resp => {
        this.opened = false;
        if (resp.ok) {
          HeyUI.$Message.success('创建成功');
          this.type.push(resp.body);
          this.select(resp.body);
        }
      });
    },
    select(it) {
      this.item = it;
      this.type.forEach(e => {
        e.color = {
          "h-btn-text-green": e.id == it.id,
          "h-btn-text-gray": e.id != it.id,
        };
      });

      Ajax.get('/image/list', {
        idType: it.id,
      }).then(resp => {
        if (resp.ok) {
          this.cache = resp.body;
          this.array = [];
          resp.body.forEach(e => {
            this.array.push(e.url);
          });
        }
      });
    },
    remove() {
      Utils.confirm(this, '确定删除该类型 ？', modal => {
        this.loading = true;
        modal.close();

        Ajax.post('/type/delete', {
          id: this.item.id
        }).then(resp => {
          this.loading = false;
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
          }
        });
      });
    },
  }
};
</script>
