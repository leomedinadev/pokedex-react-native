// Pantallas de las pilas de navegación (Pokedex y Favoritos comparten el detalle)
export type PokemonStackParamList = {
    Pokedex: undefined,
    Favorite: undefined,
    Pokemon: { id: number }
}
