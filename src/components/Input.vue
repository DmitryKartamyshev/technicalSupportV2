<template>
	<div class="input__block">
		<div id="field" class="input__field" ref="inputfield" contenteditable="true" @input="update"></div>
		<button class="btn btn-success btn-smile" @click="showSmile"></button>
		<div class="smile__block" v-if="activeSmile">
			<span class="smiles" v-for="(smile, index) in smilesGif">
				<img :src="smile" @click="addSmile(index)">
			</span>
		</div>
	</div>
</template>

<script>

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
		methods:{
			showSmile() {
				this.activeSmile = !this.activeSmile;
			},
			update(event){
        //Генерация события для родителя в зависимости от наличия в поле ввода смайлов
				this.activated ? this.$emit('update', event.innerHTML) :
				this.$emit('update', event.target.innerHTML);
			},
      //Добавление смайла в поле ввода
			addSmile(index) {       
				this.$refs.inputfield.focus();

				let html = '<img src="' + this.smilesGif[index] + '" >';
				let sel, range;

				if (window.getSelection) {
          //Получение объекта соответствующего текущему выделению
					sel = window.getSelection();
					if (sel.getRangeAt && sel.rangeCount) {
						range = sel.getRangeAt(0);
						range.deleteContents();
            
            //Создание узла, содержащего смайл и его вставка в поле ввода
						let el = document.createElement("div");
						el.innerHTML = html;
						let frag = document.createDocumentFragment(), node, lastNode;
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
  //Очистка поля ввода после отправки сообщения
	$(function(){
		$('.btn-warning').click(function(){
			$('#field').empty();
		})
	});

</script>
<style scoped>

.btn-smile:before {
	content: "\f118";
	padding: 5px 0;
	font-family: FontAwesome;
	font-size: 20px; 
	color: #fff;
	background-color: transparent;
}
.input__block {
	position: relative;
	margin-top: 20px;
}
.input__field {
	display: inline-block;
	min-height: 50px;
	width: 81%;
	padding: 10px;
	border-radius: 5px;
	background-color: #fff;
	margin-bottom: 10px;
	-webkit-box-shadow: 0px 0px 3px 0px rgba(80,128,61,1);
	-moz-box-shadow: 0px 0px 3px 0px rgba(80,128,61,1);
	box-shadow: 0px 0px 3px 0px rgba(80,128,61,1);
}
.smile__block {
	background-color: #fff;
	border-radius: 5px;
	right: 0;
	top: -65px;
	padding: 15px 20px;
	position: absolute;
	-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
	-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
	box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
}
.btn-smile {
	position: relative;
	margin-left: 5px;
  vertical-align: top;
}

</style>
