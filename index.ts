type RandomTypes = 'float' | 'int' | 'string';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const random = {
  string: (_: any, length: number): string => Array(length).fill(0).map(() => alphabet[Math.floor(Math.random() * (alphabet.length))]).join(''),
  float: (min: number, max: number): number => Math.random() * (max - min) + min,
  int: (min: number, max: number): number => Math.floor(Math.random() * (max + 1 - min) + min)
};

const createFunction = (type: RandomTypes = 'float', min: number = 0, max/*length*/: number = 10, used: Array<number | string> = []) => {
  if (!random.hasOwnProperty(type)) return;
  const randomFunction = random[type];
  return (): number | string | void => {
    if (type == 'int' && used.length >= (max - min + 1)) return;
    else if (type == 'string' && used.length >= alphabet.length ** max) return;
    do {
      var result = randomFunction(min, max);
    } while (used.includes(result));
    used.push(result);
    return result;
  }
};
const createRandomFloat = (min?: number, max?: number, used?: number[]) => createFunction('float', min, max, used),
  createRandomInt = (min?: number, max?: number, used?: number[]) => createFunction('int', min, max, used),
  createRandomString = (length: number, used?: string[]) => createFunction('string', undefined, length, used)

export default createFunction;
export {
  createFunction,
  createRandomFloat,
  createRandomInt,
  createRandomString
}
