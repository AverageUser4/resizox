import { type ResizoxOptions, type ResizoxElement, type Direction, type ResizoxBarElement } from "../misc/types";

export function clamp(min: number, actual: number, max: number): number {
  return Math.max(Math.min(actual, max), min);
};

export function getBars(options: ResizoxOptions): ResizoxBarElement[] {
  const { barSize, barOffset } = options;
  const bars: ResizoxBarElement[] = [];
  const directions: Direction[] = ['Bottom', 'Right', 'BottomRight'];
  const colors = ['red', 'green', 'blue'];

  for(let i = 0; i < directions.length; i++) {
    const bar = <ResizoxBarElement>document.createElement('div');
    bar.className = `resizox-bar resizox-${directions[i]}`;
    bar.style.setProperty('--bar-size', `${barSize}px`);
    bar.style.setProperty('--bar-offset', `${barOffset}px`);
    bar.style.backgroundColor = colors[i];
    bar.style.userSelect = 'none';
    bar._resizoxData = { direction: directions[i] };
    bars.push(bar);
  }

  return bars;
}

export function getDirection(event: MouseEvent): Direction {
  const target = <ResizoxElement | ResizoxBarElement>event.target;
  return target._resizoxData?.direction || '';
}

export function getCursorStyle(direction: Direction): string {
  const map = {
    '': '',
    'Bottom': 's',
    'Right': 'e',
    'BottomRight': 'se',
  };

  const mapped = map[direction];
  return mapped && `* { cursor: ${mapped}-resize !important; }`;
}
