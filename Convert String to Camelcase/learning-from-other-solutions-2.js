function toCamelCase(str) {
    return str.replace(/[-_](\w)/g, (_, placeholder) => placeholder.toUpperCase());
}