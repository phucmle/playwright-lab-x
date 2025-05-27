import { testFunction } from '../00-helper/helper';

function countWords(textInput: string): number {
  if (textInput.trim() === '') {
    return 0;
  }
  const words = textInput.trim().split(' ');

  for (let i = words.length - 1; i >= 0; i--) {
    if (words[i] === '') {
      words.splice(i, 1);
    }
  }

  return words.length;
}

interface TestCase {
  input: string;
  expectedOutput: number;
}

const testCases: TestCase[] = [
  { input: 'Hello, I am a programmer.', expectedOutput: 5 },
  { input: 'I am a programmer.', expectedOutput: 4 },
  { input: 'Hello, I am a programmer', expectedOutput: 5 },
  { input: '     ', expectedOutput: 0 },
  { input: '', expectedOutput: 0 },
  { input: 'One', expectedOutput: 1 },
  { input: 'JavaScript is very interesting!', expectedOutput: 4 },
  { input: 'Words   with   multiple   spaces   between   them', expectedOutput: 6 },
  { input: 'Hyphenated-words count as one', expectedOutput: 4 },
  { input: 'Numbers 123 and symbols @#$ are counted too', expectedOutput: 8 },
  { input: 'End with multiple spaces   ', expectedOutput: 4 },
  { input: '   Start with multiple spaces', expectedOutput: 4 },
  { input: 'Punctuation, like: this; should! not? affect-counting.', expectedOutput: 6 },
  { input: 'Email addresses like example@domain.com count as one word', expectedOutput: 8 },
  { input: 'URLs https://www.example.com are single words too', expectedOutput: 6 },
];

testFunction(countWords, testCases);
