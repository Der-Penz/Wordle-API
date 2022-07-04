function getDaily(length, date = Date.now()) {
	let days = Math.floor(date / 1000 / 60 / 60 / 24);
	return (days * days) % length;
}

function getRandom(range = 1) {
	return Math.floor(Math.random() * range);
}

module.exports = { getDaily, getRandom };
