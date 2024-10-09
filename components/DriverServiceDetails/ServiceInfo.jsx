import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function ServiceInfo({ service }) {
    return (
        <View>
            <Image
                source={{ uri: service?.imageUrl }}
                style={{
                    width: '100%',
                    height: 400,
                    objectFit: 'cover'
                }}
            />

            <View style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 27
                    }}>
                        {service?.make || service?.customerName}
                    </Text>

                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                        color: Colors.GRAY
                    }}>{service?.name || service?.address}</Text>
                </View>
            </View>
        </View>
    )
}