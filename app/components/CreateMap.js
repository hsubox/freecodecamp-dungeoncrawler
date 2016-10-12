import _ from 'lodash'
import { tileType } from '../constants/index'

// MAP GENERATOR
// Returns a matrix of the given dimensions with the number of rooms specified
function createMap(width = 100, height = 100, maxRoomSize = 20, minRoomSize = 6, maxHallLength = 5, numRooms = 20, roomChance = .75) {
  // init grid of walls
  let map = _.fill(Array(width), 0);
  const blankCol = _.fill(Array(height),tileType.WALL);
  map = map.map(() => blankCol.slice());

  // create first room
  fillRect(map, {x: 45, y: 45}, {x: 10, y: 10}, tileType.FLOOR);

  // create rooms
  for (let i = 0; i < numRooms; i++) {
    placeRoom(map);
  }

  return map;

  // map is a grid, startCoord is an object like {x: 13, y: 15}
  // size is an object like {x: 5, y: 7}, fillVal is an int
  function fillRect(map, startCoord, size, fillVal) {
    for (let i = startCoord.x; i < startCoord.x + size.x; i++) {
      _.fill(map[i],fillVal, startCoord.y, size.y + startCoord.y);
    }
    return map;
  }

  // Will keep trying to place random rooms in random places until it succeeds.
  function placeRoom(map) {
    let wall, width, height, isRoom, startX, startY, coords, numClear;
    while (true) {
      // Create random location and room
      // TODO - Choose wall or hall
      numClear = 0;
      wall = findWall(map);
      coords = wall.coords;
      width = Math.floor((Math.random() * (maxRoomSize - minRoomSize)) + minRoomSize);
      height = Math.floor((Math.random() * (maxRoomSize - minRoomSize)) + minRoomSize);
      switch (wall.openDir) {
        case 'right':
          startX = coords.x - width;
          startY = (coords.y - Math.floor(height / 2)) + getDoorOffset(height);
          break;
        case 'left':
          startX = coords.x + 1;
          startY = (coords.y - Math.floor(height / 2)) + getDoorOffset(height);
          break;
        case 'top':
          startX = (coords.x - Math.floor(width / 2)) + getDoorOffset(width);
          startY = coords.y + 1;
          break;
        case 'bottom':
          startX = (coords.x - Math.floor(width / 2)) + getDoorOffset(width);
          startY = coords.y - height;
          break;
        default:
          break;
      }
      // Exit if room would be outside matrix
      if (startX < 0 || startY < 0 || startX + width >= map.length || startY + height >= map[0].length) {
        continue;
      }
      // check if all spaces are clear
      for (let i = startX; i < startX + width; i++) {
        if (map[i].slice(startY, startY + height).every(tile => tile === tileType.WALL)) {
          numClear++;
        }
      }
      if (numClear === width) {
        fillRect(map, {x: startX, y: startY}, {x: width, y: height}, tileType.FLOOR);
        map[coords.x][coords.y] = 1;
        return map;
      }
    }

    function getDoorOffset(length) {
      return Math.floor((Math.random() * length) - Math.floor((length - 1 ) / 2));
    }
  }

  // Loops until it finds a wall tile
  function findWall(map) {
    const coords = {x: 0, y: 0};
    let wallDir = false;
    do {
      coords.x = Math.floor(Math.random() * map.length);
      coords.y = Math.floor(Math.random() * map[0].length);
      wallDir = isWall(map, coords);
    } while (!wallDir);

    return {coords: coords, openDir: wallDir};
  }

  // Takes a map matrix and a coordinate object
  // Returns false if not a wall, otherwise the direction of the open tile
  function isWall(map, coords) {
    // return false if tile isn't wall
    if (map[coords.x][coords.y] !== tileType.WALL) { return false; }
    // left is open
    if (typeof map[coords.x - 1] !== 'undefined' && map[coords.x - 1][coords.y] === tileType.FLOOR) {
      return 'left';
    }
    // right is open
    if (typeof map[coords.x + 1] !== 'undefined' && map[coords.x + 1][coords.y] === tileType.FLOOR) {
      return 'right';
    }
    // top is open
    if (map[coords.x][coords.y - 1] === tileType.FLOOR) {
      return 'top';
    }
    // bottom is open
    if (map[coords.x][coords.y + 1] === tileType.FLOOR) {
      return 'bottom';
    }

    return false;
  }
}

export default createMap
