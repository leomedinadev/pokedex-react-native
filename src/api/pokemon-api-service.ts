import { constants } from "../utils/constants";
import { PokemonDetail, PokemonStat, PokemonType } from "../models/Pokemon";

interface PokemonListResponse {
    next: string | null,
    results: { name: string, url: string }[]
}

async function getJson(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error ${response.status} al consultar ${url}`);
    }
    return await response.json();
}

// Campos de la respuesta de PokeAPI que usa la aplicación
interface PokemonApiResponse {
    id: number,
    name: string,
    order: number,
    types: PokemonType[],
    stats: PokemonStat[],
    sprites: {
        front_default: string,
        other: { "official-artwork": { front_default: string | null } }
    }
}

// Convierte la respuesta de PokeAPI al modelo que usa la aplicación
function toPokemonDetail(data: PokemonApiResponse): PokemonDetail {
    return {
        id: data.id,
        name: data.name,
        type: data.types[0].type.name,
        types: data.types,
        stats: data.stats,
        order: data.order,
        image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default
    };
}

export async function getPokemons(endpoint?: string): Promise<PokemonListResponse> {
    const url = constants.API_HOST.concat("/pokemon?limit=20&offset=0");
    return await getJson(endpoint || url);
}

export async function getPokemonDetailsByUrlApi(url: string): Promise<PokemonDetail> {
    return toPokemonDetail(await getJson(url));
}

export async function getPokemonDetailsApi(id: number): Promise<PokemonDetail> {
    return toPokemonDetail(await getJson(`${constants.API_HOST}/pokemon/${id}`));
}
