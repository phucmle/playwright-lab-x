function calculateTip(totalBill: number, tipPercentage: string): number {
  return totalBill * (parseInt(tipPercentage) / 100);
}

const tipAmount = calculateTip(100, '15%');
console.log('tipAmount: ', tipAmount);
