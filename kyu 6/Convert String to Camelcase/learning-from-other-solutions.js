function toCamelCase(str) {
    return str.replace(/[-_]\w/g, match => match[1].toUpperCase());
}