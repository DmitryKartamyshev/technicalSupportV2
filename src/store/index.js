import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		messages: []
	},
	getters: {
		messages(state) {
			return state.messages;
		}
	},
	mutations: {
    addMsgToChat(state, payLoad) {
			state.messages.push(payLoad);
		}
	},
	actions: {
		addBotMsg(store, payLoad) {
			setTimeout(() => {
				store.commit('addMsgToChat', payLoad);
			}, 1000);     
		},
	},
	plugins: [createPersistedState({ storage: window.sessionStorage })],
	//strict: process.env.NODE_ENV !== 'production'
});