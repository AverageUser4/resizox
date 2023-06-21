export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
export type Target = HTMLElement[] | HTMLElement | string;
export type NonEmptyDirection = 'Bottom' | 'Right' | 'BottomRight';
export type Direction = '' | NonEmptyDirection;
export type ResizoxOptions = {
  barSize?: number,
  barOffset?: number,
  minWidth?: number,
  maxWidth?: number,
  minHeight?: number,
  maxHeight?: number,
  isConstrained?: boolean,
  directions?: NonEmptyDirection[] | 'Basic' | 'All',
};
export type ResizoxRequiredOptions = Concrete<ResizoxOptions>;
export interface ResizoxElement extends HTMLElement {
  _resizoxOptions?: ResizoxOptions,
  _resizoxData?: {
    direction?: Direction,
    offset?: {
      x: number,
      y: number
    },
  },
}
export interface ResizoxBarElement extends HTMLElement {
  _resizoxData?: {
    direction?: Direction,
  },
}