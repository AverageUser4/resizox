import { type ResizoxOptions, type ResizoxContainerElement, type Direction, type ResizoxBarElement, ResizoxRequiredOptions } from "../misc/types";

export function clamp(min: number, actual: number, max: number): number {
  return Math.max(Math.min(actual, max), min);
};

export function getBars(options: ResizoxRequiredOptions): ResizoxBarElement[] {
  const { barSize, barOffset } = options;
  const bars: ResizoxBarElement[] = [];
  let directions: Direction[] = [];
  if(options.directions === 'All') {
    directions = ['Bottom', 'Top', 'Right', 'Left', 'BottomRight', 'BottomLeft', 'TopRight', 'TopLeft'];
  } else if(options.directions === 'Basic') {
    directions = ['Bottom', 'Right', 'BottomRight'];
  } else {
    directions = options.directions;
  }
  
  const colors = {
    '': '',
    'Bottom': 'rgba(255, 0, 0, 0.7)',
    'Top': 'rgba(255, 0, 0, 0.7)',
    'Left': 'rgba(0, 255, 0, 0.7)',
    'Right': 'rgba(0, 255, 0, 0.7)',
    'BottomRight': 'rgba(0, 0, 255, 0.7)',
    'BottomLeft': 'rgba(0, 0, 255, 0.7)',
    'TopRight': 'rgba(0, 0, 255, 0.7)',
    'TopLeft': 'rgba(0, 0, 255, 0.7)',
  };

  for(let direction of directions) {
    const bar = <ResizoxBarElement>document.createElement('div');
    bar.className = `resizox-bar resizox-${direction}`;
    bar.style.setProperty('--bar-size', `${barSize}px`);
    bar.style.setProperty('--bar-offset', `${barOffset}px`);
    bar.style.userSelect = 'none';
    if(options._debug_isShowBars) {
      bar.style.backgroundColor = colors[direction];
    }
    bar._resizoxData = { 
      type: 'bar',
      direction: direction,
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
    'Top': 'n',
    'Left': 'w',
    'Right': 'e',
    'BottomRight': 'se',
    'BottomLeft': 'sw',
    'TopRight': 'ne',
    'TopLeft': 'nw',
  };

  const mapped = map[direction];
  return mapped && `* { cursor: ${mapped}-resize !important; }`;
}

export function getConstrainedSize(target: ResizoxContainerElement, size: number, sizeType: 'Width' | 'Height', options: ResizoxRequiredOptions): number {
  const targetRect = target.getBoundingClientRect();
  const constrainingRect = options.constrainingElement?.getBoundingClientRect();

  let coord: 'x' | 'y' = sizeType === 'Width' ? 'x' : 'y';

  size = clamp(options[`min${sizeType}`], size, options[`max${sizeType}`]);
  if(constrainingRect) {
    size = Math.min(size, constrainingRect[<'width' | 'height'>sizeType.toLowerCase()] - 
      (targetRect[coord] - constrainingRect[coord]));
  }

  return size;
}