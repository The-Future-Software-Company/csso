var {
    fork,
    string,
    url,
    tokenTypes: TYPE
} = require('css-tree');

function encodeString(value) {
    const stringApostrophe = string.encode(value, true);
    const stringQuote = string.encode(value);

    return stringApostrophe.length < stringQuote.length
        ? stringApostrophe
        : stringQuote;
}

module.exports = fork({
    node: {
        String: {
            generate(node) {
                this.token(TYPE.String, encodeString(node.value));
            }
        },
        Url: {
            generate(node) {
                const encodedUrl = url.encode(node.value);
                const string = encodeString(node.value);

                this.token(TYPE.Url, encodedUrl.length <= string.length + 5 ? encodedUrl : 'url(' + string + ')');
            }
        }
    }
});