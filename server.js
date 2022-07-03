const express = require('express');
const cors = require('cors');
// const fs = require('fs');
const dictionary = require('./assets/dictionary.js');
const targetWords = require('./assets/targetWords.js');
const getDaily = require('./utils.js');

require('dotenv').config();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	res.status(200).send('Wordle Api from @DerPenz');
});

app.get('/word/daily', (req, res) => {
	res.status(200).send({
		word: targetWords[getDaily(targetWords.length)],
		date: Date.now(),
	});
});

app.get('/word/valid', (req, res) => {
	const word = req.query.word;
	if (!word) {
		res.status(400).send({ valid: false, error: 'no word given', word });
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
		res.status(200).send({ valid: true, word });
	} else {
		res.status(200).send({ valid: false, word });
	}
});

app.listen(process.env.PORT, () =>
	console.log('listening on Port', process.env.PORT)
);
