import { ById } from "./Selectors";

export function values<V>(object: ById<V>): V[] {
  let result: V[] = []
  for (let key in object) {
    result.push(object[key])
  }
  return result
}

export function groupBy<V>(list: V[], grouper: keyof V): ById<V> {
  const result: ById<V> = {}
  list.forEach(val => {
    const key = val[grouper]
    // TODO: Fix so we must not do a ts-ignore
    // @ts-ignore
    result[key] = val
  })
  return result
}
