export function genMessage(langs: Record<string, Record<string, any>>, prefix: string) {
  const obj: Recordable = {};
  flat(obj, langs, prefix)
  return obj;
}
const flat = (obj: Recordable, langs: Record<string, Record<string, any>>, prefix: string) => {

  if (typeof langs === 'string') {
    obj[prefix] = langs
  } else {
    const keys = Object.keys(langs)
    if (keys.length != 0) {
      keys.forEach(key => {
        flat(obj, langs[key], !!prefix ? prefix + '.' + key : key)
      })
    }
  }

}

declare type Recordable<T = any> = Record<string, T>;