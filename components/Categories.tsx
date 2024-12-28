import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tailwind from 'twrnc';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface CategoriesProps {
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
  categories: Array<{
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }>;
}

const Categories: React.FC<CategoriesProps> = ({ categories, activeCategory, handleChangeCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(1000).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tailwind`space-x-4`}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat) => {
          const isActive = cat.strCategory === activeCategory;
          return (
            <TouchableOpacity
              key={cat.idCategory} // Use a unique key
              style={[tailwind`flex items-center justify-center space-y-1`, { padding: 10 }]}
              onPress={() => handleChangeCategory(cat.strCategory)}
            >
              <View
                style={tailwind`rounded-full p-[6px] ${
                  isActive ? 'bg-amber-400' : 'bg-black/10'
                }`}
              >
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={[tailwind`rounded-full`, { width: hp(6), height: hp(6) }]}
                />
              </View>
              <Text style={[tailwind`text-neutral-600`, { fontSize: hp(1.6) }]}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
