function getDaily(length) {
	let days = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
	return (days * days) % length;
}

module.exports = getDaily;