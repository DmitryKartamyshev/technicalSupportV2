/*Спецификация базового функционала обработки сообщений,
введённых пользователем*/

var assert = require('assert');
var expect = require("chai").expect;
var creationBotMsg = require("../src/mocha_test");

describe("Обработка пользовательского текста", function() {

	describe("Обработка и вывод одного сообщения", function() {
		it("генерация ответа бота", function() {

			let	request =  {
				input: ['привет', 'здравствуйте', 'добр', 'не приходят данные', 'не приходят таблицы',
					     'пока', 'до свидания', 'плохой робот'],
				output: [ ['Привет!'], ['Здравствуйте!'], ['Добрый день'],
					      ["Убедитесь в правильности введённых данных"],
					      ["На сервере ведутся работы, подождите некоторое время"], 
					      ['Пока!'], ['До свидания!'], ['Я вас не понимаю'] ] 
				};

				for (let i = 0; i < request.input.length; i++ ) {
					for (let j = 0; j < request.output.length; j++ ) {
						assert.deepEqual(request.output[i], creationBotMsg.createMessage(request.input[i]));
					}
				}
   });
	});

	describe("Обработка и вывод нескольких сообщений", function() {
		it("генерация ответа бота", function() {

			let	request =  {
					userGreetings: ['привет', 'здравствуйте', 'добр'],
					userProblems: ['не приходят данные', 'не приходят таблицы'],
					botGreetings: [ 'Привет!', 'Здравствуйте!', 'Добрый день' ],
					botAnswers: ["Убедитесь в правильности введённых данных",
					"На сервере ведутся работы, подождите некоторое время"]
			};

			let inputMsg = [];
			let outputMsg = [];

			for (let i = 0; i < request.userGreetings.length; i++ ) {
				for (let j = 0; j < request.userProblems.length; j++ ) {
					inputMsg.push(request.userGreetings[i] + ' ' + request.userProblems[j]);
				}
			}

			for (let i = 0; i < request.botGreetings.length; i++) {
				for (let j = 0; j < request.botAnswers.length; j++ ) {
					outputMsg.push([request.botGreetings[i], request.botAnswers[j]]);
				}
			}

			for (let i = 0; i < inputMsg.length; i++) {
				for (let i = 0; i < outputMsg.length; i++ ) {
					 assert.deepEqual(outputMsg[i], creationBotMsg.createMessage(inputMsg[i]));
			  }
			}		
		});
	});
});