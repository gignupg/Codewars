const { PerformanceObserver, performance } = require('perf_hooks');

// Try saving everything in variables instead of an object!

function simple_assembler(program) {
    const timestamp = performance.now();
    const input = program.map(command => command.split(" "));
    const regs = {};
    let incI = true;

    for (let i = 0; i < input.length;) {
        switch (input[i][0]) {
            case "mov": regs[input[i][1]] = regs[input[i][2]] || Number(input[i][2]); break;
            case "inc": regs[input[i][1]] += 1; break;
            case "dec": regs[input[i][1]] -= 1; break;
            case "jnz": regs[input[i][1]] !== 0 ? incI = false : null;
        }
        incI ? i++ : i += Number(input[i][2]); incI = true;
    }

    console.log(performance.now() - timestamp);
    return regs;
}

console.log(simple_assembler([
    'mov a 1',  // 01
    'mov b 1',  // 02
    'mov c 0',  // 03
    'mov d 26', // 04
    'jnz c 2',  // 05
    'jnz 1 5',  // 06
    'mov c 7',
    'inc d',
    'dec c',
    'jnz c -2',
    'mov c a',  // 07  // 14  // 21         //
    'inc a',    // 08  // 15  // 22  // 25  //  //  //  //
    'dec b',    // 09  // 16  // 23  // 26  //  //  //  //
    'jnz b -2', // 10  // 17  // 24  // 27  //  //  //  //
    'mov b c',  // 11  // 18         //                 //
    'dec d',    // 12  // 19         //                 //
    'jnz d -6', // 13  // 20         //                 //
]));

// 01 { a: 1 } V
// 02 { a: 1, b: 1 } V
// 03 { a: 1, b: 1 , c: 0} V
// 04 { a: 1, b: 1 , c: 0, d: 26} V
// 05 { a: 1, b: 1 , c: 0, d: 26} V
// 06 { a: 1, b: 1 , c: 0, d: 26} V
// 07 { a: 1, b: 1 , c: 1, d: 26} V
// 08 { a: 2, b: 1 , c: 1, d: 26} V
// 09 { a: 2, b: 0 , c: 1, d: 26} V
// 10 { a: 2, b: 0 , c: 1, d: 26} V
// 11 { a: 2, b: 1 , c: 1, d: 26} V
// 12 { a: 2, b: 1 , c: 1, d: 25} V
// 13 { a: 2, b: 1 , c: 1, d: 25} V
// 14 { a: 2, b: 1 , c: 2, d: 25} V
// 15 { a: 3, b: 1 , c: 2, d: 25} V
// 16 { a: 3, b: 0 , c: 2, d: 25} V
// 17 { a: 3, b: 0 , c: 2, d: 25} V
// 18 { a: 3, b: 2 , c: 2, d: 25} V
// 19 { a: 3, b: 2 , c: 2, d: 24} V
// 20 { a: 3, b: 2 , c: 2, d: 24} V
// 21 { a: 3, b: 2 , c: 3, d: 24} V
// 22 { a: 4, b: 2 , c: 3, d: 24} V
// 23 { a: 4, b: 1 , c: 3, d: 24} V
// 24 { a: 4, b: 1 , c: 3, d: 24} V
// 25 { a: 5, b: 1 , c: 3, d: 24} V
// 26 { a: 5, b: 0 , c: 3, d: 24} V


