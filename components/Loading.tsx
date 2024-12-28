import { View, Text, ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'

export default function Loading(props: ActivityIndicatorProps) {
  return (
    <View style={tailwind`flex-1 justify-center items-center`}>
      <ActivityIndicator {...props}/>
    </View>
  )
}