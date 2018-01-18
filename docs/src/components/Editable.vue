<template>
	<div>
		<div id="div" class="alert alert-info" ref="somediv" contenteditable="true" @input="update"></div>
		<button class="btn btn-success" @click="showSmile">Смайлы</button>
		<span class="smiles" v-if="activeSmile" v-for="(smile, index) in smilesGif">
			<img :src="smile" @click="addSmile(index)">
		</span>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		data(){
			return {
				activeSmile: false,
				activated: false,
				smilesGif: [
				"http://i.smiles2k.net/cristmas_smiles/1126969124.gif",
				"http://i.smiles2k.net/angry_smiles/angry2.gif",
				"http://i.smiles2k.net/hello_byby_smiles/1_012.gif",
				"http://i.smiles2k.net/jumping_smiles/boldred.gif"
				]
			}			
		},
		computed: {
			...mapGetters([
				'messages'
				]),
		},
		methods:{
			showSmile() {
				this.activeSmile = !this.activeSmile;
			},

			update(event){
				this.activated ? this.$emit('update', event.innerHTML) :
				this.$emit('update', event.target.innerHTML);
			},
			addSmile(index) {

				this.$refs.somediv.focus();

				let html = '<img src="' + this.smilesGif[index] + '" >';
				let sel, range;

				if (window.getSelection) {

					sel = window.getSelection();
					if (sel.getRangeAt && sel.rangeCount) {
						range = sel.getRangeAt(0);
						range.deleteContents();

						var el = document.createElement("div");
						el.innerHTML = html;
						var frag = document.createDocumentFragment(), node, lastNode;
						while ( (node = el.firstChild) ) {
							lastNode = frag.appendChild(node);
						}
						range.insertNode(frag);
						this.activated = true;
						this.activeSmile = false;
						var startRangeNode = range.commonAncestorContainer;
						this.update(startRangeNode);
						this.activated = false;
						if (lastNode) {
							range = range.cloneRange();
							range.setStartAfter(lastNode);
							range.collapse(true);
							sel.removeAllRanges();
							sel.addRange(range);
						}
					}
				}
			},
		}
	}
</script>
<style scoped>
	
</style>