module.exports = function check(str, bracketsConfig) {
    const openBracketsSet = new Set();
    const closedBracketsSet = new Set();

    for (const pair of bracketsConfig) {
        openBracketsSet.add(pair[0]);
        closedBracketsSet.add(pair[1]);
    }

    const bracketsMap = new Map;

    for (const pair of bracketsConfig) {
        bracketsMap.set(pair[1], pair[0]);
    }

    const stack = [];

    for (const char of str) {
        if (openBracketsSet.has(char) && !closedBracketsSet.has(char)) {
            stack.push(char);
        } else if (openBracketsSet.has(char) && closedBracketsSet.has(char)) {
            if (stack.length === 0) {
                stack.push(char);
                continue;
            }
            const lastChar = stack.pop();
            if (bracketsMap.get(char) === lastChar) continue;
            if (bracketsMap.get(char) !== lastChar) {
                stack.push(lastChar);
                stack.push(char);
            }
        } else {
            if (stack.length === 0) return false;
            if (bracketsMap.get(char) !== stack.pop()) return false;
        }
    }

    return stack.length === 0;
}
