import test from 'ava';
import hashbow from './';



/**
 * Dummy values for tests
 */

const person = {
  name: 'Randy Smasher',
  job: 'Banana',
  banana: true
};

function personFunction() {
  return person;
}



/**
 * Check all types return valid hexadecimal strings i.e. '#000000'
 */

function isValidHexColor(t) {
  return item => {
    var hash = hashbow(item);
    t.is(typeof hash, 'string');
    t.is(hash.charAt(0), '#');
    t.is(hash.length, 7);
  };
}

test('Booleans return hexadecimal strings', t => {
  [true, false].forEach(isValidHexColor(t));
});

test('Strings return hexadecimal strings', t => {
  ['', 'Hi Mum!', '+\n++_\t)(*&^%$#@\n'].forEach(isValidHexColor(t));
});

test('Numbers return hexadecimal strings', t => {
  [Number.MAX_VALUE, -500, Infinity, 0, 10, 40.2434].forEach(isValidHexColor(t));
});

test('RegExps return hexadecimal strings', t => {
  [new RegExp(), new RegExp(/[a]/)].forEach(isValidHexColor);
});

test('Objects return hexadecimal strings', t => {
  [person, {}].forEach(isValidHexColor(t));
});

test('Arrays return hexadecimal strings', t => {
  [['asdf', person, {}, -2], []].forEach(isValidHexColor(t));
});

test('Functions return hexadecimal strings', t => {
  [function () {}, ()=>{}, personFunction].forEach(isValidHexColor);
});

test('Null returns a hexadecimal string', t => {
  isValidHexColor(t)(null);
});

test('Undefined returns a hexadecimal string', t => {
  isValidHexColor(t)(undefined);
});



/**
 * Tests for specific hexadecimal colors
 */

test('False boolean is red', t => {
  t.is('#BF4040', hashbow(false));
});

test('True boolean is green ', t => {
  t.is('#40BF40', hashbow(true));
});

test('RegExps constructed with different params should be different', t => {
  const hash = hashbow(new RegExp());
  const hash2 = hashbow(new RegExp(/hello/g));
  t.not(hash, hash2);
});
