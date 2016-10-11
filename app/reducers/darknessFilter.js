const darknessFilter = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_DARKNESS':
      return !state
    default:
      return state
  }
}

export default darknessFilter
