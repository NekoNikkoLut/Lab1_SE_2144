/// <reference types="react-scripts" />

declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}