const arr = [0,5,0];

arr.forEach((currNum, i) => {
    const next = () => {
        if (currNum === arr[i + 1]) {
            // Find the next number that is not equal to currNum
            for (let index = i + 1; index < arr.length; index++) {
                if (arr[index] !== currNum) {
                    return arr[index];
                }
            }

            return null;

        } else if (i < arr.length - 1) {
            return arr[i + 1];

        } else {
            return null;
        }
    };
    console.log("currNum:", currNum, "next():", next())
})