function toCamelCase(str) {
    return str
        .split(/-|_/g)
        .map((w, i) => (!i ? w.charAt(0) : w.charAt(0).toUpperCase()) + w.slice(1))
        .join('');
}

console.log(toCamelCase(""));