function permutations(string) {
    const n = string.length;
    let letterPerPosition = 1;
    const oneArr = [];
    const fullArr = [];

    if (n === 1) return [string];

    // Calculate the amount of times a letter re-appears at the same position
    for (let i = 2; i < n; i++) {
        letterPerPosition *= i;
    }

    for (let i = 0; i < n; i++) {
        oneArr.push({letter: string[i], amount: letterPerPosition});
    }

    for (let i = 0; i < n; i++) {
        fullArr.push(oneArr);
    }


    return fullArr;
}

// console.log(permutations('ab'));
// ['ab', 'ba']
console.log(permutations('abc'));
// ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
// console.log(permutations('aabb'));;
// ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']


// Thought process

// Choosing the right structure:
// [
//   [{letter: "a", amount: 2}, {letter: "b", amount: 2}, {letter: "c", amount: 2}], 
//   [{letter: "a", amount: 2}, {letter: "b", amount: 2}, {letter: "c", amount: 2}],
//   [{letter: "a", amount: 2}, {letter: "b", amount: 2}, {letter: "c", amount: 2}]
// ]

// Full Object
// {1: [[a,a],[b,b],[c,c]], 2: [[a,a],[b,b],[c,c]], 3: [[a,a],[b,b],[c,c]]}
// {1: [[a],[b,b],[c,c]], 2: [[a,a],[b],[c,c]], 3: [[a,a],[b,b],[c]]}
// {1: [[a],[b],[c,c]], 2: [[a],[b],[c,c]], 3: [[a,a],[b,b]]}
// {1: [[a],[b],[c]], 2: [[b],[c,c]], 3: [[a,a],[b]]}
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

// a, b, c
// b, a, c
// c, a, b
// a, c, b
// b, c, a
// c, b, a


// Let's see if there is a pattern: The same thing but with 4

// Full Object
// {1: [a,a,a,a,a,a,b,b,b,b,b,b,c,c,c,c,c,c], 2: [a,a,a,a,a,a,b,b,b,b,b,b,c,c,c,c,c,c], 3: [a,a,a,a,a,a,b,b,b,b,b,b,c,c,c,c,c,c], 4: [a,a,a,a,a,a,b,b,b,b,b,b,c,c,c,c,c,c]}

// Empty Object
// {1: [], 2: [], 3: [], 4:}

// a b c d
// a b d c
// a c b d
// a c d b
// a d b c
// a d c b

// b a c d
// b a d c
// b c a d
// b c d a
// b d a c
// b d c a

// c a b d
// c a d b
// c b a d
// c b d a
// c d a b
// c d b a

// d a b c
// d a c b
// d b a c
// d b c a
// d c a b
// d c b a


// With 5:

// e a b c d
// e a b d c
// e a c b d
// e a c d b
// e a d b c
// e a d c b

// e b a c d
// e b a d c
// e b c a d
// e b c d a
// e b d a c
// e b d c a

// e c a b d
// e c a d b
// e c b a d
// e c b d a
// e c d a b
// e c d b a

// e d a b c
// e d a c b
// e d b a c
// e d b c a
// e d c a b
// e d c b a

// 1 - 2 - 6 - 24
// 2 - 3 - 4 - 5

// Task: 4 different letters how many times can each letter be in position 1?

// for loop pass in 4 as max length:

// for (let i = 2; i <= 4; i++) {
// 