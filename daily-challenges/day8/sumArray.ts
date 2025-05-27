import { testFunction } from '../00-helper/helper';

function sumArray(arr: any[]): string {
  if (arr.length === 0) {
    return 'Empty array';
  }

  let sum = 0;
  arr.forEach((element) => {
    if (
      typeof element === 'number' &&
      !isNaN(element) &&
      element !== Infinity &&
      element !== -Infinity
    ) {
      sum += element;
    }
  });

  return `Sum is: ${sum}`;
}

interface ITestCase {
  input: any[];
  expectedOutput: string;
}

const testCases: ITestCase[] = [
  { input: [1, 2, 3, 4, 5], expectedOutput: 'Sum is: 15' },
  { input: [], expectedOutput: 'Empty array' },
  { input: [0], expectedOutput: 'Sum is: 0' },
  { input: [-1, -2, -3, -4, -5], expectedOutput: 'Sum is: -15' },
  { input: [-10, 5, 3, -8, 0], expectedOutput: 'Sum is: -10' },
  { input: [1, 'abc', 3, 4, 'xyz', 5], expectedOutput: 'Sum is: 13' },
  { input: ['abc', 'def', 'ghi'], expectedOutput: 'Sum is: 0' },
  { input: [null, undefined, NaN, 5], expectedOutput: 'Sum is: 5' },
  { input: [Infinity, -Infinity, 10], expectedOutput: 'Sum is: 10' },
  { input: [1.5, 2.5, 3.5], expectedOutput: 'Sum is: 7.5' },
  { input: [999999, 1], expectedOutput: 'Sum is: 1000000' },
  { input: [0, 0, 0, 0], expectedOutput: 'Sum is: 0' },
  { input: [true, false, 10], expectedOutput: 'Sum is: 10' },
  { input: [{}, [], 5, 'string'], expectedOutput: 'Sum is: 5' },
  { input: [2.5, '3.5', 4], expectedOutput: 'Sum is: 6.5' },
];

testFunction(sumArray, testCases);
