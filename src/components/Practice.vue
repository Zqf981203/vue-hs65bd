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
        <label class="name"> {{ m.name }}: </label>
        <div class="content">
          <span> {{ m.message }} </span>
          <a @click.prevent="reply(m.name)" class="reply">回复</a>
        </div>
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
          message: 'sdfhkasjdhfka',
        },
      ],
      textarea: ''
    };
  },
  methods: {
    sumbit(e) {
      if(!this.name || !this.content) {
        return
      }
      this.list.push({
        name: this.name,
        message: this.content,
      });
      this.content = '';
    },
    reply(name) {
      this.content = '@' + name;
      this.textarea.focus()
    },
  },
  mounted(){
    this.textarea = document.getElementById("content")
  }
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
.messageForm {
  margin-bottom: 25px;
}
.messageForm:after {
  content: '';
  clear: both;
  display: block;
}

ul.messageList {
  list-style: none;
  margin: 0 auto;
}
.message {
  min-height: 40px;
  border-bottom: 1px solid #bbb;
  display: flex;
  margin-bottom: 10px;
}
.name {
  flex-shrink: 0;
  width: 60px;
  text-align: left;
  color: #42b983;
}
.content {
  position: relative;
  padding: 0 45px 15px 0;
  flex-grow: 1;
}
.reply {
  text-decoration: none;
  position: absolute;
  right: 0;
  bottom: 5px;
  font-size: 14px;
  color: blue;
  cursor: pointer;
}
</style>
