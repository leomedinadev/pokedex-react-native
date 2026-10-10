import {afterEach, describe, expect, it, jest} from '@jest/globals';
import {getPokemonDetailsApi} from '../src/api/pokemon-api-service';

const pikachu = {
  id: 25,
  name: 'pikachu',
  order: 35,
  types: [{slot: 1, type: {name: 'electric', url: ''}}],
  stats: [{base_stat: 35, stat: {name: 'hp', url: ''}}],
  sprites: {
    front_default: 'sprite.png',
    other: {'official-artwork': {front_default: 'artwork.png'}},
  },
};

function mockFetch(body: unknown, ok = true, status = 200) {
  global.fetch = jest.fn(async () => ({ok, status, json: async () => body})) as unknown as typeof fetch;
}

describe('pokemon-api-service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('convierte la respuesta de PokeAPI al modelo de la aplicación', async () => {
    mockFetch(pikachu);

    const pokemon = await getPokemonDetailsApi(25);

    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/25');
    expect(pokemon).toMatchObject({id: 25, name: 'pikachu', type: 'electric', image: 'artwork.png'});
  });

  it('usa el sprite básico cuando no hay ilustración oficial', async () => {
    mockFetch({...pikachu, sprites: {front_default: 'sprite.png', other: {'official-artwork': {front_default: null}}}});

    await expect(getPokemonDetailsApi(25)).resolves.toMatchObject({image: 'sprite.png'});
  });

  it('lanza un error cuando la API responde con un estado de error', async () => {
    mockFetch({}, false, 404);

    await expect(getPokemonDetailsApi(99999)).rejects.toThrow('404');
  });
});
