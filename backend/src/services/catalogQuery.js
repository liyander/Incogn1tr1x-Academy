function textValue(value) {
  return String(value ?? '').trim().toLowerCase()
}

function searchableText(record, fields) {
  return fields.map((field) => textValue(record[field])).join(' ')
}

function sortValue(value) {
  if (typeof value === 'number') return value
  return textValue(value)
}

export function selectCatalog(records, query = {}, fields = []) {
  const search = textValue(query.search || query.q)
  const category = textValue(query.category)
  const difficulty = textValue(query.difficulty || query.level)
  const sortBy = String(query.sortBy || query.sort || 'title')
  const direction = textValue(query.order) === 'desc' ? -1 : 1

  const selected = records.filter((record) => {
    if (search && !searchableText(record, fields).includes(search)) return false
    if (category && textValue(record.category) !== category) return false
    if (difficulty && textValue(record.difficulty || record.level) !== difficulty) return false
    return true
  })

  if (selected.length > 1) {
    selected.sort((left, right) => {
      const a = sortValue(left[sortBy])
      const b = sortValue(right[sortBy])
      if (typeof a === 'number' && typeof b === 'number') return (a - b) * direction
      return String(a).localeCompare(String(b)) * direction
    })
  }

  const offset = Math.max(0, Math.min(10000, Number.parseInt(query.offset, 10) || 0))
  const limit = Math.max(1, Math.min(100, Number.parseInt(query.limit, 10) || 100))
  return selected.slice(offset, offset + limit).map((record) => structuredClone(record))
}

export function findCatalogItem(records, identifier, keys = ['id']) {
  const needle = textValue(identifier)
  const item = records.find((record) => keys.some((key) => textValue(record[key]) === needle))
  return item ? structuredClone(item) : null
}
