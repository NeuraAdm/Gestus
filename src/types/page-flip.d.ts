declare module 'page-flip' {
  export type FlipSetting = {
    width: number;
    height: number;
    size?: 'fixed' | 'stretch';
    showCover?: boolean;
    flippingTime?: number;
    mobileScrollSupport?: boolean;
    usePortrait?: boolean;
    drawShadow?: boolean;
    maxShadowOpacity?: number;
    startPage?: number;
  };

  export class PageFlip {
    constructor(element: HTMLElement, setting: FlipSetting);
    loadFromImages(images: string[]): void;
    on(event: string, callback: (e: unknown) => void): void;
    off(event: string): void;
    destroy(): void;
    flip(page: number): void;
    turnToPage(page: number): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
  }
}
