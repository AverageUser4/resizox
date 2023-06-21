import { type ResizoxOptions } from "./types";

export function getGeneralStyle(defaultOptions: ResizoxOptions): string {
  let style = `
    .resizox-container {
      position: relative;

      box-sizing: border-box;
      flex: 0 0 auto;
    }
    .resizox-bar {
      position: absolute;
    }
    .resizox-Bottom {
      left: 0;
      bottom: calc(0px - var(--bar-offset, 0px));
      
      width: 100%;
      height: var(--bar-size, ${defaultOptions.barSize}px);
  
      cursor: s-resize;
    }
    .resizox-Right {
      right: calc(0px - var(--bar-offset, 0px));
      top: 0;
      
      width: var(--bar-size, ${defaultOptions.barSize}px);
      height: 100%;
  
      cursor: e-resize;
    }
    .resizox-BottomRight {
      right: calc(0px - var(--bar-offset, 0px));
      bottom: calc(0px - var(--bar-offset, 0px));

      width: var(--bar-size, ${defaultOptions.barSize}px);
      height: var(--bar-size, ${defaultOptions.barSize}px);
  
      cursor: se-resize;
    }
    .resizox-BottomRight::before, 
    .resizox-BottomRight::after {
      content: '';
      position: absolute;
      display: block;
      background-color: inherit;
    }
    .resizox-BottomRight::before {
      right: 0;
      bottom: 100%;
      
      width: 100%;
      height: 50%;
    } 
    .resizox-BottomRight::after {
      right: 100%;
      bottom: 0;
  
      width: 50%;
      height: 100%;
    }
  `;

  return style;
}