function isPangram(string) {
    const inputArray = string.toLowerCase().split("");
    const allLettersArr = "abcdefghijklmnopqrstuvwxyz".split("");

    return allLettersArr.every(letter => inputArray.indexOf(letter) !== -1);
}

isPangram("The *quick brown fox jumps) over the lazy dog.");