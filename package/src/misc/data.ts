import { type ResizoxRequiredOptions, type ResizoxElement } from "./types";

export const defaultOptions: ResizoxRequiredOptions = {
  barSize: 15,
  barOffset: 0,
  minWidth: 50,
  maxWidth: 2000,  
  minHeight: 50,
  maxHeight: 1400,
  isConstrained: false,
  directions: 'Basic',
};

export const resizedElement: { current: ResizoxElement | null } = { current: null };

export const canUserHover = matchMedia('(any-hover: hover)').matches;
export const cursorStyle = document.createElement('style');
