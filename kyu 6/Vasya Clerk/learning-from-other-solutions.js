function tickets(peopleInLine) {
    const change = { 
        25: 0, 
        50: 0, 
    };

    for (let payment of peopleInLine) {
        if (payment === 25) change[25]++;
        else if (payment === 50) { change[50]++; change[25]--; }
        else if (payment === 100) { change[25]--; change[50] > 0 ? change[50]-- : change[25] -= 2; }
        
        if (change[25] < 0 || change[50] < 0) return 'NO';
    }

    return 'YES';
}