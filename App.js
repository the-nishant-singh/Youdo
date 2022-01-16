import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Todos from "./screens/todos";
import LoginComponent from "./screens/login";
import RegisterComponent from "./screens/register"
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Register" component={RegisterComponent} />
        <Stack.Screen name="Todos" component={Todos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
