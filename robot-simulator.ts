export class InvalidInputError extends Error {
  constructor(message: string) {
    super()
    this.message = message || 'Invalid Input'
  }
}

type Direction = 'north' | 'east' | 'south' | 'west'
type Coordinates = [number, number]
type Options = { x: number; y: number; direction: Direction }

export class Robot {
  _bearing: Direction = 'north';
  _coordinates: Coordinates = [0, 0];

  get bearing(): Direction {
    return this._bearing
  }

  get coordinates(): Coordinates {
    return this._coordinates
  }

  place(options: Options) {
    if (options.direction !== 'north'
      && options.direction !== 'south'
      && options.direction !== 'east'
      && options.direction !== 'west') {
      throw new InvalidInputError('Invalid direction: ' + options.direction);
    }
    this._coordinates = [options.x, options.y];
    this._bearing = options.direction;
  }

  evaluate(instructions: string) {
    instructions.split('').forEach((instruction) => {
      switch (this._bearing) {
        case 'north':
          if (instruction === 'R') {
            this._bearing = 'east';
          } else if (instruction === 'L') {
            this._bearing = 'west';
          } else if (instruction === 'A') {
            // increase y by one
            this._coordinates = [this._coordinates[0], this._coordinates[1] + 1];
          }
          break;
        case 'east':
          if (instruction === 'R') {
            this._bearing = 'south';
          } else if (instruction === 'L') {
            this._bearing = 'north';
          } else if (instruction === 'A') {
            // increase x by 1
            this._coordinates = [this._coordinates[0] + 1, this._coordinates[1]];
          }
          break;
        case 'south':
          if (instruction === 'R') {
            this._bearing = 'west';
          } else if (instruction === 'L') {
            this._bearing = 'east';
          } else if (instruction === 'A') {
            // decrease y by 1
            this._coordinates = [this._coordinates[0], this._coordinates[1] - 1];
          }
          break;
        case 'west':
          if (instruction === 'R') {
            this._bearing = 'north';
          } else if (instruction === 'L') {
            this._bearing = 'south';
          } else if (instruction === 'A') {
            // decrease x by 1
            this._coordinates = [this._coordinates[0] - 1, this._coordinates[1]];
          }
          break;
        default:
          break;
      }
    })
  }
}
