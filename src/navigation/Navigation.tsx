import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Image, Text } from 'react-native';
import { FavoriteNavigation } from './FavoriteNavigation';
import { PokedexNavigation } from './PokedexNavigation';
import { AccountNavigation } from './AccountNavigation';


const Tab = createBottomTabNavigator();

const colorActive = '#800080';
const colorInactive = '#736AAB';

function Navigation() {
  return (
    <Tab.Navigator initialRouteName='FavoriteNavigation' 
        screenOptions={{
            tabBarActiveTintColor: colorActive,
            tabBarInactiveTintColor: colorInactive,
            headerShown: false,
            tabBarStyle: {
                opacity: 1,
                borderWidth: 0,
                elevation: 0,
                backgroundColor: 'white',
                shadowColor: 'rgba(255,255,255,0.5)'
            }
        }}
    >
        <Tab.Screen
            name="FavoriteNavigation"
            component={FavoriteNavigation}
            options={{
                tabBarLabel: ({ color }) => (<Text style={ {color: color }}>{'Favoritos'}</Text>),
                tabBarIcon: ({ color, size }) => (
                    <Icon name="heart" color={color} size={size} />
                  ),
            }}
         />
        <Tab.Screen
            name='PokedexNavigation'
            component={PokedexNavigation}
            options={{
                headerShown: false,
                tabBarLabel: "",
                tabBarIcon: () => renderPokeball()
            }}
        />
        <Tab.Screen
            name='AccountNavigation'
            component={AccountNavigation}
            options={{
                tabBarLabel: ({ color }) => (<Text style={ {color: color }}>{'Mi cuenta'}</Text>),
                tabBarIcon: ({ color, size }) => (
                    <Icon name="user" color={color} size={size} />
                ),
            }}
        />
    </Tab.Navigator>
  )
}

function renderPokeball() {
    return (
        <Image
            source={require('../assets/mega-bola.png')}
            style={{ width: 75, height: 75, top: -15}}
        />
    );
}

export {Navigation}
