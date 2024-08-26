declare module 'chroma-js' {
  interface ChromaStatic {
    scale(colors?: string[]): (value: number) => Chroma;
    rgb(): number[];
  }
  const chroma: ChromaStatic;
  export default chroma;
}