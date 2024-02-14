import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/words.js', () => {
    return {
      getWord: jest.fn(() => 'APPLE'),
      isWord: jest.fn(() => true),
    };
  });
  
  const { Wordle, buildLetter } = await import('../src/wordle.js');


describe('building a letter object', () => {
    test('returns a letter object', () => {
        const letter = buildLetter('A', 'PRESENT');
        expect(letter).toEqual({letter: 'A', status: 'PRESENT'})
    })
})

describe('construction a new Wordle game', () => {
    test('setsmaxGuesses to 6 if no argument is passed', ()=>{
        const wordle = new Wordle()
       expect(wordle.maxGuesses).toBe(6)
    });
    test('set maxGuesses to 10 if no argument is passed', ()=>{
        const wordle = new Wordle(10)
        expect(wordle.maxGuesses).toBe(10)
    });
    test('that it sets guesses to an array of leng maxGuesses', () => {
        const wordle = new Wordle()
        expect(wordle.guesses.length).toBe(6)
    });
    test('current  sets current Guess to 0', () => {
        const wordle = new Wordle()
        expect(wordle.currGuess).toBe(0)
    })
    test('sets word to a word from getWord', () => {
        const wordle = new Wordle();
        expect(wordle.word).toBe('APPLE');
      });
})

describe('buid a new word', () => {
    test('that it sets the status of a correct letter to CORRECT', 
    () => {
        const wordle = new Wordle();
        const guess = wordle.buildGuessFromWord('A____');
        expect(guess[0].status).toBe('CORRECT')
    });
    test('sets the status of a present letter to PRESENT', () => {
        const wordle = new Wordle();
        const guess = wordle.buildGuessFromWord('E____');
        expect(guess[0].status).toBe('PRESENT');
      });
    
      test('sets the status of an absent letter to ABSENT', () => {
        const wordle = new Wordle();
        const guess = wordle.buildGuessFromWord('Z____');
        expect(guess[0].status).toBe('ABSENT');
      });
})

describe('making a guess', () => {
    test('throws an error if no more guesses are allowed', () => {
        const wordle = new Wordle(1);
        wordle.appendGuess('GUESS');
        expect(() => wordle.appendGuess('GUESS')).toThrow();
    });
    test('throws an error if the guess is not of length 5', () => {
        const wordle = new Wordle(1)
        expect(() => wordle.appendGuess('LONG GUESS')).toThrow();
    });
    test('throws an error if the guess is not a word', () => {
        const wordle = new Wordle();
        mockIsWord.mockReturnValueOnce(false);
        expect(() => wordle.appendGuess('GUESS')).toThrow();
      });
    
      test('appends the result of buildGuessFromWord to the guesses array', () => {
        const wordle = new Wordle();
        wordle.appendGuess('GUESS');
        expect(wordle.guesses[0]).toEqual(wordle.buildGuessFromWord('GUESS'));
      });
    
      test('increments the current guess', () => {
        const wordle = new Wordle();
        wordle.appendGuess('GUESS');
        expect(wordle.currGuess).toBe(1);
      });
})