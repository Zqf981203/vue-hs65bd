<template>
  <div class="hello">
    <ul v-for="order in orderData.map(order=> {
        return {...order, default: order.bind}
      } )">
      <li>
        {{order}}
        <input type="text" v-model='order.bind' @blur='t(order)'>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      orderData: []
    }
  },
  computed: {
    initedOrderData() {
      return this.orderData.map(order=> {
        return {...order, default: order.bind}
      } ) || []
    }
  },
  methods:{
    t(a) {
      console.log(a,this.orderData)
    }
  },
  created() {
    this.orderData = [
      {
        default: '',
        bind: '123'
      },
      
      {
        default: '',
        bind: '123'
      },
      
      {
        default: '',
        bind: '123'
      }
    ]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
