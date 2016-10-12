export const tileType = {
  WALL: 0,
  FLOOR: 1
}
export const reverseLookup = ['WALL', 'FLOOR']
export const weaponTypes = [
  {
    entityName: 'brass knuckles',
    entityType: 'weapon',
    health: 0,
    attack: 7
  },
  {
    entityName: 'serrated dagger',
    entityType: 'weapon',
    health: 0,
    attack: 12
  },
  {
    entityName: 'katana',
    entityType: 'weapon',
    health: 0,
    attack: 16
  },
  {
    entityName: 'reaper\'s scythe',
    entityType: 'weapon',
    health: 0,
    attack: 22
  },
  {
    entityName: 'large trout',
    entityType: 'weapon',
    health: 0,
    attack: 30
  }
]
// enemy attacks and health are the dungeon level + 1 times these constants
export const ENEMY = {
  health: 20,
  attack: 12,
  xp: 10
}
export const PLAYER = {
  baseHealth: 100,
  health: 20,
  attack: 12,
  toNextLevel: 60
}
export const ATTACK_VARIANCE = 7
