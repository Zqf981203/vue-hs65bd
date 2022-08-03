<template>
  <div class="hello">
    <h3>time:</h3>
    <p>{{ time }}</p>
    <p>{{ computeTime }}</p>
    <p>{{ methodTime() }}</p>
    <p>
      <input v-model="t" /><span>{{ m() }}</span>
    </p>
    <p>
      <div>cd: {{ cd }},{{ cd }},{{ cd }}</div>
      <div>md: {{ md() }},{{ md() }},{{ md() }}</div>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: new Date().format('MM-dd hh:mm:ss'),
      t: 1,
    };
  },
  computed: {
    computeTime() {
      return `${this.time} compute`;
    },
    cd(){      
      return Date.now()
    }
  },
  methods: {
    methodTime() {
      return `${this.time} method`;
    },
    m() {
      return this.t;
    },
    md(){
      return timestampToTime(Date.now())
      // console.log(1)
    }
  },
  mounted: function () {
    // setInterval(() => {
    //   this.time = new Date().format('MM-dd hh:mm:ss');
    // }, 1000);
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
function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
  var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
  var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
  var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
  var s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
  return Y+M+D+h+m+s;
}
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
