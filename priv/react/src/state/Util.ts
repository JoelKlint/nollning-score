import { ById } from "./Selectors";

export function values<V>(object: ById<V>): V[] {
  let result: V[] = []
  for (let key in object) {
    result.push(object[key] as V)
  }
  return result
}

export function asDict<V>(list: V[], grouper: keyof V): ById<V> {
  const result: ById<V> = {}
  return list.reduce((acc, cur) => {
    const groupKey = cur[grouper] as any
    acc[groupKey] = cur
    return acc
  }, result)
}

export function groupBy<V>(list: V[], grouper: keyof V): ById<V[]> {
  let result: ById<V[]> = {}
  return list.reduce((acc, cur) => {
    const groupKey = cur[grouper] as any
    let arr = acc[groupKey] || []
    if (!acc[groupKey]) {
      acc[groupKey] = arr
    }
    arr.push(cur)
    return acc
  }, result)
}
