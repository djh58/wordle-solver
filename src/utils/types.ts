

export type LetterInfo = {
    state: LetterState;
    correctIndices?: number[];
    incorrectIndices?: number[];
}

export enum LetterState {
    UNKNOWN = -1,
    NOT_USED = 0,
    WRONG_SPOT = 1,
    CORRECT_SPOT = 2,
}

export interface IGameState {
    letters: ILetterList;
    answers: IWordList;
    allowedGuesses: IWordList;
};

export interface IWordList {
    [key : string] : Word;
}

export interface ILetterList {
    [key : string] : LetterInfo;
}

export type Word = {
    score: number;
    guessed: boolean;
}

export type RowInfo = LetterState[];
