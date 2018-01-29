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
				request: 
				{
					input: ['привет', 'здравствуйте', 'добр', 'не приходят данные', 
					        'не приходят таблицы', 'пока', 'до свидания'],
					output: ['Привет!', 'Здравствуйте!', '', 
					         'Убедитесь в правильности введённых данных',
					        'На сервере ведутся работы, подождите некоторое время', 
					        'Пока!', 'До свидания!' ]
				}
			} 
		},
		//хук для расчёта текущего времени суток
		created() {
			let date = new Date();
			let hours = date.getHours();

			if (hours >= 5 && hours < 12)
				this.request.output[2] = 'Доброе утро!';
			else if (hours >= 12 && hours < 16)
				this.request.output[2] = 'Добрый день!';
			else if (hours >= 16 && hours < 22)
				this.request.output[2] = 'Добрый вечер!';
			else if ((hours >= 22 && hours < 24) || (hours >= 0 && hours < 5))
				this.request.output[2] = 'Доброй ночи!';
		},
		computed: {
			...mapGetters([
				'messages'
				]),
			createMessage() {
			//Генерация ответа бота
			  if (this.botState) {
				  let userMsg = this.msg.toLowerCase();
				  let count = 0;
				  for(let i = 0; i < this.request.input.length; i++) {
					  let idx = userMsg.indexOf(this.request.input[i]);

						while (idx != -1) {
							this.$store.dispatch('addBotMsg', this.request.output[i]);
							idx = userMsg.indexOf(this.request.input[i], idx + 1);
							count++
						}
				  }

				  if (count == 0) this.$store.dispatch('addBotMsg', 'Я вас не понимаю');
				  this.$emit('stopbot', false);
			  }
		  },
	  }
  }

</script>