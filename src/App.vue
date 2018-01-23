<template>
	<section>
		<div class="container">
			<div class="row">
				<div class="col-sm-12 col-md-6 col-lg-4">
				<div class="alert alert-success" role="alert">
					<h4 class="alert-heading">Техническая поддержка</h4>
					<button class="btn btn-primary" @click="showChat">{{btnText }}</button>
					<app-content v-show="chatActive"></app-content>
				</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import AppContent from './components/Content';

	import {mapGetters} from 'vuex';
	import {mapMutations} from 'vuex';

	export default {
		data() {
			return {
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
			showChat() {
				this.chatActive = !this.chatActive;
				this.chatActive ? this.btnText = 'Скрыть чат' :  this.btnText = 'Показать';
			}
		},
		components: {
			AppContent
		}
	}
</script>

<style scoped>
	.container {
		margin: 30px auto;
	}
</style>