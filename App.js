import React, { useState, useEffect } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, CheckBox } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };

  useEffect(() => {
    
    const currentDate = getCurrentDate();
    if (!tasks[currentDate]) {
      setTasks({ ...tasks, [currentDate]: [] });
    }
  }, [tasks, selectedDate]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const currentDate = getCurrentDate();
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        updatedTasks[currentDate] = [...(updatedTasks[currentDate] || []), { text: newTask, completed: false }];
        return updatedTasks;
      });
      setNewTask('');
    }
  };

  const toggleTask = (date, index) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[date][index].completed = !updatedTasks[date][index].completed;
      return updatedTasks;
    });
  };

  const renderTaskItem = ({ item, index }) => {
    const currentDate = getCurrentDate();
    return (
      <View style={styles.taskItem}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={item.completed}
            onValueChange={() => toggleTask(currentDate, index)}
          />
          <Text style={item.completed ? styles.completedText : styles.taskText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const handleDateChange = (date) => {
    setShowCalendar(false);
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: 'black' }]}>Hello, Antonia</Text>
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Text>{selectedDate.toISOString().split('T')[0]}</Text>
        </TouchableOpacity>
        {showCalendar && (
          <CalendarPicker
            onDateChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.tasksContainer}>
        <Text style={styles.tasksTitle}>Tasks</Text>
        <FlatList
          data={tasks[getCurrentDate()] || []}
          renderItem={renderTaskItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    backgroundColor: '#FFC0CB',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tasksContainer: {
    marginTop: 20,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '',
  },
  taskItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    marginLeft: 10,
  },
  completedText: {
    fontSize: 16,
    marginLeft: 10,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
  },
});