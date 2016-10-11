const health = (state = 100, action) => {
  switch (action.type) {
    case 'CHANGE_HEALTH':
      return state + action.amount
    default:
      return state
  }
}

export default health
