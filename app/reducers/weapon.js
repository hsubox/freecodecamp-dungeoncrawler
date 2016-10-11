const weapon = (state = 'stick', action) => {
  switch (action.type) {
    case 'UPGRADE_WEAPON':
      return action.new_weapon
    default:
      return state
  }
}
export default weapon
