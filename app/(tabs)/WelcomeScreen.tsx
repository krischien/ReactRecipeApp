import { StyleSheet, View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tailwind from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the type of your navigation stack
type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
};

// Use this type for navigation
type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  // Type your navigation object
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(() => (ring1Padding.value = withSpring(hp(5))), 100);
    setTimeout(() => (ring2Padding.value = withSpring(hp(5.5))), 300);

    setTimeout(() => navigation.navigate('Home'), 2500); // Ensure the route name matches
  }, [navigation]);

  return (
    <View style={tailwind`flex-1 justify-center items-center space-y-10 bg-amber-500`}>
      <StatusBar style="light" />

      <Animated.View
        style={[
          tailwind`bg-white/20 rounded-full p-10`,
          { padding: ring1Padding },
        ]}
      >
        <Animated.View
          style={[
            tailwind`bg-white/20 rounded-full p-10`,
            { padding: ring2Padding },
          ]}
        >
          <Image
            source={require('../../assets/images/welcome.png')}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      <View style={tailwind`flex items-center space-y-2`}>
        <Text style={[tailwind`font-bold text-white tracking-widest`, { fontSize: hp(7) }]}>
          Foody
        </Text>

        <Text style={[tailwind`font-medium text-white tracking-widest`, { fontSize: hp(2) }]}>
          Food is always right
        </Text>
      </View>
    </View>
  );
}
