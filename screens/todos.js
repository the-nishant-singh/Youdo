import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Keyboard,
  ScrollView,
  Pressable
} from "react-native";
import Task from "../components/Task"


export default function Todos(props) {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, task]);
    setTask("");
    Keyboard.dismiss();
  };

  const handleTaskCompletition = (index) => {
    let tasksCopy = [...taskItems];
    tasksCopy.splice(index, 1);
    setTaskItems(tasksCopy);
  };

  const goToProfile = () => {
    props.navigation.navigate('Profile')
  }

  return (
    <View style={styles.container}>
      <ScrollView >
      <View style={styles.tasksWrapper}>
        <View style={styles.header}>
        <Text style={styles.sectionTitle}>Todo tasks</Text>
        <Pressable onPress={() => goToProfile()}>
          <Text style={styles.sectionTitle}>Profile</Text>
          </Pressable>
        </View>
        <View style={styles.todosContainer}>
          {taskItems.length < 1 ? (
            <View style={styles.emptyContainer}><Text>No todos found!</Text></View>
          ) : (
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleTaskCompletition(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </View>
      </ScrollView>
      <KeyboardAvoidingView
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: 'space-between',
    flexDirection: "row"
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  todosContainer: {},
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
  emptyContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: "center",
  }
});
