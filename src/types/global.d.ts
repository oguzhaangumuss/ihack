declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      url: string;
    }
  }
}

interface Window {
  spline: {
    viewer: unknown;
    runtime: unknown;
  }
}

export {}; 