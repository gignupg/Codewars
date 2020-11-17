function simple_assembler(program) {
    const input = program.map(command => command.split(" ").map(str => isNaN(Number(str)) ? str : Number(str)));
    const regs = {};

    for (let i = 0; i < input.length;) {
        const [instr, x, y] = input[i];

        if (instr === "mov") {
            regs[x] = isNaN(y) ? regs[y] : y; i++;

        } else if (instr === "inc") {
            regs[x]++; i++;

        } else if (instr === "dec") {
            regs[x]--; i++;

        } else if (instr === "jnz") {
            if ((isNaN(x) ? regs[x] : x) !== 0) {
                isNaN(y) ? i += regs[y] : i += y;
            } else {
                i++;
            }
        }
    }

    return regs;
}

console.log(simple_assembler([
    'mov a 1',
    'mov b 1',
    'mov c 0',
    'mov d 26',
    'jnz c 2',
    'jnz 1 5',
    'mov c 7',
    'inc d',
    'dec c',
    'jnz c -2',
    'mov c a',
    'inc a',
    'dec b',
    'jnz b -2',
    'mov b c',
    'dec d',
    'jnz d -6',
    'mov c 18',
    'mov d 11',
    'inc a',
    'dec d',
    'jnz d -2',
    'dec c',
    'jnz c -5'
]));