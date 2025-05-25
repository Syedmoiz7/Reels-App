// src/screens/ReelScreen.tsx
import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Video from 'react-native-video';
import { useState } from 'react';

interface Reel {
  id: string;
  uri: string;
}

const mockReels: Reel[] = [
  { id: '1', uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '2', uri: 'https://www.w3schools.com/html/movie.mp4' },
  { id: '3', uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

const { height } = Dimensions.get('window');

const ReelScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 80 });

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const renderItem = ({ item, index }: { item: Reel; index: number }) => (
    <View style={styles.reelContainer}>
      <Video
        source={{ uri: item.uri }}
        style={styles.video}
        resizeMode="cover"
        repeat
        paused={currentIndex !== index}
      />
    </View>
  );

  return (
    <FlatList
      data={mockReels}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={height}
      decelerationRate="fast"
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
    />
  );
};

const styles = StyleSheet.create({
  reelContainer: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default ReelScreen;
