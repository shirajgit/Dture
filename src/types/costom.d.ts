// Allow importing .jsx components without explicit declaration files
// This provides a lightweight typing for React components exported from .jsx files
declare module '*.tsx' {
  import type { ComponentType } from 'react';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: ComponentType<any>;
  export default Component;
}