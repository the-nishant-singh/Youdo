import React, { useState } from "react";
import { View, Text, Pressable , StyleSheet, TextInput, Image, ScrollView, ToastAndroid, ActivityIndicator, Modal } from "react-native";
import { Login, SendResetPassEmail } from '../services/auth.service';
import Icon from 'react-native-vector-icons/FontAwesome5';

const LoginComponent = (props) => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ loadingSendReset, setLoadingSendReset ] = useState(false)
  const [ hidePass, setHidePass ] = useState(true);
  const [ showPassModal, setShowPassModal ] = useState(false);

  const handleSignIn = async () => {
    try{
      if(!loading){
        setLoading(true)
        const loginResponse = await Login(email, password)
        if(Boolean(loginResponse)){
          ToastAndroid.show('Login Sucessfull', 2000)
          setLoading(false)
          props.navigation.navigate('Todos')
        }
      }
    }catch(err){
      ToastAndroid.show(err.message, 8000)
      setLoading(false)
    }
  }

  const handleResetEmailReuest = async () => {
    try{
      if(!loadingSendReset){
        setLoadingSendReset(true)
        const resetResponse = await SendResetPassEmail(email)
        if(Boolean(resetResponse)){
          ToastAndroid.show('Email Sent!', 2000)
          setLoadingSendReset(false)
          setShowPassModal(false)
        }
      }
    }catch(err){
      ToastAndroid.show(err.message, 8000)
      setLoadingSendReset(false)
    }
  }

  const goToRegister = () => {
    props.navigation.navigate('Register')
  }
  
  return (
    <View style={styles.container}>
      <ScrollView >
      <View style={styles.loginSvgWrapper}>
        <Image source={require('../assets/login.png')} style={styles.LoginSvg}/>
      </View>
      <View style={styles.loginWrapper}>
        <Text style={styles.loginTitle}>LOGIN</Text>
        <View style={styles.form}>
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
              size={15}
              color="grey"
              onPress={() => setHidePass(!hidePass)}
              style={styles.eyeIcon}
            />
        </View>
          <Pressable onPress={() => setShowPassModal(true)}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </Pressable>
          <Pressable style={styles.buttonLogin} onPress={() => handleSignIn()}>
            {
              !loading ? (<Text style={styles.buttonText}>LOGIN</Text>) : (<ActivityIndicator color="white"/>)
            }
            </Pressable>
        </View>
      </View>
      <View style={styles.registerWrapper}>
        <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerNowText} onPress={() => goToRegister()}>Register now</Text></Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPassModal}
      >
        <View style={styles.modalContainer} >
        <View style={styles.modalView}>
            <TextInput
            style={styles.input}
            placeholder={"Email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="white"
            
          />
            <View style={styles.modalButtonContainer}>
            <Pressable
              style={styles.buttonReset}
              onPress={() => setShowPassModal(false)}
            >
              <Text style={styles.registerNowText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={styles.buttonReset}
              onPress={() => handleResetEmailReuest(false)}
            >
            {
              !loadingSendReset ? (<Text style={styles.registerNowText}>Send Reset Email</Text>) : (<ActivityIndicator color="white"/>)
            }
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      </ScrollView>
    </View>  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
    paddingTop: 30
  },
  loginWrapper: {
    
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.9
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: "space-around"
  },

  buttonReset: {
    backgroundColor: '#262626',
    height: 40,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  modalView: {
    marginHorizontal: 20,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    borderWidth: 2,
    borderColor: '#ccc',
    opacity:1.5
  },
  loginSvgWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  LoginSvg: {
    marginHorizontal: 'auto',
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
    paddingLeft: 15,
    paddingRight: 35,
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
  forgotPassword: {
    color: 'white',
    textAlign: 'right',
    marginTop: 3.5
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