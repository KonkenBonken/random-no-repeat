const { nanoid: randomString } = require('nanoid');

type RandomTypes = 'float' | 'int' | 'string';

const random = {
  string: (): string => randomString(),
  float: (min: number, max: number): number => Math.random() * (max - min) + min,
  int: (min: number, max: number): number => Math.floor(Math.random() * (max + 1 - min) + min)
};

const createFunction = (type: RandomTypes = 'float', min: number = 0, max: number = 10, used: Array<number | string> = []) => {
  if (!random.hasOwnProperty(type)) return;
  const randomFunction = random[type];
  return (): number | string | void => {
    if (type == 'int' && used.length >= (max - min + 1)) return;
    do {
      var result = randomFunction(min, max);
    } while (used.includes(result));
    used.push(result);
    return result;
  }
};
const createRandomFloat = (min?: number, max?: number, used?: number[]) => createFunction('float', min, max, used),
  createRandomInt = (min?: number, max?: number, used?: number[]) => createFunction('int', min, max, used),
  createRandomString = (used?: string[]) => createFunction('string', undefined, undefined, used)

export default createFunction;
export {
  createFunction,
  createRandomFloat,
  createRandomInt,
  createRandomString
}
