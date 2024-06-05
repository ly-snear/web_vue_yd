<style lang="less">
  .container {
    background: url(../../images/login/background.png);
    background-size: cover;
    .content {
      background: url(../../images/login/content.png);
      background-size: cover;
      box-shadow: 0px 3px 7px 0px rgba(58, 9, 123, 0.35);
      position: absolute;
      width: 80%;
      height: 80%;
      top: 10%;
      left: 10%;
      .block {
        width: 240px;
        height: 70%;
        margin-top: 10%;
        margin-left: 14%;
        .title {
          color: #333333;
          font-size: 26px;
          text-align: center;
          font-weight: 500;
          line-height: 32px;
          width: 100%;
          letter-spacing: 3px;
          margin-bottom: 10px;
        }
        .text-small {
          font-size: 12px;
          font-weight: normal;
          color: @primary-color;
          margin-left: 6px;
        }
        .text-center {
          font-size: 14px;
          font-weight: 400;
          color: @primary-color;
          line-height: 40px;
          margin-bottom: 10px;
          width: 100%;
          text-align: center;
          text-decoration: underline;
          cursor: pointer;
        }
        .text-info {
          font: #333333;
          font-size: 12px;
          font-weight: normal;
          text-align: right;
          margin-top: 16px;
          span {
            color: @primary-color;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="full-screen container">
    <div class="content">
      <div class="block">
        <div class="title">艺术素质测评系统</div>
        <div class="text-small">欢迎您！</div>
        <!-- <keep-alive> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  }
};
</script>
