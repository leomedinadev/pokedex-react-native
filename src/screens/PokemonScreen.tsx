import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getPokemonDetailsApi } from '../api/pokemon-api-service';
import DetailPokemon from '../components/pokemon/DetailPokemon';
import useAuth from '../hooks/useAuth';
import Favorite from '../components/pokemon/Favorite';
import { PokemonDetail } from '../models/Pokemon';
import { PokemonStackParamList } from '../navigation/types';

type PokemonScreenProps = NativeStackScreenProps<PokemonStackParamList, 'Pokemon'>;

function PokemonScreen(props: PokemonScreenProps) {
  const {navigation, route: {params} } = props;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const {auth} = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Favorite id={params.id} />,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          color="#fff"
          size={20}
          style={{ marginLeft: 20 }}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, params, auth]);

  useEffect(() => {
    ( async() => {
      try {
        setPokemon(await getPokemonDetailsApi(params.id));
      } catch (error) {
        console.error(error);
        navigation.goBack();
      }
    })();
  }, [navigation, params]);

  if (!pokemon) return null;

  return (
    <ScrollView>
      <DetailPokemon pokemon={pokemon} />
    </ScrollView>
  )
}


export {PokemonScreen}
