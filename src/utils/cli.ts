import prompts, {PromptType} from "prompts";

async function confirm(msg: string): Promise<boolean> {
    const response = await prompts({
        type: "confirm",
        name: "value",
        message: msg
    });
    return response.value;
}

async function validatedEntry(promptType: PromptType, prompt: string): Promise<any> {
    const response = await prompts({
        type: promptType,
        name: "value",
        message: prompt
    }, {onCancel: () => {return;}});
    const validated = await confirm(`Confirm you want to enter ${response.value}?`);
    if (validated) {
        return response.value;
    } else {
        throw "Cancelled";
    }
}

export async function getGuess(): Promise<string> {
    return validatedEntry("text", "Guess a word: ");
}

export async function getRowInfo(): Promise<number[]> {
    return validatedEntry("list", "Enter row info as comma separated list: 0 for letter not used, 1 for wrong location, 2 for correct location (ex: 0,0,0,0,0)...");
}


