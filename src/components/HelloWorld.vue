<template>
  <div class="hello">
    <h3>time:</h3>
    <p>{{ time }}</p>
    <p>{{ computeTime }}</p>
    <p>{{ methodTime() }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: new Date().format('MM-dd hh:mm:ss'),
    };
  },
  computed: {
    computeTime() {
      return `${this.time} computed`;
    },
  },
  methods: {
    methodTime() {
      return `${this.time} method`;
    },
  },
  mounted: function () {
    setInterval(() => {
      this.time = new Date().format('MM-dd hh:mm:ss');
    }, 1000);
  },
};

Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  text-align: left;
}
</style>
