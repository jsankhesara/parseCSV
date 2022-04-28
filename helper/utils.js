const utils = {};

utils.empty = (mixedVar) => {
    let key;
    let i;
    let len;
    const emptyValues = ['undefined', null, false, 0, '', '0', undefined];
    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixedVar === emptyValues[i]) {
            return true;
        }
    }
    if (typeof mixedVar === 'object') {
        for (key in mixedVar) {
            return false;
        }
        return true;
    }
    return false;
};

module.exports = utils;