declare module 'colorthief' {
  type Color = [number, number, number];
  export default class ColorThief {
    getColor: (img: HTMLImageElement | null) => Color;

    getPalette: (img: HTMLImageElement | null, colorCount: number, quality: number) => Color[];

    // eslint-disable-next-line @typescript-eslint/ban-types
    getColorFromUrl: (imageUrl: string, callback: Function, quality?: number) => unknown;
  }
}
