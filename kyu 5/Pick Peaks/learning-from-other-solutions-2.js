function pickPeaks(arr) {
    const test = arr.map((x, i) => {
        if (i > 0) {
            return Math.sign(x - arr[i - 1]) * i;
        } else {
            return 0;
        }
    });

    console.log("after map:", test)

    const test2 = test.filter(i => i != 0)

    console.log("after shift:", test)

    const pos = test2.filter((x, i, a) => {
        return i < a.length - 1 && (x > 0 && a[i + 1] < 0)
    });

    return { pos: pos, peaks: pos.map(i => arr[i]) };
}

console.log("result:", pickPeaks([3, 2, 3, 6, 4, 1, 0, 3, 2, 1, 2, 3]));