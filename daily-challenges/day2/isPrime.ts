function isPrime(num: number) {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function checkPrimeNumber(num: number) {
  if (isPrime(num)) {
    console.log(`${num} is a prime number`);
  } else {
    console.log(`${num} is NOT a prime number`);
  }
}

// Test cases
for (let i = -1; i <= 10; i++) {
  checkPrimeNumber(i);
}
