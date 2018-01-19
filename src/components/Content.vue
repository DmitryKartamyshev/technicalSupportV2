<template>
  <div>
    <div class="content alert alert-primary">
      <div :class="(index%2 == 0) ? 'alert alert-info' : 'alert alert-warning'" 
      v-for="(item, index) in messages">
      <div v-html="item"></div>
    </div>
  </div>
  <div class="form-group">
   <label>Введите сообщение</label>
 </div>
 <app-editable ref="inputText" :content="msg" @update="receiveMsg"></app-editable>
 <button class="btn btn-warning" @click="sendMsg">Отправить</button>
</div>  
</template>

<script>

  import {mapGetters} from 'vuex';
  import AppEditable from './Editable';

  export default {
   data(){
     return {
      msg: '',
    } 
  },
  computed: {
   ...mapGetters([
    'messages'
    ])
 },
 methods: {
   receiveMsg(e) {
    this.msg = e;
  },
  sendMsg() { 
    console.log(this.msg);      
    let pattern = /^[\s]+$/;
    if (!pattern.test(this.msg)) {
      this.messages.push(this.msg);
      this.$store.dispatch('sendBotMsg');  
    } 
  },
},
  components: {
    AppEditable
  }
}

</script>

<style scoped>

  .btn-warning {
    margin-top: 8px;
  }
  .content {
    overflow: auto;
    height: 300px;
    background-color: #fff;
  }

</style>
