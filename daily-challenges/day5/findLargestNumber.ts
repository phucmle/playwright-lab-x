// **Input**:
const testArrays: Array<Array<number>> = [
  [3, 7, 2, 5, 9], // Normal case with positive numbers
  [], // Empty array
  [-3, -7, -2, -5, -9], // All negative numbers
  [0, 0, 0, 0], // All zeros
  [1], // Single element
  [100, 50, 200, 150], // Larger numbers
  [-10, 0, 10, 20, -20], // Mixed negative and positive numbers
  [5, 5, 5, 5, 5], // All elements are the same
  [Number.MAX_SAFE_INTEGER, 1, 2], // Edge case with very large numbers
  [0.5, 2.7, 3.3, 1.1], // Array with decimal numbers
];

function findLargestNumber(arr: Array<number>): number | string {
  if (arr.length === 0) {
    return 'Empty array';
  }

  let largestNumber = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largestNumber) {
      largestNumber = arr[i];
    }
  }
  return largestNumber;
}

// Test cases
testArrays.forEach((array, index) => {
  console.log(`Test Array ${index + 1}:`, array);
  console.log(`Largest Number:`, findLargestNumber(array));
  console.log('---');
});
