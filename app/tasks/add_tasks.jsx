import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTasks() {
    const router = useRouter();
    const imageUrl = 'https://i.pinimg.com/236x/79/8f/a5/798fa5a60e05706361958a7d97adc4e8.jpg';

    const [cusName, setCusName] = useState('');
    const [phone, setPhone] = useState('');
    const [area, setArea] = useState('');
    const [noOfStaff, setNoOfStaff] = useState('');
    const [date, setDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        if (Platform.OS === 'web') {
            setDate(event.target.value); // HTML date input value
        } else {
            setShowDatePicker(false);
            if (selectedDate) {
                setDate(selectedDate.toLocaleDateString());
            }
        }
    };

    function create() {
        if (!cusName || !phone || !area || !noOfStaff || !date) {
            if (Platform.OS === 'web') {
                window.alert('Please fill all the fields before submitting');  // For web
            } else {
                Alert.alert('Please fill all the fields before submitting');  // For mobile
            }
            return;
        }

        addDoc(collection(db, "Assign"), {
            cusName: cusName,
            phone: phone,
            area: area,
            noOfStaff: noOfStaff,
            date: date,
        }).then(() => {
            console.log('Data submitted');
            
            // Show success message based on platform
            if (Platform.OS === 'web') {
                window.alert('Task assigned successfully!'); // Web alert
            } else {
                Alert.alert('Success', 'Task assigned successfully!');  // Mobile alert
            }
        }).catch((error) => {
            console.log(error);
            
            // Show error message based on platform
            if (Platform.OS === 'web') {
                window.alert('Error: Something went wrong');  // Web alert
            } else {
                Alert.alert('Error', 'Something went wrong');  // Mobile alert
            }
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#BDD695'}}>
            <Image source={{ uri: imageUrl }}
                style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 2,
                    marginBottom: 5
                }}
            />

            <View style={{ marginTop: 1, padding: 10 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={40} color="black" />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    padding: 10,
                    fontSize: 20
                }}>Assign Tasks</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View>
                    <TextInput value={cusName} onChangeText={setCusName}
                        placeholderTextColor='gray' placeholder='Customer Name....'
                        style={{
                            padding: 15,
                            borderWidth: 1,
                            borderRadius: 5,
                            width: '90%',
                            alignSelf: 'center',
                            fontSize: 17,
                            backgroundColor: '#fff',
                            marginTop: 10,
                            borderColor: '#fff',
                            fontFamily: 'outfit'
                        }}
                    />

                    {/* Conditional Date Picker for Web and Mobile */}
                    {Platform.OS === 'web' ? (
                        <View style={{
                            padding: 15,
                            borderWidth: 1,
                            borderRadius: 5,
                            width: '90%',
                            alignSelf: 'center',
                            backgroundColor: '#fff',
                            marginTop: 10,
                            borderColor: '#fff',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <input 
                                type="date" 
                                value={date || ''} 
                                onChange={handleDateChange} 
                                style={{ 
                                    width: '100%', 
                                    fontSize: 17, 
                                    padding: 10, 
                                    border: 'none', 
                                    outline: 'none',
                                    fontFamily: 'outfit' 
                                }} 
                            />
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            style={{
                                padding: 15,
                                borderWidth: 1,
                                borderRadius: 5,
                                width: '90%',
                                alignSelf: 'center',
                                fontSize: 17,
                                backgroundColor: '#fff',
                                marginTop: 10,
                                borderColor: '#fff',
                                fontFamily: 'outfit',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Text style={{ fontSize: 17, color: date ? 'black' : 'gray' }}>
                                {date || 'Date....'}
                            </Text>
                            <Ionicons name="calendar" size={20} color="gray" />
                        </TouchableOpacity>
                    )}

                    {/* DateTimePicker for mobile only */}
                    {showDatePicker && Platform.OS !== 'web' && (
                        <DateTimePicker
                            value={date ? new Date(date) : new Date()}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}

                    <TextInput value={phone} onChangeText={setPhone}
                        placeholderTextColor='gray' placeholder='Phone....'
                        style={{
                            padding: 15,
                            borderWidth: 1,
                            borderRadius: 5,
                            width: '90%',
                            alignSelf: 'center',
                            fontSize: 17,
                            backgroundColor: '#fff',
                            marginTop: 10,
                            borderColor: '#fff',
                            fontFamily: 'outfit'
                        }}
                    />
                    <TextInput value={area} onChangeText={setArea}
                        placeholderTextColor='gray' placeholder='Area....'
                        style={{
                            padding: 15,
                            borderWidth: 1,
                            borderRadius: 5,
                            width: '90%',
                            alignSelf: 'center',
                            fontSize: 17,
                            backgroundColor: '#fff',
                            marginTop: 10,
                            borderColor: '#fff',
                            fontFamily: 'outfit'
                        }}
                    />
                    <TextInput value={noOfStaff} onChangeText={setNoOfStaff}
                        placeholderTextColor='gray' placeholder='No of staff....'
                        style={{
                            padding: 15,
                            borderWidth: 1,
                            borderRadius: 5,
                            width: '90%',
                            alignSelf: 'center',
                            fontSize: 17,
                            backgroundColor: '#fff',
                            marginTop: 10,
                            borderColor: '#fff',
                            fontFamily: 'outfit'
                        }}
                    />
                </View>
            </ScrollView>

            <View>
                <TouchableOpacity onPress={create}
                    style={{
                        backgroundColor: Colors.BTN,
                        width: '50%',
                        alignSelf: 'center',
                        padding: 15,
                        borderRadius: 5,
                        marginTop: 20,
                        marginBottom: 20
                    }}
                >
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 17,
                        fontFamily: 'outfit-medium'
                    }}>
                        Assign
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
