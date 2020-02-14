export type MatcherConfig<T> = { label: keyof T; index: number };

/**
 * @template V
 * @param {V} - A generic parameter
 * @return {V}
 */
/**
 * Takes items from an array at a given index and labels them
 *
 * @param {Array<matcher>} matchers
 * @returns {(arr: any[]) => V} A function that will match
 */
export function matcher<V>(matchers: MatcherConfig<V>[]) {
  return function(arr: Array<any>) {
    return matchers.reduce((acc, { label, index }) => {
      acc[label] = arr[index];

      return acc;
    }, {} as V);
  };
}
