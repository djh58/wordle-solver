import * as fs from "fs";
import {IWordList} from "./types";

export function getLetters(word: string): string[] {
    return word.split('');
}

export function getWordConfigsFromFile(filename: string): IWordList {
    const wordList = fs.readFileSync(`./src/constants/${filename}.txt`, 'utf8').split('\n');
    const words: IWordList = {};
    wordList.forEach((word) => {
        words[word] = {
            score: 0,
            guessed: false
        };
    });
    return words;
}