import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { getPokemonDetailsByUrlApi, getPokemons } from '../api/pokemon-api-service';
import { PokemonList } from '../components/PokemonList';
import { Pokemon } from '../models/Pokemon';

function PokedexScreen() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    // Evita pedir dos veces la misma página si la lista dispara onEndReached seguido
    const loading = useRef(false);

    useEffect( () => {
        loadPokemons();
    }, []);

    const loadPokemons = async () => {
        if (loading.current) return;
        loading.current = true;
        try {
            const response = await getPokemons(nextUrl ?? undefined);
            const pokemonList = await Promise.all(
                response.results.map((item) => getPokemonDetailsByUrlApi(item.url))
            );
            setPokemons((prev) => [...prev, ...pokemonList]);
            setNextUrl(response.next);
        } catch (error) {
            console.error(error);
        } finally {
            loading.current = false;
        }
    }

    return (
        <SafeAreaView>
            <PokemonList
                pokemons={pokemons}
                loadPokemons={loadPokemons}
                isNext={Boolean(nextUrl)}
            />
        </SafeAreaView>
    )
}

export {PokedexScreen}