// console.log
// log: 1 object: { a: 1 } V
// log: 2 object: { a: 1, b: 1 } V
// log: 3 object: { a: 1, b: 1, c: 0 } V
// log: 4 object: { a: 1, b: 1, c: 0, d: 26 } V
// log: 5 object: { a: 1, b: 1, c: 0, d: 26 } V
// log: 6 object: { a: 1, b: 1, c: 0, d: 26 } V
// log: 7 object: { a: 1, b: 1, c: 1, d: 26 } V
// log: 8 object: { a: 2, b: 1, c: 1, d: 26 } V
// log: 9 object: { a: 2, b: 0, c: 1, d: 26 } V
// log: 10 object: { a: 2, b: 0, c: 1, d: 26 } V
// log: 11 object: { a: 2, b: 1, c: 1, d: 26 } V
// log: 12 object: { a: 2, b: 1, c: 1, d: 25 } V
// log: 13 object: { a: 2, b: 1, c: 1, d: 25 } V
// log: 14 object: { a: 2, b: 1, c: 2, d: 25 } V
// log: 15 object: { a: 3, b: 1, c: 2, d: 25 } V
// log: 16 object: { a: 3, b: 0, c: 2, d: 25 } V
// log: 17 object: { a: 3, b: 0, c: 2, d: 25 } V
// log: 18 object: { a: 3, b: 2, c: 2, d: 25 } V
// log: 19 object: { a: 3, b: 2, c: 2, d: 24 } V
// log: 20 object: { a: 3, b: 2, c: 2, d: 24 } V
// log: 21 object: { a: 3, b: 2, c: 3, d: 24 } V
// log: 22 object: { a: 4, b: 2, c: 3, d: 24 } V
// log: 23 object: { a: 4, b: 1, c: 3, d: 24 } V
// log: 24 object: { a: 4, b: 1, c: 3, d: 24 } V
// log: 25 object: { a: 5, b: 1, c: 3, d: 24 } V
// log: 26 object: { a: 5, b: 0, c: 3, d: 24 } V
// log: 27 object: { a: 5, b: 0, c: 3, d: 24 }
// log: 28 object: { a: 5, b: 3, c: 3, d: 24 }
// log: 29 object: { a: 5, b: 3, c: 3, d: 23 }
// log: 30 object: { a: 5, b: 3, c: 3, d: 23 }
// log: 31 object: { a: 5, b: 3, c: 5, d: 23 }
// log: 32 object: { a: 6, b: 3, c: 5, d: 23 }
// log: 33 object: { a: 6, b: 2, c: 5, d: 23 }
// log: 34 object: { a: 6, b: 2, c: 5, d: 23 }
// log: 35 object: { a: 7, b: 2, c: 5, d: 23 }
// log: 36 object: { a: 7, b: 1, c: 5, d: 23 }
// log: 37 object: { a: 7, b: 1, c: 5, d: 23 }
// log: 38 object: { a: 8, b: 1, c: 5, d: 23 }
// log: 39 object: { a: 8, b: 0, c: 5, d: 23 }
// log: 40 object: { a: 8, b: 0, c: 5, d: 23 }
// log: 41 object: { a: 8, b: 5, c: 5, d: 23 }
// log: 42 object: { a: 8, b: 5, c: 5, d: 22 }
// log: 43 object: { a: 8, b: 5, c: 5, d: 22 }
// log: 44 object: { a: 8, b: 5, c: 8, d: 22 }
// log: 45 object: { a: 9, b: 5, c: 8, d: 22 }
// log: 46 object: { a: 9, b: 4, c: 8, d: 22 }
// log: 47 object: { a: 9, b: 4, c: 8, d: 22 }
// log: 48 object: { a: 10, b: 4, c: 8, d: 22 }
// log: 49 object: { a: 10, b: 3, c: 8, d: 22 }
// log: 50 object: { a: 10, b: 3, c: 8, d: 22 }
// log: 51 object: { a: 11, b: 3, c: 8, d: 22 }
// log: 52 object: { a: 11, b: 2, c: 8, d: 22 }
// log: 53 object: { a: 11, b: 2, c: 8, d: 22 }
// log: 54 object: { a: 12, b: 2, c: 8, d: 22 }
// log: 55 object: { a: 12, b: 1, c: 8, d: 22 }
// log: 56 object: { a: 12, b: 1, c: 8, d: 22 }
// log: 57 object: { a: 13, b: 1, c: 8, d: 22 }
// log: 58 object: { a: 13, b: 0, c: 8, d: 22 }
// log: 59 object: { a: 13, b: 0, c: 8, d: 22 }
// log: 60 object: { a: 13, b: 8, c: 8, d: 22 }
// log: 61 object: { a: 13, b: 8, c: 8, d: 21 }
// log: 62 object: { a: 13, b: 8, c: 8, d: 21 }
// log: 63 object: { a: 13, b: 8, c: 13, d: 21 }
// log: 64 object: { a: 14, b: 8, c: 13, d: 21 }
// log: 65 object: { a: 14, b: 7, c: 13, d: 21 }
// log: 66 object: { a: 14, b: 7, c: 13, d: 21 }
// log: 67 object: { a: 15, b: 7, c: 13, d: 21 }
// log: 68 object: { a: 15, b: 6, c: 13, d: 21 }
// log: 69 object: { a: 15, b: 6, c: 13, d: 21 }
// log: 70 object: { a: 16, b: 6, c: 13, d: 21 }
// log: 71 object: { a: 16, b: 5, c: 13, d: 21 }
// log: 72 object: { a: 16, b: 5, c: 13, d: 21 }
// log: 73 object: { a: 17, b: 5, c: 13, d: 21 }
// log: 74 object: { a: 17, b: 4, c: 13, d: 21 }
// log: 75 object: { a: 17, b: 4, c: 13, d: 21 }
// log: 76 object: { a: 18, b: 4, c: 13, d: 21 }
// log: 77 object: { a: 18, b: 3, c: 13, d: 21 }
// log: 78 object: { a: 18, b: 3, c: 13, d: 21 }
// log: 79 object: { a: 19, b: 3, c: 13, d: 21 }
// log: 80 object: { a: 19, b: 2, c: 13, d: 21 }
// log: 81 object: { a: 19, b: 2, c: 13, d: 21 }
// log: 82 object: { a: 20, b: 2, c: 13, d: 21 }
// log: 83 object: { a: 20, b: 1, c: 13, d: 21 }
// log: 84 object: { a: 20, b: 1, c: 13, d: 21 }
// log: 85 object: { a: 21, b: 1, c: 13, d: 21 }
// log: 86 object: { a: 21, b: 0, c: 13, d: 21 }
// log: 87 object: { a: 21, b: 0, c: 13, d: 21 }
// log: 88 object: { a: 21, b: 13, c: 13, d: 21 }
// log: 89 object: { a: 21, b: 13, c: 13, d: 20 }
// log: 90 object: { a: 21, b: 13, c: 13, d: 20 }
// log: 91 object: { a: 21, b: 13, c: 21, d: 20 }
// log: 92 object: { a: 22, b: 13, c: 21, d: 20 }
// log: 93 object: { a: 22, b: 12, c: 21, d: 20 }
// log: 94 object: { a: 22, b: 12, c: 21, d: 20 }
// log: 95 object: { a: 23, b: 12, c: 21, d: 20 }
// log: 96 object: { a: 23, b: 11, c: 21, d: 20 }
// log: 97 object: { a: 23, b: 11, c: 21, d: 20 }
// log: 98 object: { a: 24, b: 11, c: 21, d: 20 }
// log: 99 object: { a: 24, b: 10, c: 21, d: 20 }