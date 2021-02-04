function getItemFromLS (name: string): object {
  const itemValue = localStorage.getItem(name)
  return itemValue === null ? {} : JSON.parse(itemValue)
}

export { getItemFromLS }
