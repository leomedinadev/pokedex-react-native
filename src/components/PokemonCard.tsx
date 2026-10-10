import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { getPokemonTypeColor } from '../utils/constants'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { Pokemon } from '../models/Pokemon';

interface PokemonCardProps {
  pokemon: Pokemon
}

function PokemonCard(props: PokemonCardProps) {
  const {pokemon} = props;
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const pokemonColor = getPokemonTypeColor(pokemon.type);
  const bgStyles = {backgroundColor: pokemonColor, ...styles.bgStyles};

  const goToPokemon = () => {
    navigation.navigate('Pokemon', { id: pokemon.id });
  }
  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={bgStyles}>
            <Text style={styles.number}>#{`${pokemon.id}`.padStart(3, '0')}</Text>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Image source={{ uri: pokemon.image}} style={styles.image}/>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130
  },
  spacing: {
    flex: 1,
    padding: 5
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  number: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "#fff",
    fontSize: 11,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10,
  },
  image: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  },
});

export {PokemonCard}