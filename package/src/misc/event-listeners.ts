import { ResizoxBarElement, type ResizoxContainerElement } from "./types";
import { resizedElement, defaultOptions, cursorStyle, canUserHover } from "./data";
import { getCursorStyle, getDirection, clamp, getConstrainedSize } from "../utils/utils";

export function onPointerDown(event: PointerEvent) {
  const currentTarget = <ResizoxContainerElement>event.currentTarget;
  const target = <ResizoxContainerElement | ResizoxBarElement>event.target;

  if(!currentTarget._resizoxData || target._resizoxData?.type !== 'bar') {
    !currentTarget._resizoxData && console.error('ResizoxError: _resizoxData should always be set here.');
    return;
  }

  resizedElement.current = currentTarget;
  currentTarget._resizoxData.currentDirection = getDirection(event);
  currentTarget._resizoxData.offset = {
    x: event.offsetX,
    y: event.offsetY
  };
  if(canUserHover) {
    cursorStyle.innerHTML = getCursorStyle(currentTarget._resizoxData.currentDirection);
  }
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
}

export function onPointerMove(event: PointerEvent) {
  if(!resizedElement.current) {
    console.error('ResizoxError: resizedElement.current should always be set here.');
    return;
  }

  const { clientX, clientY } = event;
  const target = resizedElement.current;
  const targetRect = target.getBoundingClientRect();

  if(!target._resizoxOptions || !target._resizoxData) {
    console.error('ResizoxError: _resizoxData, _resizoxOptions and _resizoxData.initial should always be set here.');
    return;
  }

  const options = { ...defaultOptions, ...target._resizoxOptions };
  const { barSize, barOffset } = options;

  if(target._resizoxData.currentDirection?.includes('Right')) {
    let newWidth = clientX - targetRect.x;
    newWidth += (barSize - (target._resizoxData.offset?.x || 0));
    newWidth -= barOffset;
    newWidth = getConstrainedSize(target, newWidth, 'Width', options);
    target.style.width = `${newWidth}px`;
  }
  if(target._resizoxData.currentDirection?.includes('Bottom')) {
    let newHeight = clientY - targetRect.y;
    newHeight += (barSize - (target._resizoxData.offset?.y || 0));
    newHeight -= barOffset;
    newHeight = getConstrainedSize(target, newHeight, 'Height', options);
    target.style.height = `${newHeight}px`;
  }

  if(target._resizoxData.currentDirection?.includes('Left')) {
    // let newWidth = clientX - targetRect.x;
    // newWidth += (barSize - (target._resizoxData.offset?.x || 0));
    // newWidth -= barOffset;
    // newWidth = getConstrainedSize(target, newWidth, 'Width', options);
    // target.style.width = `${newWidth}px`;
    let currentLeft = parseInt(target.style.left) || 0;
    let newLeft = currentLeft - (targetRect.x - clientX);

    let newWidth = targetRect.right - clientX;
    if(newWidth > options.maxWidth) {
      console.log(newWidth, options.maxWidth)
      newWidth = options.maxWidth;
      newLeft = currentLeft - (newWidth - targetRect.width);
    }

    target.style.left = `${newLeft}px`;
    target.style.width = `${newWidth}px`;
  }
}

export function onPointerUp(event: PointerEvent) {
  resizedElement.current = null;
  cursorStyle.innerHTML = '';
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerup', onPointerUp);
}