export const adjHealth = (amount) => {
  return {
    type: 'CHANGE',
    amount
  }
}

export const adjWeapon = (new_weapon) => {
  return {
    type: 'UPGRADE_WEAPON',
    new_weapon
  }
}

const adjDarknessFilter = () => {
  return {
    type: 'TOGGLE_DARKNESS'
  }
}
