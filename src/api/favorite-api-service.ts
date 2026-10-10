import AsyncStorage from "@react-native-async-storage/async-storage";
import { includes, pull } from 'lodash';
import { constants } from "../utils/constants";

export async function getPokemonsFavoriteApi(): Promise<number[]> {
  const response = await AsyncStorage.getItem(constants.FAVORITE_STORAGE);
  return JSON.parse(response || "[]");
}

export async function addPokemonFavoriteApi(id: number) {
  const favorites = await getPokemonsFavoriteApi();
  if (includes(favorites, id)) return;
  favorites.push(id);
  await AsyncStorage.setItem(constants.FAVORITE_STORAGE, JSON.stringify(favorites));
}

export async function isPokemonFavoriteApi(id: number) {
  const response = await getPokemonsFavoriteApi();
  return includes(response, id);
}

export async function removePokemonFavoriteApi(id: number) {
  const favorites = await getPokemonsFavoriteApi();
  const newFavorites = pull(favorites, id);
  await AsyncStorage.setItem(constants.FAVORITE_STORAGE, JSON.stringify(newFavorites));
}
