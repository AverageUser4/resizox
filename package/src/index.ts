const { clamp } = require('./utils');

type Target = HTMLElement[] | HTMLElement | string;
type ResizoxOptions = {
  resizeOutlineWidth?: number,
  minWidth?: number,
  maxWidth?: number,
  minHeight?: number,
  maxHeight?: number,
};
interface ResizoxElement extends HTMLElement {
  _resizoxOptions?: ResizoxOptions,
  _resizoxData?: {
    direction?: '' | 'Bottom' | 'Right' | 'BottomRight',
  }
}

const defaultOptions: ResizoxOptions = {
  resizeOutlineWidth: 10,
  minWidth: 50,
  maxWidth: 2000,  
  minHeight: 50,
  maxHeight: 1400,
};

let currentlyResizedElement: ResizoxElement | null = null;

function onPointerDown(event: PointerEvent) {
  const target = <ResizoxElement>event.target;

  if(!target._resizoxOptions || !target._resizoxData) {
    return;
  }
  
  const { offsetX, offsetY } = event;
  const outlineWidth = Number(target._resizoxOptions?.resizeOutlineWidth);
  const targetRect = target.getBoundingClientRect();

  target._resizoxData.direction = '';

  if(offsetY >= targetRect.height - outlineWidth) {
    target._resizoxData.direction += 'Bottom';
  }
  if(offsetX >= targetRect.width - outlineWidth) {
    target._resizoxData.direction += 'Right';
  }
  
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
    element._resizoxOptions = usedOptions;
    element._resizoxData = {};
    element.addEventListener('pointerdown', onPointerDown);
  }
}

module.exports = {
  makeResizable,
};