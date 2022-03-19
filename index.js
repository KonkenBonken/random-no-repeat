"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomString = exports.createRandomInt = exports.createRandomFloat = exports.createFunction = void 0;
const { nanoid: randomString } = require('nanoid');
const random = {
    string: () => randomString(),
    float: (min, max) => Math.random() * (max - min) + min,
    int: (min, max) => Math.floor(Math.random() * (max + 1 - min) + min)
};
const createFunction = (type = 'float', min = 0, max = 10, used = []) => {
    if (!random.hasOwnProperty(type))
        return;
    const randomFunction = random[type];
    return () => {
        if (type == 'int' && used.length >= (max - min + 1))
            return;
        do {
            var result = randomFunction(min, max);
        } while (used.includes(result));
        used.push(result);
        return result;
    };
};
exports.createFunction = createFunction;
const createRandomFloat = (min, max, used) => createFunction('float', min, max, used), createRandomInt = (min, max, used) => createFunction('int', min, max, used), createRandomString = (used) => createFunction('string', undefined, undefined, used);
exports.createRandomFloat = createRandomFloat;
exports.createRandomInt = createRandomInt;
exports.createRandomString = createRandomString;
exports.default = createFunction;
