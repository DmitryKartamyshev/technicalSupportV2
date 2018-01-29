<template>
	<div class="container">
		<div class="bot-header">
			<h4 class="alert-heading">Техническая поддержка</h4>
			<button class="btn btn-state" @click="switchChatState">{{ btnText }}</button>
			<transition enter-active-class="animated fadeInDown"
				leave-active-class="animated fadeOut"
				mode="in-out">
				<div class="chat-window" v-show="chatActive">
					<div class="content">
						<div class="message-box" v-for="message in messages">
							<div :class="[message.style]">
								<div class="msg-title">{{ message.title }}</div>
								<div class="msg-description" v-html="message.message"></div>
							</div>
						</div>					
						<app-bot :msg="msg" :botState="botState" @stopbot="stopBot"></app-bot>
					</div>
					<app-input @update="receiveMsg"></app-input>
					<app-button :msg="msg" @callbot="launchBot"></app-button>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import AppBot from './components/Bot';
	import AppButton from './components/Button';
	import AppInput from './components/Input';

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
			AppButton,
			AppInput,
			AppBot
		}
	}
</script>

<style scoped>
	.container {
		padding: 0;
		margin: 30px auto;
		min-width: 320px;
		width: 30%;
	}
	.bot-header {
		position: relative;
		padding: .75rem 1.25rem;
		margin-bottom: 1rem;
		box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.1);
		border: 1px solid transparent;
		border-radius: .25rem;
	}
	.content {
		overflow: auto;
		height: 300px;
		padding: 20px;
		background-color: #ebeafd;
	}
	.chat-window {
		position: absolute;
		width: 100%;
		padding: 20px;
		left: 0;
		top: 120px;
		background-color: #22193f;
		border-radius: 3px;
		box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.1);
	}
	.message-user {
		float: left;
		width: 190px;
		margin: 10px;
	}
	.message-box {
		overflow: hidden;
		color: #fff;
	}
	.message-bot {
		width: 190px;
		padding: 10px;
		margin: 10px; 
		float: right;
	}
	.msg-title {
		font-size: 14px;
		font-family: "Myriad Pro";
		color: #1d1e2c;
		font-weight: bold;
		line-height: 1.2;
	}
	.message-user .msg-description {
		background-color: #44337b;
		border-radius: 0px 10px 10px 10px;
		padding: 10px;
	}
	.message-bot .msg-description {
		padding: 10px;
		background-color: #fff;
		color: #000;
		border-radius: 10px 0 10px 10px;
	}
	.message-bot .msg-title	{
		text-align: right;
	}
	.btn:focus {
		outline: 0;
		box-shadow: initial;
	}
</style>