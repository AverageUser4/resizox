"use strict";
module.exports.clamp = function clamp(min, actual, max) {
    return Math.max(Math.min(actual, max), min);
};
