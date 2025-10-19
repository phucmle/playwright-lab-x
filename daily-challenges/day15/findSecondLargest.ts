function findSecondLargest(A: Array<number>){
    const noSecondLargestStr = 'No second largest number';
    const n = A.length;

    if(n < 2) { return noSecondLargestStr; }
    A.sort((a, b) => a - b);
    for(let i = 1; i < n; i++){
        if(A[i] !== A[i-1]){
            return(A[i]);
        }
    }
}

console.log(findSecondLargest([10, 3, 10, 3]))
