import store from '../store'

export function damage(entity, value) {
  store.dispatch({type: 'DAMAGE', entityName: entity, value: value});
}
export function heal(entity, health) {
  store.dispatch({type: 'HEAL', entityName: entity, value: health});
}
export function move(entity, vector) {
  store.dispatch({type: 'MOVE', entityName: entity, vector: vector});
}
export function setLocation(entity, location) {
  store.dispatch({type: 'SET_LOCATION', entityName: entity, location: location});
}
export function switchWeapon(weaponName, attack) {
  store.dispatch({type: 'SWITCH_WEAPON', weapon: weaponName, attack: attack});
}
export function addEntity(entityName, entityType, health, attack, location) {
  store.dispatch({type: 'ADD_ENTITY', entityName: entityName, entityType: entityType,
    health: health, attack: attack, location: location});
}
export function removeEntity(entityName) {
  store.dispatch({type: 'REMOVE_ENTITY', entityName: entityName});
}
export function resetBoard() {
  store.dispatch({type: 'RESET_BOARD'});
}
export function setMap(map) {
  store.dispatch({type: 'SET_MAP', map: map});
}
export function increaseLevel() {
  store.dispatch({type: 'INCREASE_LEVEL'});
}
export function resetLevel() {
  store.dispatch({type: 'RESET_LEVEL'});
}
export function setWindowSize() {
  store.dispatch({type: 'SET_WINDOW_SIZE',
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  });
}
export function gainXp(xp) {
  store.dispatch({type: 'GAIN_XP', xp: xp});
}
export function levelUp(attack, health, xp) {
  store.dispatch({type: 'LEVEL_UP',
    attack: attack,
    health: health,
    toNextLevel: xp
  });
}
export function resetMap(map) {
  store.dispatch({type: 'RESET_MAP', map: map});
}
export function addBoss(attack, health, coords) {
  store.dispatch({type: 'ADD_BOSS', attack: attack, health: health, location: coords});
}
export function toggleDarkness() {
  store.dispatch({type: 'TOGGLE_DARKNESS'});
}
