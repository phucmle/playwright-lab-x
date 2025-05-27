const reverseString = (orgStr: string) => {
  return orgStr.split('').reverse().join('');
};

// Test cases
console.log(reverseString('hello')); // "olleh"
console.log(reverseString('')); // ""
console.log(reverseString('*✨')); // "✨*"
console.log(reverseString('Hello World!')); // "!dlroW olleH"
