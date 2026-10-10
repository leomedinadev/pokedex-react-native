import { Text, View, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

function NoLogged() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    return (
      <View style={styles.content}>
         <Text style={styles.text}>
            Para ver esta pantalla tienes que iniciar sesión
        </Text>
        <Button
            title="Ir al login"
            onPress={() => navigation.navigate('AccountNavigation', { screen: 'Account' })}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    content: {
      marginVertical: 50,
      paddingHorizontal: 20,
    },
    text: {
      textAlign: "center",
      marginBottom: 10,
    },
  });

export default NoLogged