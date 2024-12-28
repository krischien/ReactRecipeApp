import { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageProps } from "react-native";

interface CachedImageProps extends ImageProps {
  uri: string;
  sharedTransitionTag?: any;
}

export const CachedImage: React.FC<CachedImageProps> = ({ uri, style, sharedTransitionTag, ...props }) => {
  const [cachedSource, setCachedSource] = useState<{ uri: string } | null>(null);

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        // Check if image exists in cache
        const cachedImageData = await AsyncStorage.getItem(uri);

        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData });
        } else {
          // Download the image and convert to Base64
          const response = await fetch(uri);
          const blob = await response.blob();
          const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });

          // Save Base64 image to cache
          await AsyncStorage.setItem(uri, base64Data);
          setCachedSource({ uri: base64Data });
        }
      } catch (error) {
        console.error("Error caching image: ", error);
        setCachedSource({ uri }); // Fallback to original URI
      }
    };

    getCachedImage();
  }, [uri]);

  if (!cachedSource) {
    return <Animated.Text>Loading...</Animated.Text>; // Fallback UI
  }

  return <Animated.Image source={cachedSource} style={style} {...props} />;
};
