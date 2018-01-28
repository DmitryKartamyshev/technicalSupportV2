//Тестирование функции обработки введённых данных

exports.createMessage = function(msg) {
	//Генерация ответа бота
	let	request =  {
		input: ['привет', 'здравствуйте', 'добр', 'не приходят данные', 'не приходят таблицы',
		'пока', 'до свидания'],
		output: ['Привет!', 'Здравствуйте!', 'Добрый день',
		"Убедитесь в правильности введённых данных",
		"На сервере ведутся работы, подождите некоторое время", 'Пока!', 'До свидания!']
	};

	let messages = [];
	let userMsg = msg.toLowerCase();
	let count = 0;
	for(let i = 0; i < request.input.length; i++) {
		let idx = userMsg.indexOf(request.input[i]);
		while (idx != -1) {
			messages.push(request.output[i]);
			idx = userMsg.indexOf(request.input[i], idx + 1);
			count++
		}
	}
	if (count == 0) messages.push("Я вас не понимаю");
	
	return messages;
}