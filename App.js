import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, Keyboard, Platform, ToastAndroid } from 'react-native';
import Task from "./components/Task"
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if(task === null || task.trim() === ""){
      ToastAndroid.show("Lütfen geçerli bir değer giriniz", ToastAndroid.SHORT);
    } else {
      setTaskItems([...taskItems, task])
      setTask(null);
    }   
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }


  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#FBAB7E', 'transparent']}
        style={styles.background}
      >
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Yapılacaklar</Text>

          <View style={styles.items}>
            {/* Tasks Here! */}
            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item} />
                  </TouchableOpacity>
                ) 
              })
            }
          </View>
        </View>
        {/* Write a task */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={"Yapılacak bir şey gir!"} value={task} onChangeText={text => setTask(text)} />

          <TouchableOpacity onPress={() => handleAddTask()} > 
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7CE68',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,    
  },
  addText:{
    color: "#55BCF6"
  },
});
