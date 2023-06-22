"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResizable = void 0;
const event_listeners_1 = require("./misc/event-listeners");
const data_1 = require("./misc/data");
const style_1 = require("./misc/style");
const utils_1 = require("./utils/utils");
if (data_1.canUserHover) {
    document.head.append(data_1.cursorStyle);
}
const generalStyle = document.createElement('style');
document.head.append(generalStyle);
generalStyle.innerHTML = (0, style_1.getGeneralStyle)(data_1.defaultOptions);
function makeResizable(target, options = {}) {
    let usedElements;
    const usedOptions = { ...data_1.defaultOptions, ...options };
    if (typeof target === 'string') {
        usedElements = [...document.querySelectorAll(target)];
    }
    else if (!Array.isArray(target)) {
        usedElements = [target];
    }
    else {
        usedElements = target;
    }
    for (let element of usedElements) {
        const rect = element.getBoundingClientRect();
        element.style.width = `${(0, utils_1.clamp)(usedOptions.minWidth, rect.width, usedOptions.maxWidth)}px`;
        element.style.height = `${(0, utils_1.clamp)(usedOptions.minHeight, rect.height, usedOptions.maxHeight)}px`;
        element.classList.add('resizox-container');
        element.append(...(0, utils_1.getBars)(usedOptions));
        element._resizoxOptions = usedOptions;
        element._resizoxData = { type: 'container' };
        element.addEventListener('pointerdown', event_listeners_1.onPointerDown);
    }
}
exports.makeResizable = makeResizable;
