export function useDebounce<T>(value: Ref<T>, delay = 300) {
  const debouncedValue = shallowRef(value.value)
  let timeoutId: ReturnType<typeof setTimeout>

  watch(value, (newValue) => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })

  onScopeDispose(() => clearTimeout(timeoutId))

  return debouncedValue
}
