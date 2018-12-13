import { Employee, Money } from "../data/types";

export type KeyValueMap<K extends string|number, V> = {
  [k in K]: V
};

export const zipPairs = <K extends string, V>(keys: K[], values: V[]): KeyValueMap<K, V> =>
  keys.reduce((result, key: K, index: number) => {
    result[key] = values[index];
    return result;
  }, {} as KeyValueMap<K, V>);

export const getSalarySum = (employees: Employee[]): Money =>
  employees.reduce((sum: Money, e: Employee) => sum + e.salary, 0);
