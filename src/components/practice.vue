<template>
  <div class="messageList">
    <div class="messageForm">
      <div class="row-group"><label for="name">昵称：</label><input type="text" id="name" v-model="name"></div>
      <div class="row-group"><label for="content">留言内容：</label><textarea id="content" v-model="content" placeholder="请输入留言内容"></textarea>/div>
      <input type="button" @click="sumbit">
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: {
        name: '',
      content:''
      },
      list:[]
    }
  },
  methods:{
    sumbit() {
      this.list.push({
        
      })
    }
  }
}
</script>