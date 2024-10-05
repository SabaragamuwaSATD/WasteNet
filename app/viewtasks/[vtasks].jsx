import { View, Text, TouchableOpacity, ScrollView, FlatList, Image, TextInput, Alert, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from './../../configs/FirebaseConfig';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'; // Firebase imports for delete/update
import { Colors } from '../../constants/Colors';
import * as Print from 'expo-print'; // Expo's Print API
import * as Sharing from 'expo-sharing'; // Sharing API
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdowns

export default function ViewTasks() {
  const router = useRouter();
  const [taskList, setTaskList] = useState([]); // To store fetched task data
  const [searchQuery, setSearchQuery] = useState(''); // For search functionality
  const [filteredTaskList, setFilteredTaskList] = useState([]); // To store filtered task data
  const [progressList, setProgressList] = useState({}); // Store task progress
  const [selectedTask, setSelectedTask] = useState(null); // To control dropdown visibility per task
  const [editingTask, setEditingTask] = useState(null); // For editing task details
  const imageUrl = 'https://i.pinimg.com/564x/bc/d4/d8/bcd4d8028a16a6b4e3e0ecbcfd2ca437.jpg';

  useEffect(() => {
    // Fetch task data from Firestore
    const fetchTaskData = async () => {
      try {
        const taskCollection = collection(db, "Assign");
        const taskSnapshot = await getDocs(taskCollection);
        const taskData = taskSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTaskList(taskData); // Set the fetched data to state
        setFilteredTaskList(taskData); // Initialize filtered list with full task data
      } catch (error) {
        console.log('Error fetching task data: ', error);
      }
    };

    fetchTaskData();
  }, []);

  useEffect(() => {
    // Filter task list based on search query
    const filteredList = taskList.filter(task =>
      task.cusName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTaskList(filteredList);
  }, [searchQuery, taskList]);

  // Function to delete a task from Firestore
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'Assign', taskId));
      setTaskList(taskList.filter(task => task.id !== taskId)); // Remove the task from the list

      if (Platform.OS === 'web') {
        window.alert('Task deleted successfully!');
      } else {
        Alert.alert('Success', 'Task deleted successfully!');
      }

    } catch (error) {
      console.log('Error deleting task: ', error);
    }

  };

  // Function to update task progress
  const updateTaskProgress = async (taskId, progress) => {
    try {
      await updateDoc(doc(db, 'Assign', taskId), { progress });
      setProgressList(prev => ({ ...prev, [taskId]: progress })); // Update local progress state
    } catch (error) {
      console.log('Error updating progress: ', error);
    }

  };

  // Function to update task details
  const handleUpdateTask = async () => {
    if (!editingTask) return;

    try {
      await updateDoc(doc(db, 'Assign', editingTask.id), editingTask);
      setTaskList(prevList =>
        prevList.map(task => (task.id === editingTask.id ? editingTask : task))
      );
      setFilteredTaskList(prevList =>
        prevList.map(task => (task.id === editingTask.id ? editingTask : task))
      );
      setEditingTask(null);

      if (Platform.OS === 'web') {
        window.alert('Task updated successfully!');
      } else {
        Alert.alert('Success', 'Task updated successfully!');
      }

    } catch (error) {
      console.log('Error updating task: ', error);
    }


  };

  // Function to create PDF and download
  const createAndDownloadPDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            table, th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Assigned Tasks</h1>
          <table>
            <tr>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Phone</th>
              <th>Area</th>
              <th>No of Staff</th>
              <th>Progress</th>
            </tr>
            ${filteredTaskList.map(task => `
              <tr>
                <td>${task.cusName}</td>
                <td>${task.date}</td>
                <td>${task.phone}</td>
                <td>${task.area}</td>
                <td>${task.noOfStaff}</td>
                <td>${task.progress || 'Not Set'}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log('Error generating PDF: ', error);
    }
  };

  // Toggle dropdown for task
  const toggleDropdown = (taskId) => {
    setSelectedTask(selectedTask === taskId ? null : taskId);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#e6efc9' }}>
      {/* Header Image */}
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 2,
          marginBottom: 5
        }}
      />

      {/* Back Button */}
      <View style={{ marginTop: 1, padding: 10 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#a1a9a4',
        padding: 10,
        marginVertical: 10,
        marginTop: 2,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center'
      }}>
        <Ionicons name="search" size={24} color="black" />
        <TextInput
          placeholder='Search by Name...'
          placeholderTextColor='gray'
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={{
            fontFamily: 'outfit',
            fontSize: 16,
            marginLeft: 10,
            flex: 1
          }}
        />
      </View>

      {/* Title */}
      <View>
        <Text style={{
          fontFamily: 'outfit-bold',
          padding: 10,
          fontSize: 20
        }}>View Progress</Text>
      </View>

      {/* List of Tasks */}
      <ScrollView>
        <FlatList
          data={filteredTaskList}
          keyExtractor={(item) => item.id} // Ensure each list item has a unique key
          renderItem={({ item }) => (
            <>
              {/* Progress Label */}
              <Text style={{ fontFamily: 'outfit-bold', fontSize: 16, marginLeft: 15, marginTop: 10 }}>
                Progress for {item.cusName}:
              </Text>

              {/* Task Details */}
              <View style={{
                backgroundColor: '#fff',
                margin: 10,
                padding: 15,
                borderRadius: 18,
                borderColor: Colors.BTN,
                borderWidth: 1
              }}>
                <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>Customer Name: {item.cusName}</Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>Date: {item.date}</Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>Phone: {item.phone}</Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>Area: {item.area}</Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>No of staff: {item.noOfStaff}</Text>

                {/* Progress Dropdown inside TextInput with Icon */}
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#3B3C8B', // Light blue background
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 10,
                }}>
                  <TextInput
                    value={progressList[item.id] || item.progress || "Not Started"}
                    editable={false}
                    style={{
                      flex: 1,
                      color: '#fff',
                      fontSize: 16,
                      paddingHorizontal: 10,
                    }}
                  />
                  <TouchableOpacity onPress={() => toggleDropdown(item.id)}>
                    <Ionicons name="chevron-down" size={24} color="#000" />
                  </TouchableOpacity>
                </View>

                {/* Actual Picker, conditionally displayed */}
                {selectedTask === item.id && (
                  <Picker
                    selectedValue={progressList[item.id] || item.progress || "Not Started"}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(value) => updateTaskProgress(item.id, value)}
                  >
                    <Picker.Item label="Not Started" value="Not Started" />
                    <Picker.Item label="In Progress" value="In Progress" />
                    <Picker.Item label="Completed" value="Completed" />
                  </Picker>
                )}

                {/* Buttons: Update, Delete */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                  {/* Update Button */}
                  <TouchableOpacity
                    onPress={() => setEditingTask(item)}
                    style={{
                      backgroundColor: '#5F812A',
                      padding: 10,
                      borderRadius: 10,
                      width: '30%',
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'outfit-bold' }}>Update</Text>
                  </TouchableOpacity>

                  {/* Delete Button */}
                  <TouchableOpacity
                    onPress={() => deleteTask(item.id)}
                    style={{
                      backgroundColor: 'red',
                      padding: 10,
                      borderRadius: 10,
                      width: '30%',
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'outfit-bold' }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        />
      </ScrollView>

      {/* PDF Download Button */}
      <View style={{ alignItems: 'center', margin: 20 }}>
        <TouchableOpacity
          onPress={createAndDownloadPDF}
          style={{
            backgroundColor: Colors.BTN,
            padding: 15,
            borderRadius: 10,
            width: '60%',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'outfit-bold' }}>Download</Text>
        </TouchableOpacity>
      </View>

      {/* Update Task Modal */}
      {editingTask && (
        <View style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          right: '10%',
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          elevation: 5
        }}>
          <ScrollView>
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 18 }}>Update Task</Text>
          <TextInput
            placeholder='Customer Name'
            value={editingTask.cusName}
            onChangeText={(text) => setEditingTask(prev => ({ ...prev, cusName: text }))}
            style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
          />
          <TextInput
            placeholder='Date'
            value={editingTask.date}
            onChangeText={(text) => setEditingTask(prev => ({ ...prev, date: text }))}
            style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
          />
          <TextInput
            placeholder='Phone'
            value={editingTask.phone}
            onChangeText={(text) => setEditingTask(prev => ({ ...prev, phone: text }))}
            style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
          />
          <TextInput
            placeholder='Area'
            value={editingTask.area}
            onChangeText={(text) => setEditingTask(prev => ({ ...prev, area: text }))}
            style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
          />
          <TextInput
            placeholder='No of Staff'
            value={editingTask.noOfStaff}
            onChangeText={(text) => setEditingTask(prev => ({ ...prev, noOfStaff: text }))}
            style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
          />
          <TextInput
            placeholder='Progress'
            value={editingTask.progress || "Not Started"}
            onChangeText={(text) => setEditingTask(prev => ({ ...prev, progress: text }))}
            style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
          />
          <TouchableOpacity
            onPress={handleUpdateTask}
            style={{
              backgroundColor: Colors.BTN,
              padding: 10,  // Reduced padding for smaller button
              borderRadius: 5,
              marginVertical: 10,
              width: '60%', // Reduced width for smaller button
              alignItems: 'center',
              alignSelf: 'center' // Centers the button horizontally
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setEditingTask(null)}
            style={{
              backgroundColor:'#FF4D4D',
              padding: 10,  // Reduced padding for smaller button
              borderRadius: 5,
              marginVertical: 10,
              width: '60%', // Reduced width for smaller button
              alignItems: 'center',
              alignSelf: 'center' // Centers the button horizontally
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
