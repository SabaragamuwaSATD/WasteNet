import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-react'

export default function UserIntro() {
    const {user} = useUser();
  return (
    <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:5,
        
        }}>
      <Image source={{uri:user?.imageUrl}}
      style={{
        width:70,
        height:70,
        borderRadius:99
      }}/>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize:18
      }}>Welcome</Text>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize:20
      }}>{user.fullName}</Text>
      <Text style-={{
        fontFamily:'outfit',
        fontSize:16
      }}>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  )
}