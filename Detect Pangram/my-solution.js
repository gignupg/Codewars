function isPangram(string) {
    const letterObj = {};
    const letterArr = string.toLowerCase().replace(/\W/g, "").split("")

    // Populate the object
    letterArr.map(letter => letterObj[letter] = true)

    // Return true for objects that contain all letters of the alphabet
    return Object.keys(letterObj).length >= 26
}

isPangram("The *quick brown fox jumps) over the lazy dog.");