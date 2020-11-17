function pickPeaks(arr) {
    const result = {
        pos: [],
        peaks: []
    };

    function findNext(currNum, i) {
        if (currNum === arr[i + 1]) {
            // Find the next number that is not equal to currNum
            for (let index = i + 1; index < arr.length; index++) {
                if (arr[index] !== currNum) {
                    return arr[index];
                }
            }

            return "false";

        } else if (i < arr.length - 1) {
            return arr[i + 1];

        } else {
            return "false";
        }
    }

    arr.forEach((currNum, i) => {
        const prev = i ? arr[i - 1] : "false";
        const next = findNext(currNum, i);

        if (prev !== "false" && next !== "false" && currNum !== prev) {
            if (currNum > prev && currNum > next) {
                result.pos.push(i);
                result.peaks.push(currNum);
            }
        }
    });

    return result;
}

console.log("result:", pickPeaks([3, 2, 3, 6, 4, 1, 0, 3, 2, 1, 2, 3]));