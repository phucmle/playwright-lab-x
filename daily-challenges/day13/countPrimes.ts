function isPrime(num: number): Boolean{
    if(num<=1){return false};
    if(num===2) {return true};
    //Even numbers
    if(num%2===0){return false};
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }

    return true
}


function countPrimes(A: Array<number>){
    if((A.length===0)){
        return 0;
    }
    let numOfPrimes = 0;
    for(let i = 0; i < A.length; i++){
        if(isPrime(A[i])){
            numOfPrimes++;
        }
    }
    return numOfPrimes;
}

const A = [2, 3, 4, 5, 6, 7];
console.log(`Number of prime numbers: ${countPrimes(A)}`);