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
  ScrollView 
} from "react-native";
import Task from "../components/Task"


export default function Todos() {
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

  return (
    <View style={styles.container}>
      <ScrollView >
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Todo tasks</Text>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
