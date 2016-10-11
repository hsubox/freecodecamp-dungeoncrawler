const health = (state = 100, action) => {
  switch (action.type) {
    case 'CHANGE_HEALTH':
      return max(state + action.amount, 0);
    default:
      return state
  }
}

export default health
