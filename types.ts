/** 
  *   The arrays draw the map from top to bottom,
  *   the first array is the topmost line,
  *   the last array is the bottommost line.
  */
export interface Map {
  goal: string[][]
}

/**
  *   Maps an astral object to it's API endpoint.
  */
export const enum PLANET_ENDPOINT {
  POLYANETS = "polyanets",
  COMMETHS = "comeths",
  SOLOONS = "soloons"
}

/**
  *   Qualities of Tiles. Generic over `PLANET_ENDPOINT`
  *   Soloon -> red, blue, purple, white
  *   Cometh -> up, down
  *   Polyanet -> undefined
  */
export type Quality<T extends PLANET_ENDPOINT> =
  T extends PLANET_ENDPOINT.POLYANETS
  ? never :
  T extends PLANET_ENDPOINT.SOLOONS
  ? "blue" | "red" | "purple" | "white"
  : "up" | "down"

/**
  *   Props of the `operation` function.
  *   Generic over `PLANET_ENDPOINT`
  */
export interface Operation<T extends PLANET_ENDPOINT> {
  row: number | string
  col: number | string
  method?: "DELETE" | "POST"
  planetEndpoint?: PLANET_ENDPOINT
  quality?: Quality<T>
}

/**
  *   Tiles (emojis) of the 2D map (matrix).
  *   The strings follows the format: quality_astralObject
  *   Except for Space and Polyanet.
  */
export const enum TILE {
  SPACE = "SPACE",
  POLYANET = "POLYANET",
  BLUE_SOLOON = "BLUE_SOLOON",
  RED_SOLOON = "RED_SOLOON",
  PURPLE_SOLOON = "PURPLE_SOLOON",
  WHITE_SOLOON = "WHITE_SOLOON",
  UP_COMETH = "UP_COMETH",
  DOWN_COMETH = "DOWN_COMETH",
  RIGHT_COMETH = "RIGHT_COMETH",
  LEFT_COMETH = "LEFT_COMETH",
}
