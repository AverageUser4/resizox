import { ResizoxBarElement, type ResizoxElement } from "./types";
import { resizedElement, defaultOptions, cursorStyle, canUserHover } from "./data";
import { getCursorStyle, getDirection, clamp } from "../utils/utils";

export function onPointerDown(event: PointerEvent) {
  const target = <ResizoxElement | ResizoxBarElement>event.currentTarget;

  if(!target._resizoxData) {
    console.error('ResizoxError: _resizoxData should always be set here.');
    return;
  }

  target._resizoxData.direction = getDirection(event);
  
  if(target._resizoxData.direction) {
    resizedElement.current = target;
    // target._resizoxData.offset = {
    //   x: event.offsetX,
    //   y: event.offsetY
    // };
    if(canUserHover) {
      cursorStyle.innerHTML = getCursorStyle(target._resizoxData.direction);
    }
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }
}

export function onPointerMove(event: PointerEvent) {
  if(resizedElement.current) {
    const { clientX, clientY } = event;
    const target = resizedElement.current;
    const targetRect = target.getBoundingClientRect();

    if(!target._resizoxOptions || !target._resizoxData) {
      console.error('ResizoxError: _resizoxData and _resizoxOptions should always be set here.');
      return;
    }

    const options = { ...defaultOptions, ...target._resizoxOptions };

    if(target._resizoxData.direction?.includes('Right')) {
      let newWidth = clientX - targetRect.x;
      // newWidth -= (barSize - barSize.offsetX)
      // newWidth -= barOffset
      newWidth = clamp(options.minWidth, newWidth, options.maxWidth);
      target.style.width = `${newWidth}px`;
    }
    if(target._resizoxData.direction?.includes('Bottom')) {
      let newHeight = clientY - targetRect.y;
      newHeight = clamp(options.minHeight, newHeight, options.maxHeight);
      target.style.height = `${newHeight}px`;
    }
  }
}

export function onPointerUp(event: PointerEvent) {
  resizedElement.current = null;
  cursorStyle.innerHTML = '';
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerup', onPointerUp);
}