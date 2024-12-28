import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView, Image ,TextInput} from 'react-native';
import tailwind from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline' 
import Categories from '@/components/Categories';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Recipes from '@/components/Recipes';

export default function welcomeScreen() {
  const [activeCategory, setActiveCategory] = useState<string>('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipies();
  }, [])

  const handleChangeCategory = (category: string) => { 
    getRecipies(category);
    setActiveCategory(category); // Setting the category as a string
    setMeals([]);  // Clear the meals
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');

      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const getRecipies = async (category="Beef") => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
       
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StatusBar style='dark'></StatusBar>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} style={tailwind`space-y-6 pt-14`}>
        <View style={tailwind`mx-4 flex-row justify-between item-center mb-2`}>
          <Image source={require('../../assets/images/favicon.png')} style={{ height: hp(5), width: hp(5.5) }}></Image>
          <BellIcon size={hp(4)} color="gray"></BellIcon>
        </View>
 
        <View style={tailwind`mx-4 space-y-2 mb-2`}>
          <Text style={[tailwind`text-neutral-600`, { fontSize: hp(1.7) }]}>Hello, Kristian!</Text>
        </View>

        <View>
          <Text style={[tailwind`font-semibol text-neutral-600 px-5`, { fontSize: hp(3.8) }]}>Make you own food,</Text>
        </View>
        <Text style={[tailwind`font-semibol text-neutral-600 px-5`, { fontSize: hp(3.8) }]}>
          Stay at <Text style={tailwind`text-amber-400`}>Home</Text>
        </Text>
        <View style={tailwind`mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]`} >
          <TextInput placeholder='Search any recipe' placeholderTextColor={'gray'} style={[tailwind`flex-1 text-base mb-1 pl-3 tracking-wider`, { fontSize: hp(1.7) }]}></TextInput>
          <View style={tailwind`bg-white rounded-full p-3`}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray"></MagnifyingGlassIcon>
          </View>
        </View>


        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>

        <View>
          <Recipes meals={meals} categories={categories}></Recipes>
        </View>
      </ScrollView>
    </View>
  );
}
