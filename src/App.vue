<template>
	<section>
		<div class="container">
			<div class="alert alert-success">
				<h4 class="alert-heading">Техническая поддержка</h4>
				<button class="btn btn-primary" @click="switchChatState">{{ btnText }}</button>
				<div v-show="chatActive">
					<div class="content alert alert-primary">
						<div :class="(index%2 == 0) ? 'alert alert-info' : 'alert alert-warning'" 
						v-for="(item, index) in messages">
						<div v-html="item"></div>
					</div>
				</div>
				<div class="form-group">
					<label>Введите сообщение</label>
				</div>
				<app-editable @update="receiveMsg"></app-editable>
			</div>
		</div>
	</div>
</section>
</template>

<script>
	import AppContent from './components/Content';
	import AppEditable from './components/Editable';

	import {mapGetters} from 'vuex';
	import {mapMutations} from 'vuex';

	export default {
		data() {
			return {
				msg: '',
				botState: false,
				chatActive: false,
				btnText: 'Показать'
			}
		},
		computed: {
			...mapGetters([
				'messages'
				])
		},
		methods: {
			switchChatState() {
				this.chatActive = !this.chatActive;
				this.switchBtnState();
			},
			switchBtnState() {
				this.chatActive ? this.btnText = 'Скрыть чат' :  this.btnText = 'Показать';
			},
			receiveMsg(e) {
				this.msg = e;
			},
			launchBot(state) {
				this.botState = state;
			},
			stopBot(state) {
				this.botState = state;
			}
		},
		components: {
			AppContent,
			AppEditable
		}
	}
</script>

<style scoped>
	.container {
		margin: 30px auto;
		width: 33%;
	}
</style>