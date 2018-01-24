<template>
	<div>	{{ createMessage }}	</div>
</template>

<script>
  import {mapGetters} from 'vuex';
	import {mapMutations} from 'vuex';

	export default {
		props: ['msg', 'botState'],
		data(){
			return {
				msg: '',
				request: [
				{
					input: ['привет', 'здравствуйте', 'добр'],
					output: ['Привет!', 'Здравствуйте!', ' ']
				},
				{
					input: ['не приходят данные', 'не приходят таблицы'],
					output: [
					"Убедитесь в правильности введённых данных",
					"На сервере ведутся работы, подождите некоторое время"
					]
				},
				{
					input: ['пока', 'до свидания'],
					output: ['Пока!', 'До свидания!']
				},
				]
			} 
		},
		//хук для расчёта текущего времени суток
		created() {
			let date = new Date();
			let hours = date.getHours();

			if (hours >= 5 && hours < 12)
				this.request[0].output[2] = 'Доброе утро!';
			else if (hours >= 12 && hours < 16)
				this.request[0].output[2] = 'Добрый день!';
			else if (hours >= 16 && hours < 22)
				this.request[0].output[2] = 'Добрый вечер!';
			else if ((hours >= 22 && hours < 24) || (hours >= 0 && hours < 5))
				this.request[0].output[2] = 'Доброй ночи!';
		},
		computed: {
			...mapGetters([
				'messages'
				]),
			createMessage() {
			//Генерация ответа бота
			if (this.botState) {
				let userMsg = this.msg.toLowerCase();
				let botMsg = "Я вас не понимаю";
				for (let i = 0; i < this.request.length; i++) {
					for (let j = 0; j < this.request[i].input.length; j++) {

						if (~userMsg.indexOf(this.request[0].input[j]) 
							&& ~userMsg.indexOf(this.request[1].input[j])) {

							botMsg = this.request[0].output[j] + ' ' + this.request[1].output[j];
						  this.$store.dispatch('addBotMsg', botMsg);
						  this.$emit('stopbot', false);
						  return;

					  } else if(~userMsg.indexOf(this.request[i].input[j])) {

						  botMsg = this.request[i].output[j];
						  this.$store.dispatch('addBotMsg', botMsg);
						  this.$emit('stopbot', false);
						  return;
					  }
				  }
			  }
			
			    this.$store.dispatch('addBotMsg', botMsg);
			    this.$emit('stopbot', false);
			    return;
			  }					
		  },
	  }
  }

</script>