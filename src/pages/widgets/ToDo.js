import { Text, TextInput, View, Animated, PanResponder, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useRef } from 'react';
import { PrivatePageStyles } from "../../../style"
import { LinearGradient } from 'expo-linear-gradient';

export function ToDoWidget () {
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(PanResponder.create(
      { onMoveShouldSetPanResponder: () => true, 
        onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
        onPanResponderRelease: () => {
          pan.extractOffset();
        },
      })
    ).current;
  
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
  
    const handleAddTask = () => {
      if (task) {
          if (editIndex !== -1) {
              const updatedTasks = [...tasks];
              updatedTasks[editIndex] = task;
              setTasks(updatedTasks);
              setEditIndex(-1);
          } else 
              setTasks([...tasks, task]);
          setTask("");
      }
    };
  
    const handleEditTask = (index) => {
      const taskToEdit = tasks[index];
      setTask(taskToEdit);
      setEditIndex(index);
    };
  
    const handleDeleteTask = (index) => {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    };
    
    const renderItem = ({ item, index }) => (
      <View style={PrivatePageStyles.ToDoTask}>
          <Text
              style={PrivatePageStyles.ToDoItemList}>{item}</Text>
          <View
              style={PrivatePageStyles.ToDoTaskButtons}>
              <TouchableOpacity
                  onPress={() => handleEditTask(index)}>
                  <Text
                      style={PrivatePageStyles.ToDoEditButton}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => handleDeleteTask(index)}>
                  <Text
                      style={PrivatePageStyles.ToDoDeleteButton}>C'est fait !</Text>
              </TouchableOpacity>
          </View>
      </View>
  );
  
    return (
        <Animated.View 
          style={[PrivatePageStyles.WidgetToDo, 
                  {transform: [{translateX: pan.x}, {translateY: pan.y}]}
          ]}
          {...panResponder.panHandlers}>
          <LinearGradient
            colors={['#74B9FF', '#6C5CE7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1.5 }}
            style={PrivatePageStyles.WidgetToDoGradient} 
          >
          <TextInput
            style={PrivatePageStyles.ToDoInput}
            placeholder="Ajouter une tâche"
            value={task}
            onChangeText={(text) => setTask(text)}
            onSubmitEditing={handleAddTask}
          >
          </TextInput>
          <TouchableOpacity
            style={PrivatePageStyles.ToDoAddButton}
            onPress={handleAddTask}
          >
            <Text style={PrivatePageStyles.ToDoAddButtonText}>
                {editIndex !== -1 ? "Modifier" : "Ajouter"}
            </Text>
          </TouchableOpacity>
          {
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          }
          </LinearGradient>
        </Animated.View>
    );
}