# wordle-solver

## What is Wordle?

If you're not familiar, [Wordle](https://www.powerlanguage.co.uk/wordle/) is a viral web app that has a daily five letter word that users have to guess in six tries. Each try gives you hints - which letters are used and whether they are in the right location or now.

## Running the code

Pre-req: make sure you have node installed

1) Run `yarn` to install dependencies
2) Run `yarn wordle`, and enjoy! 

## What does this code do? 

This Node script allows you to submit the results of each Wordle guess from the command line and receive a recommended guess based off the current status of your game. 

I used the following word lists for the [allowed guesses](https://gist.github.com/cfreshman/cdcdf777450c5b5301e439061d29694c) and [set of answers](https://gist.github.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b).

### The algorithm

#### Some clarifying terminology

- **Target word**: The word we're trying to guess
- **Guess word**: The word that we are guessing in one of our turns
- **Position**: where in the target word a letter is
- **Allowed guesses**: set of potential guess words that is not a potential target word
- **Answer set**: set of potential target words. No word in the allowed guesses is in the answer set, and no word in the answer set is in the allowed guesses.
- **Drastically decrease**: decrease the score of a word such that is is eliminated from consideration

#### Summary 
We track what we know about each letter in the alphabet as the game progresses - is it not in the target word? is it in the target word but at the wrong position? the right position?

We also track each word both the allowed guesses and answer set and assign them a score, for which a higher score means it is a more desirable choice.

We decide the best guess for each turn by taking the highest score between the allowed guesses and answer set. If there is a tie between a highest score word on both lists, then we err towards the answer list. This is because the guess list is merely tactical - it allows you to gather more information about letters and their positions


#### Things that decrease a word's score

- We drastically decrease the score of any words have a letter that we know is not used in the target word. 

For example, if my first guess was "raise", and r was gray (code of 0), meaning that it is not in the target word, then we would drastically decrease the score of any word containing r.

- We also drastically decrease the score of any words that have a letter in the target word, but at a position that we know is incorrect. 

For example, if my first guess was "raise", and r was yellow (code of 1), meaning that it is in the target word but at the incorrect position, then we would drastically decrease the score of any word starting with r, as we know that r has to be in one of the other four positions. 


#### Things that increase a word's score

- If we know a letter has been in the incorrect position in previous guesses, we can increase the score of words that have this letter in other positions. 

For example, if "arise" and "raise" both have r as yellow (code of 1), then we can increase the score of "dirty," for example, as r could be in that position.

- If we know a letter has been in the correct position in previous guesses, we can significantly increase the score of words containing that letter in the same position. 

For example, if "raise" has r as green (code of 2)

- If we don't know anything about a particular letter yet, then we can increase the score, as this allows us to ensure new letter discovery is weighted, otherwise the recommendations would contains repeat letters too often. I discovered I needed to do this when in testing I was continually being recommended "grrrl" after indicating that r is somewhere in the target word

For example, if our first guess was "raise" and no letters are in the target word, we'd be inclined to guess "could" next, as we have the chance to learn something new about all five letters.

