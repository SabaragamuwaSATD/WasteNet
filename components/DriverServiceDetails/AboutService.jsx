import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'

export default function AboutService({ service }) {

    const [readMore, setReadMore] = useState(true)
    return (
        <View style={{
            padding: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 14
            }}>About {service?.name || service?.destination}</Text>

            <Text
                numberOfLines={readMore ? 3 : 20}
                style={{
                    fontFamily: 'outfit',
                    fontSize: 14
                }}>{service?.about}
            </Text>

            <Pressable onPress={() => setReadMore(!readMore)}>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 14,
                    color: Colors.BLUE
                }}>{readMore ? 'Read More' : 'Read Less'}</Text>
            </Pressable>
        </View>
    )
}