"use strict";
const { clamp } = require('./utils');
const defaultOptions = {
    resizeOutlineWidth: 10,
    minWidth: 50,
    maxWidth: 2000,
    minHeight: 50,
    maxHeight: 1400,
};
let currentlyResizedElement = null;
function onPointerDown(event) {
    const target = event.target;
    if (!target._resizoxOptions || !target._resizoxData) {
        return;
    }
    const { offsetX, offsetY } = event;
    const outlineWidth = Number(target._resizoxOptions?.resizeOutlineWidth);
    const targetRect = target.getBoundingClientRect();
    target._resizoxData.direction = '';
    if (offsetY >= targetRect.height - outlineWidth) {
        target._resizoxData.direction += 'Bottom';
    }
    if (offsetX >= targetRect.width - outlineWidth) {
        target._resizoxData.direction += 'Right';
    }
    if (target._resizoxData.direction) {
        currentlyResizedElement = target;
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
    }
}
function onPointerMove(event) {
    if (currentlyResizedElement) {
        const { clientX, clientY } = event;
        const target = currentlyResizedElement;
        const targetRect = target.getBoundingClientRect();
        if (!target._resizoxOptions || !target._resizoxData) {
            return;
        }
        const options = { ...defaultOptions, ...target._resizoxOptions };
        if (target._resizoxData.direction?.includes('Right')) {
            const newWidth = clamp(options.minWidth, clientX - targetRect.x, options.maxWidth);
            target.style.width = `${newWidth}px`;
        }
        if (target._resizoxData.direction?.includes('Bottom')) {
            const newHeight = clamp(options.minHeight, clientY - targetRect.y, options.maxHeight);
            target.style.height = `${newHeight}px`;
        }
    }
}
function onPointerUp(event) {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
}
function makeResizable(target, options = {}) {
    let usedElements;
    const usedOptions = { ...defaultOptions, ...options };
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
        element._resizoxOptions = usedOptions;
        element._resizoxData = {};
        element.addEventListener('pointerdown', onPointerDown);
    }
}
module.exports = {
    makeResizable,
};
