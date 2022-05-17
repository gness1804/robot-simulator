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
    throw new Error('Remove this statement and implement this function')
  }
}
