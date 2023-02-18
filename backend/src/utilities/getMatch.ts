import { AnyObj } from '../types/AnyObj';

export function getMatch(single: AnyObj, group: AnyObj[], key: string) {
  return group.find((entry) => entry[key] === single[key]);
}
