import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import { firebase } from "./firebaseConfig.js";
import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";
import DisplayImage from "./components/DisplayImage";
import Header from "./components/Header";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [addTasks, setAddTasks] = useState(false);
  const todoRef = firebase.firestore().collection("tasks");

  const addTaskHandler = (taskTitle) => {
    //set Data
    const data = {
      title: taskTitle,
      status: false,
      date: new Date(),
    };

    //Insert data into Firebase
    todoRef.add(data);

    setAddTasks(false);
  };

  const deleteTaskHandler = (taskId) => {
    //Delete document
    todoRef.doc(taskId).delete();
    getFirebaseData();
  };

  const canceltaskAdditionHandler = () => {
    setAddTasks(false);
  };

  //Get firebase data
  const getFirebaseData = () => {
    todoRef.orderBy("date").onSnapshot((querySnapshot) => {
      const getTasksFromFirebase = [];
      if (querySnapshot.size == 0) {
        setTasks([]);
      }
      querySnapshot.forEach((task) => {
        getTasksFromFirebase.push({ ...task.data(), key: task.id });
        setTasks(getTasksFromFirebase);
      });
    });
  };

  // runs on app load, and every time addTasks changes.
  useEffect(() => {
    //get firebase data
    getFirebaseData();
  }, []);

  return (
    <View>
      <Header title="To-Do App"></Header>
      <View style={styles.screen}>
        <Button title="Add New task" onPress={() => setAddTasks(true)}></Button>
        <TodoInput
          visible={addTasks}
          onAddTask={addTaskHandler}
          onCancel={canceltaskAdditionHandler}
        />
      </View>
      <DisplayImage taskStatus={tasks} />

      <View style={styles.screenlist}>
        <FlatList
          data={tasks}
          key={tasks.key}
          renderItem={(itemData) => (
            <TodoItem
              title={itemData.item.title}
              status={itemData.item.status}
              onDelete={deleteTaskHandler}
              id={itemData.item.key}
              key={itemData.item.key}
            />
          )}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 70,
    paddingHorizontal: 70,
  },
  screenlist: {
    marginLeft: 20,
    marginRight: 20,
  },
});
