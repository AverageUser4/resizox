export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
export type Target = HTMLElement[] | HTMLElement | string;
export type NonEmptyDirection = 'Bottom' | 'Top' | 'Right' | 'Left' | 'BottomRight' | 'BottomLeft' | 'TopRight' | 'TopLeft';
export type Direction = '' | NonEmptyDirection;
export type ResizoxOptions = {
  barSize?: number,
  barOffset?: number,
  minWidth?: number,
  maxWidth?: number,
  minHeight?: number,
  maxHeight?: number,
  constrainingElement?: HTMLElement | null,
  directions?: NonEmptyDirection[] | 'Basic' | 'All',
  _debug_isShowBars?: boolean,
};
export type ResizoxRequiredOptions = Concrete<ResizoxOptions>;
export interface ResizoxContainerElement extends HTMLElement {
  _resizoxOptions?: ResizoxOptions,
  _resizoxData?: {
    type: 'container',
    currentDirection?: Direction,
    offset?: {
      x: number,
      y: number
    },
  },
}
export interface ResizoxBarElement extends HTMLElement {
  _resizoxData?: {
    type: 'bar',
    direction?: Direction,
  },
}