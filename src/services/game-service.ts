import { getGuess, getRowInfo } from "../utils/cli";
import { newGame } from "../constants/constants";
import { GuessService } from "./guess-service";
import { IGameState } from "../utils/types";

export class GameService {
    private guessService: GuessService;
    private gameState: IGameState;

    constructor() {
        this.gameState = newGame;
        this.guessService = new GuessService(this.gameState);
    }

    public runGuesser = async (): Promise<void> => {
        console.log("Welcome to the Wordle guesser!");
        console.log("Have Wordle open, and I'll help you out :)");
        console.log("Let's start off with your first guess...");
        console.log("I recommend a word with lots of vowels and commonly used consonants");
        console.log("Personally, I'm a fan of 'raise', but you do you");
        for (let i = 0; i < 6; i++) {
            if (i !== 0) {
                console.log("Let's see what your next guess is...");
                const nextGuess = this.guessService.getBestGuess();
                console.log(`I'm feeling '${nextGuess}' for you!`);
                console.log('Enter it when prompted below, of be a contrarian and choose something else');
            }
            const guess = await getGuess();
            console.log('Cool, now enter your row info, so we can recommend your next guess');
            const rowInfo = await getRowInfo();
            if (rowInfo == [2,2,2,2,2]) {
                console.log(`Nice job - you won in ${i + 1} guesses!`);
                break;
            }
            this.guessService.handleGuess(guess, rowInfo);
        }
        console.log("Thanks for playing!");    
    }

}