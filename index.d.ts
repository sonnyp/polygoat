// Type definitions for polygoat 1.1.4
// Project: https://github.com/sonnyp/polygoat
// Definitions by: Rob Moran <https://github.com/thegecko>

export as namespace polygoat;
export = polygoat;

/**
 * Wraps a function to support both callback and promise styles
 * @param fn The function to wrap
 * @param cb The optional callback function
 * @returns Promise to use if a callback isn't supplied
 */
declare function polygoat<T>(
  fn: (done: (err: any, data?: T) => any) => void,
  cb?: (err: any, data: T) => any
): Promise<T>;
