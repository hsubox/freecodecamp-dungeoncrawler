export const damage = (entity, value) => {
  return {
    type: 'DAMAGE',
    entityName: entity,
    value: value
  }
}
export const heal = (entity, health) => {
  return {
    type: 'HEAL',
    entityName: entity,
    value: health
  }
}
export const move = (entity, vector) => {
  return {
    type: 'MOVE',
    entityName: entity,
    vector: vector
  }
}
export const setLocation = (entity, location) => {
  return {
    type: 'SET_LOCATION',
    entityName: entity,
    location: location
  }
}
export const switchWeapon = (weaponName, attack) => {
  return {
    type: 'SWITCH_WEAPON',
    weapon: weaponName,
    attack: attack
  }
}
export const addEntity = (entityName, entityType, health, attack, location) => {
  return {
    type: 'ADD_ENTITY',
    entityName: entityName,
    entityType: entityType,
    health: health,
    attack: attack,
    location: location
  }
}
export const removeEntity = (entityName) => {
  return {
    type: 'REMOVE_ENTITY',
    entityName: entityName
  }
}
export const resetBoard = () => {
  return {
    type: 'RESET_BOARD'
  }
}
export const setMap = (map) => {
  return {
    type: 'SET_MAP',
    map: map
  }
}
export const increaseLevel = () => {
  return {
    type: 'INCREASE_LEVEL'
  }
}
export const resetLevel = () => {
  return {
    type: 'RESET_LEVEL'
  }
}
export const setWindowSize = () => {
  return {
    type: 'SET_WINDOW_SIZE',
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  }
}
export const gainXp = (xp) => {
  return {
    type: 'GAIN_XP',
    xp: xp
  }
}
export const levelUp = (attack, health, xp) => {
  return {
    type: 'LEVEL_UP',
    attack: attack,
    health: health,
    toNextLevel: xp
  }
}
export const resetMap = (map) => {
  return {
    type: 'RESET_MAP',
    map: map
  }
}
export const addBoss = (attack, health, coords) => {
  return {
    type: 'ADD_BOSS',
    attack: attack,
    health: health,
    location: coords
  }
}
export const toggleDarkness = () => {
  return {
    type: 'TOGGLE_DARKNESS'
  }
}
