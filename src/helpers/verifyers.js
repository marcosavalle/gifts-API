export const isEmpty = element => {
  if (typeof element === 'boolean') {
    return false
  } else {
    if (typeof element === 'undefined') {
      return true
    } else if (typeof element === 'number') {
      return false
    } else {
      if (element.trim() === '') {
        return true
      } else {
        return false
      }
    }
  }
}

export const arrayIsEmpty = array => {
  if (Array.isArray(array)) {
    if (array[0]) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
}
