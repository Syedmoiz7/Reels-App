import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Button } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import reelsData from '../assets/reelsData';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { logoutUser } from '../store/authSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AppNavigator';

const { height } = Dimensions.get('window');

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const ReelsScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<AuthNavigationProp>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [currentIndex, setCurrentIndex] = useState(0);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 80 });

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <View style={styles.reelContainer}>
      <Video
        source={{ uri: item.videoUrl }}
        style={styles.video}
        resizeMode="cover"
        repeat
        paused={currentIndex !== index}
      />
      <View style={styles.overlay}>
        <View style={styles.infoContainer}>
          <Text style={styles.username}>@{item.username}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="heart-outline" size={28} color="white" />
            <Text style={styles.iconLabel}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Icon name="chatbubble-outline" size={28} color="white" />
            <Text style={styles.iconLabel}>{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Icon name="arrow-redo-outline" size={28} color="white" />
            <Text style={styles.iconLabel}>{item.shares}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Icon name="ellipsis-vertical" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.logoutContainer}>
        <Button onPress={handleLogout} title="Sign Out" color="red" />
      </View>
      <FlatList
        data={reelsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  logoutContainer: {
    alignItems: 'flex-end',
    // padding: 10,
    position: 'absolute',
    zIndex: 999,
    top: 10,
    right: 10,
  },
  // logoutButton: {
  //   backgroundColor: 'red',
  //   paddingVertical: 6,
  //   paddingHorizontal: 12,
  //   borderRadius: 8,
  // },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reelContainer: {
    height,
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  caption: {
    color: 'white',
  },
  actionContainer: {
    alignItems: 'center',
  },
  iconButton: {
    marginBottom: 16,
    alignItems: 'center',
  },
  iconLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default ReelsScreen;
