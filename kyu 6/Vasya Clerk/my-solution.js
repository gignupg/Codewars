function tickets(peopleInLine) {
    const vasyasMoney = {
        25: 0,
        50: 0,
    };
    const ticketPrice = 25;
    let changeSufficient = "YES";

    peopleInLine.forEach(payment => {
        let change = payment - ticketPrice;

        if (change === 0) {
            vasyasMoney[25] += 1;

        } else if (change === 25) {
            if (!vasyasMoney[25]) {
                changeSufficient = "NO";

            } else {
                vasyasMoney[25] -= 1;
                vasyasMoney[50] += 1;
            }

        } else if (change === 75) {
            if (vasyasMoney[50]) {
                vasyasMoney[50] -= 1;
                if (vasyasMoney[25]) {
                    vasyasMoney[25] -= 1;
                } else {
                    changeSufficient = "NO"
                }

            } else if (vasyasMoney[25] >= 3) {
                vasyasMoney[25] -= 3;

            } else {
                changeSufficient = "NO"
            }
        }
    });

    return changeSufficient;
}

// Expected: 'NO', instead got: 'YES'
console.log(tickets([ 25, 50, 100]));