import React, { useCallback, useState } from 'react'
import useAuth from '../hooks/useAuth';
import { useFocusEffect } from '@react-navigation/native';
import { getPokemonsFavoriteApi } from '../api/favorite-api-service';
import { getPokemonDetailsApi } from '../api/pokemon-api-service';
import NoLogged from '../components/NoLogged';
import { PokemonList } from '../components/PokemonList';
import { Pokemon } from '../models/Pokemon';

function FavoriteScreen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const {auth} = useAuth();

  useFocusEffect(
    useCallback( () => {
      if (auth) {
        (async() => {
          try {
            const response = await getPokemonsFavoriteApi();
            const ids = response.filter((id) => id !== null && id !== undefined);
            setPokemons(await Promise.all(ids.map((id) => getPokemonDetailsApi(id))));
          } catch (error) {
            console.error(error);
          }
        })()
      }
    }, [auth])
  );
  return !auth ? <NoLogged /> : <PokemonList pokemons={pokemons} />;
}

export {FavoriteScreen}
