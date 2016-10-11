import { weapons } from '../actions/index'

const defaultWeapon = weapons[0]

const weapon = (state = defaultWeapon, action) => {
  switch (action.type) {
    case 'UPGRADE_WEAPON':
      return action.new_weapon
    default:
      return state
  }
}
export default weapon
