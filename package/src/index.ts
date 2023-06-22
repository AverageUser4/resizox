import { type ResizoxContainerElement, type ResizoxOptions, type Target } from "./misc/types";
import { onPointerDown } from "./misc/event-listeners";
import { defaultOptions, canUserHover, cursorStyle } from './misc/data';
import { getGeneralStyle } from "./misc/style";
import { getBars } from "./utils/utils";

if(canUserHover) {
  document.head.append(cursorStyle);
}
const generalStyle = document.createElement('style');
document.head.append(generalStyle);
generalStyle.innerHTML = getGeneralStyle(defaultOptions);

export function makeResizable(elements: HTMLElement[], options: ResizoxOptions): void;
export function makeResizable(element: HTMLElement, options: ResizoxOptions): void;
export function makeResizable(selector: string, options: ResizoxOptions): void;
export function makeResizable(target: Target, options: ResizoxOptions = {}): void {
  let usedElements: ResizoxContainerElement[];
  const usedOptions: ResizoxOptions = { ...defaultOptions, ...options };

  if(typeof target === 'string') {
    usedElements = <ResizoxContainerElement[]>[...document.querySelectorAll(target)];
  } else if(!Array.isArray(target)) {
    usedElements = [target];
  } else {
    usedElements = target;
  }

  for(let element of usedElements) {
    element.classList.add('resizox-container');
    element.append(...getBars(usedOptions))
    if(usedOptions.isConstrained) {
      element.style.maxWidth = '100%';
      element.style.maxHeight = '100%';
    }
    element._resizoxOptions = usedOptions;
    element._resizoxData = { type: 'container' };
    element.addEventListener('pointerdown', onPointerDown);
  }
}