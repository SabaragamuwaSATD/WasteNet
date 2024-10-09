import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ContactInfo({ service }) {

    const router = useRouter()
    return (
        <View style={{
            paddingHorizontal: 20,
            marginHorizontal: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            borderWidth: 1,
            borderRadius: 15,
            padding: 20,
            backgroundColor: Colors.WHITE,
            justifyContent: 'space-between',
            borderColor: Colors.PRIMARY
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <Image
                    source={{ uri: service?.imageDriver || service?.imageManager || service?.imageRouteManager }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 99
                    }}
                />

                <View>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 17
                    }}>{service?.driverName || service?.managerName || service?.routeManagerName}</Text>

                    <Text style={{
                        fontFamily: 'outfit',
                        color: Colors.GRAY
                    }}>{service?.truckDriver || service?.taskManager || service?.routeManager}</Text>
                </View>
            </View>
            <Feather name="send" size={24} color={Colors.PRIMARY} />

            {/* <TouchableOpacity 
                style={[styles.updateBtn, { backgroundColor: Colors.SECONDARY }]}
                onPress={() => router.push(`/forms/UpdateTruck?id=${service.id}`)}>
                <Text style={styles.buttonText}>Update Truck</Text>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    updateBtn: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 50,
    },
    buttonText: {
        fontFamily: 'outfit-medium',
        fontSize: 15,
        textAlign: 'center',
    }
})