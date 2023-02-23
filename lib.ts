import { Map, PLANET_ENDPOINT, Operation } from "./types"

export const API = "https://challenge.crossmint.io/api/"
export const candidateId = "c24939b8-55d8-4213-aba2-c071914f6ab8"

/**
  *   Utility function to delay Promises, to prevent
  *   being blocked by the API for sending too many requests.
  */
export const sleeper = (ms: number) => new Promise(res => setTimeout(res, ms))

// get my map and validate it
export async function getMyMap(): Promise<Map> {
    return fetch(API.concat(`map/${candidateId}/goal`), {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(data => data.json())
        .then(json => {
            if (json.error) {
                throw new Error("Failed to get my map: ".concat(json.statusText))
            }
            else {
                return json
            }
        })
}

/**
  *   Change a specific tile of my map on the API,
  *   with either POST or DELETE,
  *   given a `row`, `col`, `method`, generic `PLANET_ENDPOINT` variant.
  *   and a `quality` of the Astral Object.
  *
  *   Example:
  *
  *   ```tsx
  *   const resp = await operation<PLANET_ENDPOINT.POLYANETS>({ row: 0, col: 0  })
  *   ````
  *   `
  */
export const operation = async <T extends PLANET_ENDPOINT = PLANET_ENDPOINT.POLYANETS>({
    method = "POST",
    row,
    col,
    quality,
    planetEndpoint = PLANET_ENDPOINT.POLYANETS,
}: Operation<T>) => {

    let qualityKey = ""

    if (planetEndpoint === PLANET_ENDPOINT.SOLOONS) {
        qualityKey = "color"
    }

    if (planetEndpoint === PLANET_ENDPOINT.COMMETHS) {
        qualityKey = "direction"
    }

    const body = JSON.stringify({
        row,
        column: col,
        candidateId,
        [qualityKey]: quality
    })

    return fetch(API.concat(planetEndpoint), {
        method,
        body,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => {
            if (!resp.ok) {
                console.error(resp)
                console.log(body)
                console.log("quality  ", quality)
                console.log("endpoint ", planetEndpoint)
            }
            else {
                return resp
            }
        })
}
