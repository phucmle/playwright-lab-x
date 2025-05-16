function trimSpaces(originalString: string) {
    const whitespaceTrimmed = originalString.trim();
    const words = whitespaceTrimmed.split(" ");
    const wordsWithNoEmptySpaces = words.filter(word => word !== '');

    return wordsWithNoEmptySpaces.join(" ");
}

const formattedString = trimSpaces("   JavaScript    is    fun   ");
console.log(formattedString);