import { getWordConfigsFromFile } from "../utils/textParser";
import { IGameState, LetterState } from "../utils/types";

const ALLOWED_GUESSES = "allowed-guesses";
const ANSWERS = "answers-alphabetical";

export const allowedGuesses = getWordConfigsFromFile(ALLOWED_GUESSES);
export const answers = getWordConfigsFromFile(ANSWERS);

export const newGame: IGameState = {
    letters: {
        a: {
            state: LetterState.UNKNOWN,
            correctIndices: [],
            incorrectIndices: []
        },
        b: {
            state: LetterState.UNKNOWN,
            correctIndices: [],
            incorrectIndices: []
        },
        c: {
            state: LetterState.UNKNOWN,
            correctIndices: [],
            incorrectIndices: []
        },
        d: {
            state: LetterState.UNKNOWN,
            correctIndices: [],
            incorrectIndices: []
        },
        e: {
            state: LetterState.UNKNOWN,
            correctIndices: [],
            incorrectIndices: []
        },
        f: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        g: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        h: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        i: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        j: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        k: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        l: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        m: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        n: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        o: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        p: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        q: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        r: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        s: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        t: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        u: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        v: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        w: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        x: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        y: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        },
        z: {
            state: LetterState.UNKNOWN,
             correctIndices: [],
            incorrectIndices: []
        }
    },
    answers: answers,
    allowedGuesses: allowedGuesses
}


