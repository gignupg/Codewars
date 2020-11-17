function toCamelCase(str) {
    str = str.trim();

    if (!str) return "";

    const PascalCase = str[0] === str[0].toUpperCase();
    const wordArr = str.toLowerCase().split(/-|_/g);

    const modifiedWordArr = wordArr.map((word, index) => {
        if (!index && !PascalCase) {
            return word;

        } else {
            const splittedWord = word.split("");
            splittedWord[0] = splittedWord[0].toUpperCase();
            return splittedWord.join("")
        }
    });

    return modifiedWordArr.join("");
}

toCamelCase("the_stealth_warrior");
toCamelCase("The-Stealth-Warrior");