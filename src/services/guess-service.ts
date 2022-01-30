import { getLetters } from "../utils/textParser";
import { IGameState, IWordList, Word, LetterState, RowInfo } from "../utils/types";

export class GuessService {
    private gameState: IGameState;

    constructor(gameState: IGameState) {
        this.gameState = gameState;
    };

    public handleGuess = (guess: string, rowInfo?: RowInfo): void => {
        try {
            this._validateGuess(guess);
            if (rowInfo) {
                this._validateRowInfo(rowInfo);
            }
        } catch (error) {
            console.log(`Validation error when handling guess: ${error.message}`);
        }
        this._addGuess(guess);
        if (rowInfo) {
            this._updateLetters(guess, rowInfo);
            this.gameState.allowedGuesses = this._updateWordList(this.gameState.allowedGuesses);
            this.gameState.answers = this._updateWordList(this.gameState.answers);
        }
    }

    private _validateGuess = (guess: string): void => {
        // regex guess to only contain lowercase a-z
        let guessRegex = /^[a-z]+$/;
        if (!guessRegex.test(guess)) {
            throw new Error("Guess must be lowercase letters only"); 
        }
        if (guess.length !== 5) {
            throw new Error("Guess must be 5 characters long");
        }
        const notFoundOnGuessList = this.gameState.allowedGuesses[guess] === undefined;
        const notFoundOnAnswerList = this.gameState.answers[guess] === undefined;
        if (notFoundOnGuessList && notFoundOnAnswerList) {
            throw new Error("Guess is invalid - needs to be part of answers or allowed guesses");
        }
        if (notFoundOnGuessList ? this.gameState.answers[guess].guessed : this.gameState.allowedGuesses[guess].guessed) {
            throw new Error("Guess has already been guessed");
        }
        return;
    }

    private _validateRowInfo = (rowInfo: RowInfo): void => {
        if (rowInfo.length !== 5) {
            throw new Error("Row info must be 5 characters long");
        }
        for (var i = 0; i < rowInfo.length; i++) { 
            if (rowInfo[i] < LetterState.UNKNOWN || rowInfo[i] > LetterState.CORRECT_SPOT) {
                throw new Error(`Item ${rowInfo[i]} is not a valid letter state`);
            }
        }
        return;
    }

    private _addGuess = (guess: string): void => {
        if (this.gameState.answers[guess]) {
            this.gameState.answers[guess].guessed = true;
        }
        else {
            this.gameState.allowedGuesses[guess].guessed = true;
        }
        return;
    }

    private _updateLetters = (guess: string, rowInfo: RowInfo): void => {
        const letters = getLetters(guess);
        for (let i = 0; i < letters.length; i++) {
            const currState = this.gameState.letters[letters[i]].state;
            const newState = Number(rowInfo[i])
            if (newState > currState) {
                this.gameState.letters[letters[i]].state = newState; 
            }
            if (newState === LetterState.CORRECT_SPOT) {
                if (!this.gameState.letters[letters[i]].correctIndices.includes(i)) {
                    this.gameState.letters[letters[i]].correctIndices.push(i);
                } 
            }
            if (newState === LetterState.WRONG_SPOT) {
                if (!this.gameState.letters[letters[i]].incorrectIndices.includes(i)) {
                    this.gameState.letters[letters[i]].incorrectIndices.push(i);
                } 
            }
            
        }
        return;
    }

    private _updateWordList = (list: IWordList): IWordList => {
        for (const key in list) {
            list[key].score = this._getWordScore(key);
        }
        return list
    }

    private _getWordScore = (word: string): number => { 
        const letters = getLetters(word);
        let score = 0;
        for (let i = 0; i < letters.length; i++) {
            const state = this.gameState.letters[letters[i]].state as number;
            switch (state as number) {
                
                case LetterState.CORRECT_SPOT as number:
                    if (this.gameState.letters[letters[i]].correctIndices && this.gameState.letters[letters[i]].correctIndices.includes(i)) { 
                        score += (4 * state) ** 2;
                    }
                    continue;
                case LetterState.WRONG_SPOT as number:
                    if (this.gameState.letters[letters[i]].incorrectIndices && this.gameState.letters[letters[i]].incorrectIndices.includes(i)) { 
                        score -= 999;
                    }
                    else {
                        score += (1.5 * state) ** 2;
                    }
                    continue;
                case LetterState.UNKNOWN as number:    
                    score += (1.4 * state) ** 2;
                    continue;
                case LetterState.NOT_USED as number:    
                    score -= 999;
                    continue; 
                default:
                    continue;
            }
        }
        return score;
    }

    private _getBestGuessFromList = (list: IWordList): {word: string, score: number} => {
        // prioritize words with high scores and many letters that have not been guessed 
        let bestGuess: string = "";
        let bestScore = 0;
        for (const key in list) {
            if (list[key].score > bestScore) {
                bestGuess = key;
                bestScore = list[key].score;
            }
        }
        return {word: bestGuess, score: bestScore};
    }

    public getBestGuess = (): string => {
        const bestAllowedGuess = this._getBestGuessFromList(this.gameState.allowedGuesses);
        const bestAnswer = this._getBestGuessFromList(this.gameState.answers);
        if (bestAllowedGuess.score > bestAnswer.score) {
            return bestAllowedGuess.word;
        }
        else return bestAnswer.word;
    }

}