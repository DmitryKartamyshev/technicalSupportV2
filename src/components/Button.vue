<template>
	<div>
		<button class="btn btn-warning" @click="sendMsg">Отправить</button>
	</div>  
</template>

<script>

	import {mapGetters} from 'vuex';
	

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
			//Отправка сообщения пользователем
			sendMsg() {     
				let pattern = /^[\s]+$/;
				if (!pattern.test(this.msg)) {
					this.messages.push(this.msg);
					this.$emit('callbot', true); 
				} 
			}
	},
}
	
</script>

<style scoped>

.btn-warning {
	margin-top: 8px;
}

</style>
