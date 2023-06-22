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
  const parentRect = target.parentElement?.getBoundingClientRect();

  if(!parentRect) {
    console.error('ResizoxError: resized element should always have parent element (this should not happen).')
    return;
  }
  if(!target._resizoxOptions || !target._resizoxData) {
    console.error('ResizoxError: _resizoxData and _resizoxOptions should always be set here.');
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
}

export function onPointerUp(event: PointerEvent) {
  resizedElement.current = null;
  cursorStyle.innerHTML = '';
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerup', onPointerUp);
}