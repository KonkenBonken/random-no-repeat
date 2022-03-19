"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomString = exports.createRandomInt = exports.createRandomFloat = exports.createFunction = void 0;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const random = {
    string: (_, length) => Array(length).fill(0).map(() => alphabet[Math.floor(Math.random() * (alphabet.length))]).join(''),
    float: (min, max) => Math.random() * (max - min) + min,
    int: (min, max) => Math.floor(Math.random() * (max + 1 - min) + min)
};
const createFunction = (type = 'float', min = 0, max /*length*/ = 10, used = []) => {
    if (!random.hasOwnProperty(type))
        return;
    const randomFunction = random[type];
    return () => {
        if (type == 'int' && used.length >= (max - min + 1))
            return;
        else if (type == 'string' && used.length >= alphabet.length ** max)
            return;
        do {
            var result = randomFunction(min, max);
        } while (used.includes(result));
        used.push(result);
        return result;
    };
};
exports.createFunction = createFunction;
const createRandomFloat = (min, max, used) => createFunction('float', min, max, used), createRandomInt = (min, max, used) => createFunction('int', min, max, used), createRandomString = (length, used) => createFunction('string', undefined, length, used);
exports.createRandomFloat = createRandomFloat;
exports.createRandomInt = createRandomInt;
exports.createRandomString = createRandomString;
exports.default = createFunction;
