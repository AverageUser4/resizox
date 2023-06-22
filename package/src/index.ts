import { ResizoxRequiredOptions, type ResizoxContainerElement, type ResizoxOptions, type Target } from "./misc/types";
import { onPointerDown } from "./misc/event-listeners";
import { defaultOptions, canUserHover, cursorStyle } from './misc/data';
import { getGeneralStyle } from "./misc/style";
import { clamp, getBars } from "./utils/utils";

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
  const usedOptions: ResizoxRequiredOptions = { ...defaultOptions, ...options };

  if(typeof target === 'string') {
    usedElements = <ResizoxContainerElement[]>[...document.querySelectorAll(target)];
  } else if(!Array.isArray(target)) {
    usedElements = [target];
  } else {
    usedElements = target;
  }
  
  for(let element of usedElements) {
    const rect = element.getBoundingClientRect();
    element.style.width = `${clamp(usedOptions.minWidth, rect.width, usedOptions.maxWidth)}px`;
    element.style.height = `${clamp(usedOptions.minHeight, rect.height, usedOptions.maxHeight)}px`;
    element.classList.add('resizox-container');
    element.append(...getBars(usedOptions))
    element._resizoxOptions = usedOptions;
    element._resizoxData = { type: 'container' };
    element.addEventListener('pointerdown', onPointerDown);
  }
}