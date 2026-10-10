export interface Pokemon {
    id: number,
    name: string,
    type: string,
    order: number,
    image: string
}

export interface PokemonType {
    slot: number,
    type: { name: string, url: string }
}

export interface PokemonStat {
    base_stat: number,
    stat: { name: string, url: string }
}

export interface PokemonDetail extends Pokemon {
    types: PokemonType[],
    stats: PokemonStat[]
}
