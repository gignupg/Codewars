class Clerk {
    constructor() {
        this.money = {
            25: 0,
            50: 0
        };
    }

    sell(element) {
        this.money[element]++;

        switch (element) {
            case 25:
                return true;
            case 50:
                this.money[25]--;
                break;
            case 100:
                this.money[50] ? this.money[50]-- : this.money[25] -= 2;
                this.money[25]--;
                break;
        }
        return this.money[25] >= 0;
    };
}

function tickets(peopleInLine) {
    var vasya = new Clerk();
    return peopleInLine.every(payment => vasya.sell(payment)) ? "YES" : "NO";
}

console.log(tickets([25, 50, 100]));