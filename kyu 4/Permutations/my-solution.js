function permutations(string) {
    const n = string.length;

    if (n === 0) return [];
    if (n === 1) return [string];

    // Calculate the amount of times a letter re-appears at the same position and save it in switchArr
    // switchArr should look like this 2,6,24,120... up to n
    const switchArr = [0];
    let charsPerPos = 1;
    for (let i = 1; i <= n; i++) {
        charsPerPos *= i;
        switchArr.push(charsPerPos);
    }

    const totalRuns = switchArr.pop();

    // This array will include all results. There may or may not be duplicates in it. Depending on whether "string" contains only unique characters or not.
    const resultArr = [];
    const strArr = string.split("");

    // The main part. Calculating all possible combinations.
    for (let i = 1; i <= totalRuns; i++) {
        resultArr.push(strArr.join(""));

        // Rearranging the string.
        // look at the char right. Calculate with i and switchArr[j] whether or not to move it!
        for (let j = 0; j < n; j++) {
            const switchNum = switchArr[j];

            if (i % switchNum === 0) {
                const end = strArr.splice((n - 1 - j), 1);
                strArr.push(...end);
            }
        }
    }

    // Getting rid of duplicates before returning. 
    return [...new Set(resultArr)];
}

// console.log(permutations('ab'));
// ['ab', 'ba']
// permutations('abc');
// ['abc', 'bac'...]
console.log(permutations('abcd'))
// ['abcd', 'bacd'...]
// console.log(permutations('aabb'));
// ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']



// 1 - 2 - 6 -24 -120
// 1 - 1 - 2 - 6 - 24
// 1 - 2 - 3 - 4 -  5

// Task: 4 different letters how many times can each letter be in position 1?

// for loop pass in 4 as max length:

// for (let i = 2; i <= 4; i++) {

// abcd | length = 4 => duration 6 cycles before changing the order.
// p4 a | Stays the same 6 times (in this case throughout the whole lifecycle of this order).
// p3 b | Stays the same 2 times
// p2 c | Stays the same 1 time
// p1 d | Stays the same 1 time

// p4 changes after 6 r
// p3 changes after 2 r
// p2 changes after 1 r
// p1 changes after 1 r

// p1 is never moved!

// abcde -> p2 end
// abced -> p2 end & p3 end
// abdec -> p2 end
// abdce -> p2 end & p3 end
// abecd -> p2 end
// abedc -> p2 end & p3 end & p4 end

// acdeb -> p2 end
// acdbe -> p2 end & p3 end
// acebd -> p2 end
// acedb -> p2 end & p3 end
// acbde -> p2 end
// acbed -> p2 end & p3 end & p4 end

// adebc -> end
// adecb -> p2 end & p3 end
// adbce -> p2 end
// adbec -> p2 end & p3 end
// adceb -> p2 end
// adcbe -> p2 end & p3 end & p4 end

// aebcd -> end
// aebdc -> p2 end & p3 end
// aecdb -> p2 end
// aecbd -> p2 end & p3 end
// aedbc -> p2 end
// aedcb -> p2 end & p3 end & p4 end

// bcdea...
// It works, I've found THE algorithm

//   621
// 0 abcd -> move p2 to the right
//   511
// 1 abdc -> move p3 to the right & move p2 to the right  
//   421
// 2 acdb -> move p2 to the right
//   311
// 3 acbd -> move p3 to the right & move p2 to the right  
//   221
// 4 abcd -> move p2 to the right
//   121

// string = "abcd"

// string = p4 + p3 + p2 + p1
// string = p4 + p3 + p2 + p1

// p4 = a 

// const resultArr = []

// for (let i = 0; i < n; i++) {

      // We must have an array that contains all possible string values
//    for (let r = 0; r < 6; r++) {
//       6 * p4/a  | 2 * p3/b  | 1 * p2/c | 1* p1/d
//    }

// }


// How I tried to solve it at first

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

// Let's see if there is a pattern: The same thing but with 4

// Full Object
// {1: [a,a,a,a,a,a,b,b,b,b,b,b,c,c,c,c,c,c], 2: [a,a,a,a,a,a,b,b,b,b,b,b,c,c,c,c,c,c], 3: [a,a,a,a,a,a,b,b,b,b,b,b,c,c,c,c,c,c], 4: [a,a,a,a,a,a,b,b,b,b,b,b,c,c,c,c,c,c]}

// Empty Object
// {1: [], 2: [], 3: [], 4:}