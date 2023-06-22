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
      
      width: calc(100% + var(--bar-offset, 0px));
      height: var(--bar-size, ${defaultOptions.barSize}px);
  
      cursor: s-resize;
    }

    .resizox-Top {
      left: 0;
      top: calc(0px - var(--bar-offset, 0px));
      
      width: calc(100% + var(--bar-offset, 0px));
      height: var(--bar-size, ${defaultOptions.barSize}px);
  
      cursor: s-resize;
    }

    .resizox-Right {
      right: calc(0px - var(--bar-offset, 0px));
      top: 0;
      
      width: var(--bar-size, ${defaultOptions.barSize}px);
      height: calc(100% + var(--bar-offset, 0px));
  
      cursor: e-resize;
    }

    .resizox-Left {
      left: calc(0px - var(--bar-offset, 0px));
      top: 0;
      
      width: var(--bar-size, ${defaultOptions.barSize}px);
      height: calc(100% + var(--bar-offset, 0px));
  
      cursor: e-resize;
    }

    .resizox-TopLeft::before, 
    .resizox-TopLeft::after,
    .resizox-TopRight::before, 
    .resizox-TopRight::after,
    .resizox-BottomRight::before, 
    .resizox-BottomRight::after,
    .resizox-BottomLeft::before, 
    .resizox-BottomLeft::after {
      content: '';
      position: absolute;
      display: block;
      background-color: inherit;
    }

    .resizox-BottomRight {
      right: calc(0px - var(--bar-offset, 0px));
      bottom: calc(0px - var(--bar-offset, 0px));

      width: var(--bar-size, ${defaultOptions.barSize}px);
      height: var(--bar-size, ${defaultOptions.barSize}px);
  
      cursor: se-resize;
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

    .resizox-BottomLeft {
      left: calc(0px - var(--bar-offset, 0px));
      bottom: calc(0px - var(--bar-offset, 0px));

      width: var(--bar-size, ${defaultOptions.barSize}px);
      height: var(--bar-size, ${defaultOptions.barSize}px);
  
      cursor: sw-resize;
    }
    .resizox-BottomLeft::before {
      left: 0;
      bottom: 100%;
      
      width: 100%;
      height: 50%;
    } 
    .resizox-BottomLeft::after {
      left: 100%;
      bottom: 0;
  
      width: 50%;
      height: 100%;
    }

    .resizox-TopRight {
      right: calc(0px - var(--bar-offset, 0px));
      top: calc(0px - var(--bar-offset, 0px));

      width: var(--bar-size, ${defaultOptions.barSize}px);
      height: var(--bar-size, ${defaultOptions.barSize}px);
  
      cursor: se-resize;
    }
    .resizox-TopRight::before {
      right: 0;
      top: 100%;
      
      width: 100%;
      height: 50%;
    } 
    .resizox-TopRight::after {
      right: 100%;
      top: 0;
  
      width: 50%;
      height: 100%;
    }


    .resizox-TopLeft {
      left: calc(0px - var(--bar-offset, 0px));
      top: calc(0px - var(--bar-offset, 0px));

      width: var(--bar-size, ${defaultOptions.barSize}px);
      height: var(--bar-size, ${defaultOptions.barSize}px);
  
      cursor: sw-resize;
    }
    .resizox-TopLeft::before {
      left: 0;
      top: 100%;
      
      width: 100%;
      height: 50%;
    } 
    .resizox-TopLeft::after {
      left: 100%;
      top: 0;
  
      width: 50%;
      height: 100%;
    }
  `;

  return style;
}