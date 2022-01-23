import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Todos from "./screens/todos";
import LoginComponent from "./screens/login";
import RegisterComponent from "./screens/register";
import Profile from './screens/profile'

import { useAuth } from './services/auth.service';

const Stack = createNativeStackNavigator();

export default Router = () => {
const { authData, loading } = useAuth();

  const AuthStack = () => {
    return (
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Register" component={RegisterComponent} />
      </Stack.Navigator>
    )
  }

  const AppStack = () => {
    return (
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Todos" component={Todos} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    )
  }

  if(loading){
      return (<></>)
  }

  return (
    <NavigationContainer>
       {authData ? <AppStack /> : <AuthStack /> }
    </NavigationContainer>
  );
}
