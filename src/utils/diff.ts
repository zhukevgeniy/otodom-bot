export function diff<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((el) => !arr2.includes(el));
}
