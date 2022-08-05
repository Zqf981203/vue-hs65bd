<template>
  <div id="message">
    <form class="messageForm">
      <div class="row-group">
        <label for="name">昵称：</label>
        <div class="input">
          <input type="text" id="name" v-model="name" />
        </div>
      </div>
      <div class="row-group">
        <label for="content">留言内容：</label>
        <div class="input">
          <textarea
            id="content"
            placeholder="请输入留言内容"
            v-model="content"
            rows="4"
            cols="21"
          ></textarea>
        </div>
      </div>
      <input class="submit" type="button" @click="sumbit" value="提交" />
    </form>
    <ul class="messageList">
      <li class="message" v-for="(m, i) in list" :key="i">
        <span class="name">{{ m.name }}:</span>
        <span class="content">{{ m.message }}</span>
        <a href="javascript:void(0);" class="reply">回复</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      content: '',
      list: [
        {
          name: '王大锤',
          message: '哈哈~',
        },
        {
          name: '周起飞',
          message: '好啊好好！！',
        },
      ],
    };
  },
  methods: {
    sumbit(e) {
      this.list.push({
        name: this.name,
        message: this.content,
      });
      console.log(this.list);
      this.content = '';
    },
  },
};
</script>
<style scoped>
#message {
  padding: 20px 0px;
  width: 300px;
  margin: 0 auto;
}
.row-group {
  margin-bottom: 15px;
}
.row-group > label {
  width: 90px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.row-group > .input {
  margin-left: 90px;
  vertical-align: middle;
  line-height: 40px;
}
.submit {
  margin-right: 17px;
  float: right;
}
.messageList {
  clear: both;
  font-size: 14px;
  margin-top: 60px;
}
.message {
  width: 300px;
  margin: 0 auto 8px;
  min-height: 40px;
  position: relative;
  border-bottom: 1px solid #bbb;
}
.message .name {
  float: left;
  width: 90px;
  padding-right: 15px;
  font-family: cursive;
  text-align: left;
  font-size: 16px;
  color: #42b983;
}
.message .content {
  text-align: left;
  font-size: 16px;
  float: left;
}
.reply {
  text-decoration: none;
  position: absolute;
  right: 15px;
  bottom: 5px;
  color: blue;
}
</style>
