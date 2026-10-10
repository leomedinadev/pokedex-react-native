import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { FavoriteScreen } from '../screens/FavoriteScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { PokemonStackParamList } from './types';


const Stack = createNativeStackNavigator<PokemonStackParamList>();

function FavoriteNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name='Favorite' 
          component={FavoriteScreen} 
          options={{ title: "Favoritos"}} 
        />
        <Stack.Screen 
          name='Pokemon' 
          component={PokemonScreen} 
          options={{
            title: "",
            headerTransparent: true,
          }}
        />
    </Stack.Navigator>
  )
}

export {FavoriteNavigation}