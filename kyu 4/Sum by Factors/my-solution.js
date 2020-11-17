function getBiggestNumber(lst) {
    const smallest = Math.abs(Math.min(...lst))
    const biggest = Math.max(...lst)

    return Math.max(smallest, biggest)
}

function getAllPrimes(max){
    var primes = [];
    for(var i=2; i<=max; i++){
        var isPrime = true; 
        for(var j=0; j<primes.length; j++){
            var p = primes[j];
            if( i % p === 0){
                isPrime=false;
                break;
            }
            if(p*p > i)
                break;
         }
        if(isPrime)
            primes.push(i);
    }
    return primes
}

function sumOfDivided(lst) {
    if (!lst.length) return []
    const maxNum = getBiggestNumber(lst)
    const allPrimes = getAllPrimes(maxNum)
    const primes = allPrimes.filter(prime => lst.some(num => !(num % prime)))
    const result = primes.map(prime => [prime, lst.reduce((acc, val) => !(val % prime) ? acc + val : acc, 0)]);

    return result
}