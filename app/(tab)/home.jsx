import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Home/UserIntro'
import MenuList from '../../components/Home/MenuList'


export default function home() {
  const logoImage = require('../../assets/images/d.png');
  return (
    <View style={{
      padding: 20,
      backgroundColor: '#BDD695',
      flex:1
      
    }}>

      {/* Logo */}
  
        <Image
          source={logoImage}
          style={{
            width: '50%', // Adjust the width as needed
            height: 100, // Adjust the height as needed
            resizeMode: 'contain'
          }}
        />

      {/* User Info */}
      <UserIntro/>

      {/* Menu List */}
      <MenuList/>
      
      </View>
  )
}