import Fuse from 'fuse.js'
import moment from 'moment'

export const filterItems = (items, filter, filterBy) => {
  if (filter.trim().length === 0) {
    return items
  }
  return items.filter(
    filterItem =>
      filterItem[filterBy].toLowerCase().search(filter.toLowerCase()) !== -1,
  )
}

/**
 * Formatting date. Detects if date is UTC string
 */
export const formatDate = (date: number | string, format = 'LLL'): string => {
  if (typeof date === 'string') {
    return moment(date).format(format)
  }
  return moment(date * 1000).format(format)
}

//TODO @Vojo i should make types for arguments here
export const searchWithFuse = (array, option, query) => {
  const fuse = new Fuse(array, option)
  const searchResult = fuse.search(query)

  return searchResult.map(result => {
    return result.item
  })
}
export const getResultsWithFuseSearch = (
  array,
  options1,
  options2,
  searchTerm,
  selectedFilter,
  filterOptions,
) => {
  if (selectedFilter) {
    const filterResult: any = searchWithFuse(array, options2, selectedFilter)
    if (searchTerm) {
      return searchWithFuse(filterResult, options1, searchTerm)
    } else {
      return filterResult
    }
  }
  if (searchTerm) {
    const manualFilter = filterOptions.find(
      key => key.label.toLowerCase() === searchTerm.toLowerCase(),
    )

    if (manualFilter) {
      return searchWithFuse(array, options2, manualFilter.value)
    } else {
      return searchWithFuse(array, options1, searchTerm)
    }
  } else {
    return array
  }
}

export const TestNamings = name => {
  switch (name) {
    case 'unit':
      return 'Unit'
    case 'integration':
      return 'Integration'
    case 'api':
      return 'API tests'
    case 'benchmark':
      return 'Benchmark'
    case 'e2e':
      return 'End-to-End'
    case 'pass':
      return 'Passing tests'
    case 'fail':
      return 'Failing tests'
    case 'missing':
      return 'Missing tests'
    default:
      return name
  }
}
