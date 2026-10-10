import React from 'react'
import { View } from 'react-native'
import UserData from '../components/auth/UserData';
import LoginForm from '../components/auth/LoginForm';
import useAuth from '../hooks/useAuth';

function AccountScreen() {
  const {auth} = useAuth();
  return <View style={{backgroundColor: '#FFF5EE'}}>{auth ? <UserData/> : <LoginForm/>}</View>;
}

export {AccountScreen}
