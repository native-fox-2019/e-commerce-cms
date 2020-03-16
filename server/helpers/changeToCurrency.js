module.exports = function ChangeToCurrency(value) {
    return parseInt(value.replace(/,.*|[^0-9]/g, ''), 10);
}