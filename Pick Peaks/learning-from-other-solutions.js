function pickPeaks(arr) {
    const result = { pos: [], peaks: [] };
    let possiblePeakAt = -1;

    arr.forEach((currNum, i) => {
        if (i && currNum > arr[i - 1]) {
            possiblePeakAt = i;

        } else if (i && currNum < arr[i - 1] && possiblePeakAt !== -1) {
            result.pos.push(possiblePeakAt)
            result.peaks.push(arr[possiblePeakAt])
            possiblePeakAt = -1
        }
    });

    return result;
}

console.log("result:", pickPeaks([1, 2, 1]));