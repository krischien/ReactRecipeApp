import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { CachedImage } from '../helpers/image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UserIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import axios from 'axios';
import Loading from '@/components/Loading' 
import YoutubeIframe from 'react-native-youtube-iframe'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

interface RecipeDetailProps {
    route: RouteProp<{ params: { idMeal: string, strMeal: string, strMealThumb: string } }, 'params'>
    navigation: any
}


export default function RecipeDetails({ route, navigation }: RecipeDetailProps) {
    let item = route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const backNavigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMealData(item.idMeal);
    }, []);

    const getMealData = async (id: string) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];

        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }

        return indexes;
    }

    const getYoutubeVideoId = (url: string) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if(match && match[1]){
            return match?.[1];
        }else{
            return undefined;
        }
    }

    return (
        <ScrollView style={tailwind`bg-white flex-1`} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
            <StatusBar style='light' />

            <View style={tailwind`flex-row justify-center`}>
                <CachedImage uri={item.strMealThumb} style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4 }} sharedTransitionTag={item.strMeal}/>
            </View>

            <Animated.View entering={FadeIn.delay(200).duration(1000)} style={tailwind`w-full absolute flex-row justify-between items-center pt-14`}>
                <TouchableOpacity style={tailwind`p-2 rounded-full ml-5 bg-white`} onPress={() => backNavigation.goBack()}>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>
                <TouchableOpacity style={tailwind`p-2 rounded-full mr-5 bg-white`} onPress={() => setIsFavourite(!isFavourite)}>
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "grey"} />
                </TouchableOpacity>
            </Animated.View>

            {
                loading ? (
                    <Loading size="large" style={tailwind`mt-16`} />
                ) : (

                    <View style={tailwind`px-4 flex justify-between space-y-4 pt-8`}>
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={tailwind`space-y-2`}>
                            <Text style={[tailwind`font-bold flex-1 text-neutral-700`, { fontSize: hp(3) }]}>{meal.strMeal}</Text>
                            <Text style={[tailwind`font-medium flex-1 text-neutral-500  mb-5`, { fontSize: hp(2) }]}>{meal.strArea}</Text>
                        </Animated.View>

                        {/* time */}
                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={tailwind`flex-row justify-around`}>
                            <View style={tailwind`flex rounded-full bg-amber-300 p-2`}>
                                <View style={[tailwind`bg-white rounded-full flex items-center justify-center`, { height: hp(6.5), width: hp(6.5) }]}>
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View style={tailwind`flex items-center py-2 space-y-1`}>
                                    <Text style={[tailwind`font-bold text-neutral-400`, { fontSize: hp(2) }]}>35</Text>
                                </View>
                                <View style={tailwind`flex items-center py-2 space-y-1`}>
                                    <Text style={[tailwind`font-bold text-neutral-400`, { fontSize: hp(1.3) }]}>Mins</Text>
                                </View>
                            </View>

                            {/* user */}
                            <View style={tailwind`flex-row justify-around`}>
                                <View style={tailwind`flex rounded-full bg-amber-300 p-2`}>
                                    <View style={[tailwind`bg-white rounded-full flex items-center justify-center`, { height: hp(6.5), width: hp(6.5) }]}>
                                        <UserIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View style={tailwind`flex items-center py-2 space-y-1`}>
                                        <Text style={[tailwind`font-bold text-neutral-400`, { fontSize: hp(2) }]}>03</Text>
                                    </View>
                                    <View style={tailwind`flex items-center py-2 space-y-1`}>
                                        <Text style={[tailwind`font-bold text-neutral-400`, { fontSize: hp(1.3) }]}>Servings</Text>
                                    </View>
                                </View>
                            </View>

                            {/* calories */}
                            <View style={tailwind`flex-row justify-around`}>
                                <View style={tailwind`flex rounded-full bg-amber-300 p-2`}>
                                    <View style={[tailwind`bg-white rounded-full flex items-center justify-center`, { height: hp(6.5), width: hp(6.5) }]}>
                                        <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View style={tailwind`flex items-center py-2 space-y-1`}>
                                        <Text style={[tailwind`font-bold text-neutral-400`, { fontSize: hp(2) }]}>103</Text>
                                    </View>
                                    <View style={tailwind`flex items-center py-2 space-y-1`}>
                                        <Text style={[tailwind`font-bold text-neutral-400`, { fontSize: hp(1.3) }]}>Cal</Text>
                                    </View>
                                </View>
                            </View>

                            {/* difficulty */}
                            <View style={tailwind`flex-row justify-around`}>
                                <View style={tailwind`flex rounded-full bg-amber-300 p-2`}>
                                    <View style={[tailwind`bg-white rounded-full flex items-center justify-center`, { height: hp(6.5), width: hp(6.5) }]}>
                                        <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View style={tailwind`flex items-center py-2 space-y-1`}>
                                        <Text style={[tailwind`font-bold text-neutral-400`, { fontSize: hp(2) }]}></Text>
                                    </View>
                                    <View style={tailwind`flex items-center py-2 space-y-1`}>
                                        <Text style={[tailwind`font-bold text-neutral-400`, { fontSize: hp(1.3) }]}>Easy</Text>
                                    </View>
                                </View>
                            </View>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} style={tailwind`space-y-4`}>
                            <Text style={[tailwind`font-bold flex-1 text-neutral-700 my-5`, { fontSize: hp(2.5) }]}>Ingredients</Text>
                            <View>
                                {
                                    ingredientsIndexes(meal).map(i => {
                                        return (
                                            <View key={i} style={tailwind`flex-row space-x-4`}>
                                                <View style={[tailwind`bg-amber-300 rounded-full`, { height: hp(1.5), width: hp(1.5) }]} />
                                                <View style={tailwind`flex-row space-x-2`}>
                                                    <Text style={[tailwind`font-extrabold text-neutral-700`,{paddingLeft:10, fontSize: hp(1.7)}]}>{meal['strMeasure'+i]}</Text>
                                                    <Text style={[tailwind`font-medium text-neutral-600`,{paddingLeft:10, fontSize: hp(1.7)}]}>{meal['strIngredient'+i]}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} style={tailwind`space-y-4`}>
                            <Text style={[tailwind`font-bold flex-1 text-neutral-700 my-5`, { fontSize: hp(2.5) }]}>Instructions</Text>
                            
                            <Text style={[tailwind`text-neutral-700`,{fontSize: hp(1.6)}]}>
                                {meal.strInstructions}
                            </Text>
                        </Animated.View>
                         {
                            meal.strYoutube && (
                                <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} style={tailwind`space-y-4`}>
                                    <Text style={[tailwind`font-bold flex-1 text-neutral-700 my-5`, {fontSize: hp(2.5)}]}>
                                        Recipe Video
                                    </Text>
                                    <View>
                                        <YoutubeIframe height={hp(30)} videoId={getYoutubeVideoId(meal.strYoutube)}></YoutubeIframe>
                                    </View>
                                </Animated.View>
                            )
                         }           
                    </View>
                )
            }
        </ScrollView>
    )
}