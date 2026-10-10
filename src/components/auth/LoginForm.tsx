import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import useAuth from '../../hooks/useAuth';
import { useFormik } from 'formik';
import  * as Yup from "yup";
import {user, userDetails } from '../../utils/userDB';

function LoginForm() {
    const [error, setError] = useState("");
    const { login } = useAuth();

    const formikLogin = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (formValue) => {
          setError("");
          const { username, password } = formValue;
    
          if (username !== user.username || password !== user.password) {
            setError("El usuario o la contraseña no son correctos");
          } else {
            login(userDetails);
          }
        },
      });
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput 
            placeholder='Nombre de usuario' 
            autoCapitalize='none'
            style={styles.input}
            value={formikLogin.values.username}
            onChangeText={(text) => formikLogin.setFieldValue("username", text)}
        />
        <TextInput 
            placeholder='Contraseña' 
            autoCapitalize='none'
            secureTextEntry={true}
            style={styles.input}
            value={formikLogin.values.password}
            onChangeText={(text) => formikLogin.setFieldValue("password", text)}
        />
        <Button 
            title='Entrar'
            onPress={() => formikLogin.handleSubmit()} />

        <Text style={styles.error}>{formikLogin.errors.username}</Text>
        <Text style={styles.error}>{formikLogin.errors.password}</Text>

        <Text style={styles.error}>{error}</Text>
    </View>
  )
}

function initialValues() {
    return {
        username: "",
        password: ""
    }
}

function validationSchema() {
    return {
        username: Yup.string().required("El usuario es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria"),
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 15
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        height: 40
    },
    error: {
        textAlign: "center",
        color: "#f00",
        marginTop: 20
    },
    container: {
        backgroundColor: '#FFF5EE'
    }
});

export default LoginForm