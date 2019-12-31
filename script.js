const display = document.querySelector('.password-display');
const rangeEl = document.querySelector('#charRange');
const lengthEl = document.querySelector('#length');
const lowerCase = document.querySelector('#includeLowercase');
const upperCase = document.querySelector('#includeUppercase');
const symbolCase = document.querySelector('#includeSymbols');
const numberCase = document.querySelector('#includeNumbers');
const generatePass = document.querySelector('#generate-password');

const LOWER_CASE = fromLowToHigh(97, 122);
const EMPTY_CASE = fromLowToHigh(0, 0);

const UPPER_CASE = fromLowToHigh(65, 90);
const NUMBER_CASE = fromLowToHigh(48, 57);
const SYMBOL_CASE = fromLowToHigh(33, 47)
	.concat(fromLowToHigh(58, 64))
	.concat(fromLowToHigh(91, 96))
	.concat(fromLowToHigh(123, 126));

lengthEl.addEventListener('input', syncRangeNumber);
rangeEl.addEventListener('input', syncRangeNumber);

function syncRangeNumber(e) {
	const value = e.target.value;
	lengthEl.value = value;
	rangeEl.value = value;
}

generatePass.addEventListener('click', e => {
	e.preventDefault();
	const len = parseInt(lengthEl.value);
	const hasLower = lowerCase.checked;
	const hasUpper = upperCase.checked;
	const hasNumber = numberCase.checked;
	const hassymbol = symbolCase.checked;
	display.innerText = generatePassword(
		hasLower,
		hasUpper,
		hasNumber,
		hassymbol,
		len
	);
	if (display.innerText === 'undefined') {
		display.innerText = 'Password';
	}
});

function generatePassword(lower, upper, number, symbol, characterLength) {
	let charCodes = EMPTY_CASE;
	const typesCount = lower + upper + number + symbol;

	if (typesCount < 1) return alert('Select at least one option');
	if (characterLength < 4)
		return alert('Your password must have at least 5 characters');

	if (lower) charCodes = charCodes.concat(LOWER_CASE);

	if (upper) charCodes = charCodes.concat(UPPER_CASE);

	if (number) charCodes = charCodes.concat(NUMBER_CASE);

	if (symbol) charCodes = charCodes.concat(SYMBOL_CASE);

	const passCharacter = [];
	for (let i = 0; i < characterLength; i++) {
		const character =
			charCodes[Math.floor(Math.random() * charCodes.length)];
		console.log(character);
		passCharacter.push(String.fromCharCode(character));
	}
	return passCharacter.join('');
}

function fromLowToHigh(low, high) {
	let arr = [];
	for (let i = low; i <= high; i++) {
		arr.push(i);
	}
	return arr;
}
