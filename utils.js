/**
 * Create a index depending on the current day 
 * @param {*} range from 0 (included) to the given range (excluded). Default 1
 * @param {*} date to calculate the result
 * @returns {int} a number in the given range depending on the date
 */
function getDaily(range = 1, date = Date.now()) {
	let days = Math.floor(date / 1000 / 60 / 60 / 24);
	return (days * days) % range;
}

/**
 * Creates a random number from 0 to a given range
 * @param {int} range from 0 (included) to the given range (excluded). Default 1
 * @returns {int} a random number in the given range
 */
function getRandom(range = 1) {
	return Math.floor(Math.random() * range);
}

module.exports = { getDaily, getRandom };
