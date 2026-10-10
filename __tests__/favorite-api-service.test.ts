import AsyncStorage from '@react-native-async-storage/async-storage';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {
  addPokemonFavoriteApi,
  getPokemonsFavoriteApi,
  isPokemonFavoriteApi,
  removePokemonFavoriteApi,
} from '../src/api/favorite-api-service';

describe('favorite-api-service', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('devuelve una lista vacía cuando no hay favoritos guardados', async () => {
    await expect(getPokemonsFavoriteApi()).resolves.toEqual([]);
  });

  it('agrega un pokemon a favoritos', async () => {
    await addPokemonFavoriteApi(25);

    await expect(isPokemonFavoriteApi(25)).resolves.toBe(true);
    await expect(isPokemonFavoriteApi(1)).resolves.toBe(false);
  });

  it('no duplica un pokemon que ya es favorito', async () => {
    await addPokemonFavoriteApi(25);
    await addPokemonFavoriteApi(25);

    await expect(getPokemonsFavoriteApi()).resolves.toEqual([25]);
  });

  it('quita solo el pokemon indicado', async () => {
    await addPokemonFavoriteApi(1);
    await addPokemonFavoriteApi(25);
    await removePokemonFavoriteApi(1);

    await expect(getPokemonsFavoriteApi()).resolves.toEqual([25]);
  });
});
