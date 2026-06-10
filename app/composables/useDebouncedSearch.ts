export function useDebouncedSearch(callback: (value: string) => void, delay = 500) {
  const search = ref('')
  let timer: ReturnType<typeof setTimeout> | undefined

  watch(search, (value) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(value.length >= 2 ? value : ''), delay)
  })

  return search
}
