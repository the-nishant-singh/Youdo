import React, { useState } from "react";
import { View, Text, Pressable , StyleSheet, TextInput, Image, ToastAndroid, ActivityIndicator, Keyboard } from "react-native";
import { useAuth } from '../services/auth.service'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StackActions } from '@react-navigation/native';


const RegisterComponent = (props) => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setfirstName ] = useState('')
  const [ lastName, setlastName ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ hidePass, setHidePass ] = useState(true);

  const auth = useAuth()

  const handleSignIn = async () => {
    try{
      Keyboard.dismiss()
      if(!loading){
        setLoading(true)
        const registerData = await auth.Register(email, password, { first: firstName, last: lastName })
        if(Boolean(registerData)){
          ToastAndroid.show('Registered', 2000)
          setLoading(false)
          props.navigation.dispatch(
            StackActions.replace('Todos')
          );
        }
      }
    }catch(err){
      ToastAndroid.show(err.message, 8000)
      setLoading(false)
    }
  }

  const goToLogin = () => {
    props.navigation.navigate('Login')
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.loginSvgWrapper}>
        <Image source={require('../assets/register.png')} style={styles.LoginSvg}/>
      </View>
      <View style={styles.loginWrapper}>
        <Text style={styles.loginTitle}>Register</Text>
        <View style={styles.form}>
        <TextInput
            style={styles.input}
            placeholder={"First Name"}
            value={firstName}
            onChangeText={(text) => setfirstName(text)}
            placeholderTextColor="white"
          />
        <TextInput
            style={styles.input}
            placeholder={"Last Name"}
            value={lastName}
            onChangeText={(text) => setlastName(text)}
            placeholderTextColor="white"
          />
        <TextInput
            style={styles.input}
            placeholder={"Email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="white"
          />
        <View style={styles.passwordWap}>
        <TextInput
            style={styles.input}
            placeholder={"Password"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="white"
            secureTextEntry={hidePass}
          />
          <Icon
              name={hidePass ? 'eye-slash' : 'eye'}
              size={18}
              color="grey"
              onPress={() => setHidePass(!hidePass)}
              style={styles.eyeIcon}
            />
        </View>
          <Pressable style={styles.buttonLogin} onPress={() => handleSignIn()}>
            {
              !loading ? (<Text style={styles.buttonText}>Register</Text>) : (<ActivityIndicator color="white"/>)
            }
            </Pressable>
        </View>
      </View>
      <View style={styles.registerWrapper}>
        <Text style={styles.registerText}>Already have a account? <Text style={styles.registerNowText} onPress={() => goToLogin()}>Login here</Text></Text>
      </View>
    </View>  );
};

export default RegisterComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
    paddingTop: 60,
    opacity: 69,
  },
  loginWrapper: {
    
  },
  loginSvgWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  LoginSvg: {
    marginHorizontal: 'auto',
    width: 250,
    height: 218
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
    marginTop: 16,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    height: 50,
    borderColor: '#ccc',
    borderRadius: 8.2,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#262626',
    color: 'white',
  },
  form: {
    marginHorizontal: 32,
    marginTop: 18,
    
  },
  passwordWap: {
    position: "relative"
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 17
  },
  buttonLogin: {
    backgroundColor: '#262626',
    height: 49,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 0.8,
    fontWeight: 'bold'
  },
  registerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
    marginTop: 10
  },
  registerNowText: {
    color: 'white',
  },
})