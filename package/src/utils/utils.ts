import { type ResizoxOptions, type ResizoxContainerElement, type Direction, type ResizoxBarElement, ResizoxRequiredOptions } from "../misc/types";

export function clamp(min: number, actual: number, max: number): number {
  return Math.max(Math.min(actual, max), min);
};

export function getBars(options: ResizoxOptions): ResizoxBarElement[] {
  const { barSize, barOffset } = options;
  const bars: ResizoxBarElement[] = [];
  const directions: Direction[] = ['Bottom', 'Right', 'BottomRight'];
  const colors = ['rgba(255, 0, 0, 0.7)', 'rgba(0, 255, 0, 0.7)', 'rgba(0, 0, 255, 0.7)'];

  for(let i = 0; i < directions.length; i++) {
    const bar = <ResizoxBarElement>document.createElement('div');
    bar.className = `resizox-bar resizox-${directions[i]}`;
    bar.style.setProperty('--bar-size', `${barSize}px`);
    bar.style.setProperty('--bar-offset', `${barOffset}px`);
    bar.style.userSelect = 'none';
    if(options._debug_isShowBars) {
      bar.style.backgroundColor = colors[i];
    }
    bar._resizoxData = { 
      type: 'bar',
      direction: directions[i],
    };
    bars.push(bar);
  }

  return bars;
}

export function getDirection(event: MouseEvent): Direction {
  const target = <ResizoxContainerElement | ResizoxBarElement>event.target;
  if(target._resizoxData?.type !== 'bar') {
    return '';
  }
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

export function getConstrainedSize(target: ResizoxContainerElement, size: number, sizeType: 'Width' | 'Height', options: ResizoxRequiredOptions): number {
  const targetRect = target.getBoundingClientRect();
  const parentRect = target.parentElement?.getBoundingClientRect();

  if(!parentRect) {
    console.error('ResizoxError: parentRect should always be set here.');
    return 0;
  }

  let coord: 'x' | 'y' = sizeType === 'Width' ? 'x' : 'y';

  size = clamp(options[`min${sizeType}`], size, options[`max${sizeType}`]);
  if(options.isConstrained) {
    size = Math.min(size, parentRect[<'width' | 'height'>sizeType.toLowerCase()] - 
      (targetRect[coord] - parentRect[coord]));
  }

  return size;
}