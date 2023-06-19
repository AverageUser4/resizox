const { clamp } = require('./utils');

type Target = HTMLElement[] | HTMLElement | string;
type Direction = '' | 'Bottom' | 'Right' | 'BottomRight';
type ResizoxOptions = {
  outlineSize?: number,
  minWidth?: number,
  maxWidth?: number,
  minHeight?: number,
  maxHeight?: number,
};
interface ResizoxElement extends HTMLElement {
  _resizoxOptions?: ResizoxOptions,
  _resizoxData?: {
    direction?: Direction,
  }
}

const defaultOptions: ResizoxOptions = {
  outlineSize: 15,
  minWidth: 50,
  maxWidth: 2000,  
  minHeight: 50,
  maxHeight: 1400,
};

let currentlyResizedElement: ResizoxElement | null = null;

const hasUserMouse = matchMedia('(pointer: fine)').matches;
const cursorStyle = document.createElement('style');
cursorStyle.id = 'resizox-style-element';
if(hasUserMouse) {
  document.head.append(cursorStyle);
}

function getDirection(event: MouseEvent): Direction {
  const target = <ResizoxElement>event.target;

  if(!target._resizoxOptions || !target._resizoxData) {
    return '';
  }
  
  const { offsetX, offsetY } = event;
  const outlineSize = Number(target._resizoxOptions?.outlineSize);
  const targetRect = target.getBoundingClientRect();

  let direction: Direction = '';

  if(offsetY >= targetRect.height - outlineSize) {
    direction = 'Bottom';
  }
  if(offsetX >= targetRect.width - outlineSize) {
    direction = (direction === 'Bottom') ? 'BottomRight' : 'Right';
  }

  return direction;
}

function getCursorStyle(direction: Direction): string {
  const map = {
    '': '',
    'Bottom': 's',
    'Right': 'e',
    'BottomRight': 'se',
  };

  const mapped = map[direction];
  return mapped && `* { cursor: ${mapped}-resize !important; }`;
}

function onMouseMove(event: MouseEvent) {
  if(!currentlyResizedElement) {
    cursorStyle.innerHTML = getCursorStyle(getDirection(event));

    window.removeEventListener('mousemove', onMouseMove);

    if(event.currentTarget !== window) {
      window.addEventListener('mousemove', onMouseMove);
      event.stopPropagation();
    }
  }
}

function onPointerDown(event: PointerEvent) {
  const target = <ResizoxElement>event.target;

  if(!target._resizoxData) {
    return;
  }

  target._resizoxData.direction = getDirection(event);
  
  if(target._resizoxData.direction) {
    currentlyResizedElement = target;
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }
}

function onPointerMove(event: PointerEvent) {
  if(currentlyResizedElement) {
    const { clientX, clientY } = event;
    const target = currentlyResizedElement;
    const targetRect = target.getBoundingClientRect();

    if(!target._resizoxOptions || !target._resizoxData) {
      return;
    }

    const options = { ...defaultOptions, ...target._resizoxOptions };

    if(target._resizoxData.direction?.includes('Right')) {
      const newWidth = clamp(options.minWidth, clientX - targetRect.x, options.maxWidth);
      target.style.width = `${newWidth}px`;
    }
    if(target._resizoxData.direction?.includes('Bottom')) {
      const newHeight = clamp(options.minHeight, clientY - targetRect.y, options.maxHeight);
      target.style.height = `${newHeight}px`;
    }
  }
}

function onPointerUp(event: PointerEvent) {
  currentlyResizedElement = null;
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerup', onPointerUp);
}

function makeResizable(elements: ResizoxElement[], options: ResizoxOptions): void;
function makeResizable(element: ResizoxElement, options: ResizoxOptions): void;
function makeResizable(selector: string, options: ResizoxOptions): void;
function makeResizable(target: Target, options: ResizoxOptions = {}): void {
  let usedElements: ResizoxElement[];
  const usedOptions: ResizoxOptions = { ...defaultOptions, ...options };

  if(typeof target === 'string') {
    usedElements = <ResizoxElement[]>[...document.querySelectorAll(target)];
  } else if(!Array.isArray(target)) {
    usedElements = [target];
  } else {
    usedElements = target;
  }

  for(let element of usedElements) {
    element.style.padding = `${usedOptions.outlineSize}px`;
    element.style.boxSizing = 'border-box';
    element._resizoxOptions = usedOptions;
    element._resizoxData = {};
    element.addEventListener('pointerdown', onPointerDown);
    if(hasUserMouse) {
      element.addEventListener('mousemove', onMouseMove);
    }
  }
}

module.exports = {
  makeResizable,
};