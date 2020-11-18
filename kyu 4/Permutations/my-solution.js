function fillingArrWithChars(string, n, charsPerPos) {
    const fullArr = [];
    const preparationArr = [];

    for (let i = 0; i < n; i++) {
        preparationArr.push({ letter: string[i], amount: charsPerPos });
    }
    for (let i = 0; i < n; i++) {
        fullArr.push(JSON.parse(JSON.stringify(preparationArr)));
    }

    return fullArr;
}

function generateAllCombinations(fullArr, n, charsPerPos) {
    const resultArr = [];
    const totalChars = n * charsPerPos;

    for (let i = 0; i < totalChars; i++) {
        let newStrCombo = "";
        const usedCharPos = [];

        if (i >= 0) {
            console.log("||| New i |||", i)
            console.log("Snapshot:");
            console.log(fullArr);
            console.log("Array so far:");
            console.log(resultArr);
        }

        // Looping through each character position
        for (let j = 0; j < n; j++) {
            const arr = fullArr[j];
            const score = [];       // Give each obj a score, then push the obj with the highest score!

            // Looping through each possible character for each position (j), then choosing one character.
            for (let k = 0; k < n; k++) {

                if (usedCharPos.includes(k)) {
                    score.push(0);

                } else {
                    score.push(arr[k].amount);
                }
            };

            // Find the next letter
            if (score.length) {
                const highestScore = [...score].sort((a, b) => b - a)[0];
                const highScorePos = score.indexOf(highestScore);
                const obj = arr[highScorePos];

                // if (i >= 0 && i <= 1) {
                //     console.log("score", score)
                //     console.log("highestScore", highestScore)
                //     console.log("highScorePos", highScorePos)
                //     console.log("obj", obj)
                //     console.log("-----------------------------")
                // }

                newStrCombo += obj.letter;
                obj.amount--;
                usedCharPos.push(highScorePos);
            }
        };
        resultArr.push(newStrCombo);
    }
    return resultArr;
}


function permutations(string) {
    const n = string.length;

    if (n === 1) return [string];

    // Calculate the amount of times a letter re-appears at the same position
    let charsPerPos = 1;
    for (let i = 2; i < n; i++) {
        charsPerPos *= i;
    }

    const fullArr = fillingArrWithChars(string, n, charsPerPos);
    const resultArr = generateAllCombinations(fullArr, n, charsPerPos);

    // Getting rid of duplicates before returning. 
    return [...new Set(resultArr)];
}

// console.log(permutations('ab'));
// ['ab', 'ba']
// permutations('abc');
// ['abc', 'bac'...]
permutations('abcd');
// ['abcd', 'bacd'...]
// console.log(permutations('aabb'));
// ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']


// Thought process

// Choosing the right structure:
// [
//   [{letter: "a", amount: 2}, {letter: "b", amount: 2}, {letter: "c", amount: 2}],
//   [{letter: "a", amount: 2}, {letter: "b", amount: 2}, {letter: "c", amount: 2}],
//   [{letter: "a", amount: 2}, {letter: "b", amount: 2}, {letter: "c", amount: 2}]
// ]

// Full Object
// {1: [a,a,b,b,c,c], 2: [a,a,b,b,c,c], 3: [a,a,b,b,c,c]}
// {1: [a,b,b,c,c], 2: [a,a,b,c,c], 3: [a,a,b,b,c]}
// {1: [a,b,c,c], 2: [a,b,c,c], 3: [a,a,b,b]}
// {1: [a,b,c], 2: [b,c,c], 3: [a,a,b]}
// {1: [b,c], 2: [b,c], 3: [a,a]}
// {1: [c], 2: [b], 3: [a]}
// {1: [], 2: [], 3: []}

// Empty Object
// {1: [], 2: [], 3: []}
// {1: [a], 2: [b], 3: [c]}
// {1: [a,b], 2: [b,a], 3: [c,c]}
// {1: [a,b,c], 2: [b,a,a], 3: [c,c,b]}
// {1: [a,b,c,a], 2: [b,a,a,c], 3: [c,c,b,b]}
// {1: [a,b,c,a,b], 2: [b,a,a,c,c], 3: [c,c,b,b,a]}
// {1: [a,b,c,a,b,c], 2: [b,a,a,c,c,b], 3: [c,c,b,b,a,a]}


// a b c d
// 


// Let's see if there is a pattern: The same thing but with 4

// Full Object
// {1: [a,a,a,a,a,a,b,b,b,b,b,b,c,c,c,c,c,c], 2: [a,a,a,a,a,a,b,b,b,b,b,b,c,c,c,c,c,c], 3: [a,a,a,a,a,a,b,b,b,b,b,b,c,c,c,c,c,c], 4: [a,a,a,a,a,a,b,b,b,b,b,b,c,c,c,c,c,c]}

// Empty Object
// {1: [], 2: [], 3: [], 4:}


// 2 - 6 -24 -120
// 1 - 2 - 6 - 24
// 2 - 3 - 4 -  5

// Task: 4 different letters how many times can each letter be in position 1?

// for loop pass in 4 as max length:

// for (let i = 2; i <= 4; i++) {

// abcd
// abdc
// acbd
// acdb
// adbc
// adcb