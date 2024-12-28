import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { mealdata } from '@/constants/categories';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './Loading';
import { CachedImage } from '@/app/helpers/image';
import { useNavigation } from '@react-navigation/native';

interface MealData {
    idMeal: string;
    strMeal: string;
    strMealThumb: string; 
}

interface RecipesProp {
    categories: Array<string>;
    meals: Array<{
        idMeal: string;
        strMeal: string;
        strMealThumb: string; 
    }>;
}

const Recipes: React.FC<RecipesProp> = ({ categories, meals }) => {
    
    const navigation = useNavigation();
    return (
        <View style={tailwind`mx-4 space-y-3`}>
            <Text style={[tailwind`font-semibold text-neutral-600`, { fontSize: hp(3) }]}>Recipes</Text>

            <View>
                {
                    
                    categories.length == 0 ||  meals.length == 0 ? (
                        <Loading size={'large'} style={tailwind`mt-20`}/>
                    ) : (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item): string => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <CardItem item={item} index={i}  navigation = {navigation}/>}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        >

                        </MasonryList>
                    )
                }
            </View>
        </View>
    )
}



const CardItem = ({ item, index, navigation }: { item: MealData; index: number, navigation:any}) => {
    let isEven = index % 2 === 0;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(1000).springify().damping(12)}>
            <Pressable style={[tailwind`flex justify-center mb-4 space-y-1`, { width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }]} 
            onPress={() => navigation.navigate('RecipeDetail', {...item})}>
                {/* <Image source={{ uri: item.strMealThumb }} style={[tailwind`bg-black/5`, { width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }]} /> */}
                <CachedImage  uri={item.strMealThumb } style={[tailwind`bg-black/5`, { width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }]} sharedTransitionTag={item.strMeal}/>
                <Text style={[tailwind`font-semibold ml-2  text-neutral-600`, { fontSize: hp(1.5) }]}>
                    {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
                </Text>
            </Pressable>
        </Animated.View>
    )
}

export default Recipes;