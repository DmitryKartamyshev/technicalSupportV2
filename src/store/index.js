import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		messages: [
		  {
				title: '',
				message: '',
				style: {}
		  }
		]
	},
	getters: {
		messages(state) {
			return state.messages;
		}
	},
	mutations: {
    addMsgToChat(state, payLoad) {
			state.messages.push({
				style: {'message-user': true},
				title: 'User',
				message: payLoad
			});
		},
		addBotMsgToChat(state, payLoad) {
			state.messages.push({
				style: {'message-bot': true},
				title: 'Bot',
				message: payLoad
			});
		}
	},
	actions: {
		addBotMsg(store, payLoad) {
			setTimeout(() => {
				store.commit('addBotMsgToChat', payLoad);
			}, 1000);     
		},
	},
	plugins: [createPersistedState({ storage: window.sessionStorage })],
	//strict: process.env.NODE_ENV !== 'production'
});