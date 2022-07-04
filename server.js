const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dictionary = require('./assets/dictionary.js');
const targetWords = require('./assets/targetWords.js');
const { getRandom, getDaily } = require('./utils.js');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	res.status(200).send('Wordle Api from @DerPenz');
});

app.get('/word/daily', (req, res) => {
	const timestamp = req.query.date;
	let date;

	if (timestamp) {
		date = new Date(parseInt(timestamp));
		if (date == 'Invalid Date') {
			res.status(400).send({
				word: '',
				date: timestamp,
				error: 'No valid date provided',
			});
			return;
		}
	} else {
		date = new Date();
	}
	const word = targetWords[getDaily(targetWords.length, date.getTime())];

	res.status(200).send({
		word,
		date: date.getTime(),
	});
});

app.get('/word/random', (req, res) => {
	const count = req.query.count || 1;

	const randomWords = [];

	for (let i = 0; i < count; i++) {
		randomWords.push(targetWords[getRandom(targetWords.length)]);
	}

	res.status(200).send({
		randomWords,
		count,
	});
});

app.get('/word/costum/get', (req, res) => {
	const id = req.query.id;

	if (!id) {
		res.status(400).send({
			error: 'no id provided',
		});
		return;
	}

	const index = parseInt(id);

	if (isNaN(index)) {
		res.status(400).send({
			error: 'id is not a valid number',
			id,
		});
		return;
	}

	const word = dictionary[index % dictionary.length];
	res.status(200).send({
		word,
		id,
	});
});

app.get('/word/valid', (req, res) => {
	const word = req.query.word;
	if (!word) {
		res.status(400).send({ valid: false, error: 'no word provided' });
		return;
	}

	if (word.length !== 5) {
		res.status(400).send({
			valid: false,
			error: 'word is not in the correct length',
			word,
		});
		return;
	}

	if (dictionary.includes(word.toLowerCase())) {
		res.status(200).send({
			valid: true,
			word,
			potentialTargetWord: targetWords.includes(word.toLowerCase()),
		});
	} else {
		res.status(200).send({
			valid: false,
			word,
			potentialTargetWord: false,
		});
	}
});

app.get('/word/costum/create', (req, res) => {
	const requestedWord = req.query.word;

	if (!requestedWord) {
		res.status(400).send({ error: 'no word provided' });
		return;
	}

	if (requestedWord.length !== 5) {
		res.status(400).send({
			error: 'requested word is not in the correct length',
			word: requestedWord,
		});
		return;
	}

	const id = dictionary.indexOf(requestedWord.toLowerCase());

	if (id === -1) {
		res.status(400).send({
			error: 'requested word is not a valid Wordle word ',
			word: requestedWord,
		});
		return;
	}

	res.status(200).send({
		id,
		word: requestedWord,
		potentialTargetWord: targetWords.includes(requestedWord.toLowerCase()),
	});
});

app.get('/word/all', (req, res) => {
	res.status(200).send({
		dictionary: {
			count: dictionary.length,
			words: dictionary,
		},
		targetWords: {
			count: targetWords.length,
			words: targetWords,
		},
	});
});

//start the server on the port defined in the .env
app.listen(process.env.PORT, () =>
	console.log('listening on Port', process.env.PORT)
);
