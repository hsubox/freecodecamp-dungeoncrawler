export const weapons = [
  {
    name: 'stick',
    damage: 7
  },
  {
    name: 'hammer',
    damage: 9
  },
  {
    name: 'knife',
    damage: 11
  },
  {
    name: 'axe',
    damage: 13
  },
  {
    name: 'machete',
    damage: 15
  },
]

export const gainHealth = (amount) => {
  return {
    type: 'CHANGE_HEALTH',
    amount
  }
}

export const upgradeWeapon = (weapon) => {
  var index = weapons.map(function(w) { return w.name; }).indexOf(weapon.name);
  var new_weapon = weapons[max(index+1, weapons.length-1)];
  return {
    type: 'UPGRADE_WEAPON',
    weapon: new_weapon
  }
}

const adjDarknessFilter = () => {
  return {
    type: 'TOGGLE_DARKNESS'
  }
}
