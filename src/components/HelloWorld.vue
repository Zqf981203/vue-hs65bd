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
      <div>md: {{ md() }},{{ md() }},<span v-once>{{ md() }}</span></div>
    </p>
    <hr/>
    <p>
      <input type="radio" v-model="picked" value="1" id="man"/><label for="man">男</label>
      <input type="radio" v-model="picked" value="2" id="woman"/><label for="woman">女</label>
      <span>&nbsp;{{ picked }}</span>
    </p>
    <p>
      <input type="checkbox" v-model="checked" value="1" id="baseball"/><label for="baseball">棒球</label>
      <input type="checkbox" v-model="checked" value="2" id="basketball"/><label for="basketball">篮球</label>
      <input type="checkbox" v-model="checked" value="3" id="football"/><label for="football">足球</label>
      <input type="checkbox" v-model="checked" value="4" id="tennis"/><label for="tennis">网球</label>
      <span>&nbsp;{{ checked.join(',') }}</span>
    </p>
    <p>
      <select v-model="selected">
        <option>js</option>
        <option>html</option>
        <option>css</option>
        <option value="2">java</option>
        <option v-for="opt of options" :value="opt.value">{{ opt.text }}</option>
      </select>
      {{selected}}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: new Date().format('MM-dd hh:mm:ss'),
      t: 1,
      picked: 2,
      checked: [2,3],
      selected: "js",
      options:[
        { text: "vue", value:"vue" }, { text:"react", value: 3}
      ]
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
    }
  },
  mounted: function () {
    // setInterval(() => {
    //   this.t = parseInt(this.t) + 1
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
