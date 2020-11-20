function permutations(string) {
    const n = string.length;
    let resultArr = [];

    // Dealing with input that doesn't require using recursion
    if (n === 0) resultArr = [];
    else if (n === 1) resultArr = [string];

    // Base case
    else if (n === 2) {
        const reversedString = string[1] + string[0];
        resultArr = [string, reversedString];
    }

    // Recursive Part
    else if (n > 2) {
        resultArr = string.split("").map((_, ix) => {   // 'abc'
            const strArr = string.split("");
            const storedLetter = strArr.splice(ix, 1);

            // Recursive Call
            const recursiveCall = permutations(strArr.join(""));

            // Putting everything back together (the result of the recursive call and the letter we were storing/holding back)
            return recursiveCall.map(str => storedLetter + str);
        });
    }
    
    const result = [].concat(...resultArr);

    // Returning without duplicates
    return [...new Set(result)];
}

// console.log(permutations('ab'));
// ['ab', 'ba']
console.log(permutations('abcd'));
// ['abc', 'bac'...]
// console.log(permutations('abcd'))
// ['abcd', 'bacd'...]
// console.log(permutations('aabb'));
// ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']