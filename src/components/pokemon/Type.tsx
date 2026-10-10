import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { map, capitalize } from 'lodash';
import { getPokemonTypeColor } from '../../utils/constants';
import { PokemonType } from '../../models/Pokemon';

function Type(props: { types: PokemonType[] }) {
  return (
    <View style={styles.content}>
      {map(props.types, (item, index) => (
        <View 
          key={index}
          style={{...styles.pill, backgroundColor: getPokemonTypeColor(item.type.name)}}
          >
            <Text>{capitalize(item.type.name)}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});

export default Type