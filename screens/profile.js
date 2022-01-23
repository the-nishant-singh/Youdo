import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useAuth } from "../services/auth.service";
import Icon from "react-native-vector-icons/FontAwesome5";

const Profile = (props) => {
  const [user, setUser] = useState({});
  const [pText, setPText] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [hidePassLoad, setHidePassLoad] = useState(false);
  const [oldPass, setoldPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confNewPass, setconfNewPass] = useState("");
  const [oldPassView, setoldPassView] = useState(true);
  const [newPassView, setnewPassView] = useState(true);
  const [confNewPassView, setconfNewPassView] = useState(true);

  const auth = useAuth();

  const initializeProfilePage = async () => {
    const user = await auth.getUser();
    setUser(user);
    setPText(
      `${user.name.first.charAt(0).toUpperCase()}${user.name.last
        .charAt(0)
        .toUpperCase()}`
    );
    setfirstName(user.name.first);
    setlastName(user.name.last);
  }

  useEffect(async () => {
    await initializeProfilePage()
  }, []);


  const handleUpdateProfile = async () => {
    try {
      Keyboard.dismiss();
      if (!loading) {
        setLoading(true);
        const updateData = await auth.UpdateProfile({
          first: firstName,
          last: lastName,
        });
        if (Boolean(updateData)) {
          ToastAndroid.show("Profile Updated", 2000);
          setLoading(false);
          await initializeProfilePage()
        }
      }
    } catch (err) {
      ToastAndroid.show(err.message, 8000);
      setLoading(false);
    }
  };

  const handleChangePassowrd = async () => {
    try {
      Keyboard.dismiss();
      if (!hidePassLoad) {
        setHidePassLoad(true);
        if (newPass !== confNewPass) {
          ToastAndroid.show(
            "New password and confirm password should be same",
            8000
          );
          setHidePassLoad(false);
        } else {
          const updateData = await auth.UpdatePassword(oldPass, newPass);
          if (Boolean(updateData)) {
            ToastAndroid.show("Password Updated", 2000);
            setHidePassLoad(false);
          }
        }
      }
    } catch (err) {
      ToastAndroid.show(err.message, 8000);
      setHidePassLoad(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.SignOut();
      props.navigation.navigate("Login");
    } catch (err) {
      ToastAndroid.show(err.message, 8000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Profile</Text>

      <View style={styles.pimagewrapper}>
        <View style={styles.pimage}>
          <Text style={styles.pimageText}>{pText}</Text>
        </View>
      </View>

      <View style={styles.form}>
        {hidePass ? (
          <View>
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
              style={styles.emailInput}
              placeholder={"Email"}
              value={user.email}
              placeholderTextColor="white"
              editable={false}
            />
          </View>
        ) : (
          <View>
            <View style={styles.passwordWap}>
              <TextInput
                style={styles.input}
                placeholder={"Old Password"}
                value={oldPass}
                onChangeText={(text) => setoldPass(text)}
                placeholderTextColor="white"
                secureTextEntry={oldPassView}
              />
              <Icon
                name={oldPassView ? "eye-slash" : "eye"}
                size={18}
                color="grey"
                onPress={() => setoldPassView(!oldPassView)}
                style={styles.eyeIcon}
              />
            </View>

            <View style={styles.passwordWap}>
              <TextInput
                style={styles.input}
                placeholder={"New Password"}
                value={newPass}
                onChangeText={(text) => setnewPass(text)}
                placeholderTextColor="white"
                secureTextEntry={newPassView}
              />
              <Icon
                name={newPassView ? "eye-slash" : "eye"}
                size={18}
                color="grey"
                onPress={() => setnewPassView(!newPassView)}
                style={styles.eyeIcon}
              />
            </View>

            <View style={styles.passwordWap}>
              <TextInput
                style={styles.input}
                placeholder={"Confirm New Password"}
                value={confNewPass}
                onChangeText={(text) => setconfNewPass(text)}
                placeholderTextColor="white"
                secureTextEntry={confNewPassView}
              />
              <Icon
                name={confNewPassView ? "eye-slash" : "eye"}
                size={18}
                color="grey"
                onPress={() => setconfNewPassView(!confNewPassView)}
                style={styles.eyeIcon}
              />
            </View>
          </View>
        )}
      </View>

      {hidePass ? (
        <View>
          <Pressable
            style={styles.buttonLogin}
            onPress={() => handleUpdateProfile()}
          >
            {!loading ? (
              <Text style={styles.buttonText}>Update Profile</Text>
            ) : (
              <ActivityIndicator color="white" />
            )}
          </Pressable>

          <Pressable
            style={styles.buttonLogin}
            onPress={() => setHidePass(false)}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View>
            <Pressable
              style={styles.buttonLogin}
              onPress={() => handleChangePassowrd()}
            >
              {!hidePassLoad ? (
                <Text style={styles.buttonText}>Change Password</Text>
              ) : (
                <ActivityIndicator color="white" />
              )}
            </Pressable>
            <Pressable
              style={styles.buttonLogin}
              onPress={() => setHidePass(true)}
            >
              <Text style={styles.buttonText}>Update Profile</Text>
            </Pressable>
          </View>
        </>
      )}

      <Pressable style={styles.buttonLogout} onPress={() => handleLogout()}>
        <Text style={styles.buttonLogoutText}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    height: "100%",
    backgroundColor: "black",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  pimageText: {
    color: "white",
    fontSize: 50,
  },
  pimage: {
    backgroundColor: "#38485C",
    borderRadius: 200,
    padding: 50,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  pimagewrapper: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLogin: {
    backgroundColor: "#262626",
    height: 49,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 0.8,
    fontWeight: "bold",
  },
  buttonLogoutText: {
    color: "red",
    fontSize: 16,
    letterSpacing: 0.8,
    fontWeight: "bold",
  },
  buttonLogout: {
    backgroundColor: "#262626",
    height: 49,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderColor: "red",
    borderWidth: 1,
  },
  emailInput: {
    borderWidth: 1,
    height: 50,
    borderColor: "#ccc",
    borderRadius: 8.2,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 35,
    backgroundColor: "black",
    color: "white",
  },
  input: {
    borderWidth: 1,
    height: 50,
    borderColor: "#ccc",
    borderRadius: 8.2,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 35,
    backgroundColor: "#262626",
    color: "white",
  },
  form: {
    marginTop: 30,
  },
  passwordWap: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 17,
  },
});
