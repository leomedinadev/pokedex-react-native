import React from 'react'
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { PokemonCard } from './PokemonCard'
import { Pokemon } from '../models/Pokemon'

interface PokemonListProps {
  pokemons: Pokemon[],
  loadPokemons?: () => void,
  isNext?: boolean
}

function PokemonList(props: PokemonListProps) {

  const loadMore = () => { props.loadPokemons?.(); }
  return (
    <FlatList 
        data={props.pokemons} 
        numColumns={2} 
        showsVerticalScrollIndicator={false} 
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={ ({item}) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.flatListContentContainer}
        onEndReached={props.isNext ? loadMore : undefined}
        onEndReachedThreshold={0.1}
        ListFooterComponent={props.isNext ? (
          <ActivityIndicator size="large" color="#AEAEAE" style={styles.spinner} />
        ) : null}
    />
  )
}

const styles = StyleSheet.create({
    flatListContentContainer: {
        paddingHorizontal: 5,
        marginTop: 0
        // marginTop: Platform.OS === "android" ? 30 : 0,
      },
      spinner: {
        marginTop: 20,
        marginBottom: 60
        // marginBottom: Platform.OS === "android" ? 90 : 60,
      }
})

export {PokemonList}