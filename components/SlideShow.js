import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Animated, FlatList, StyleSheet, Dimensions } from 'react-native';
import { db, collection, getDocs } from '../model/firebase'; // Import Firestore config

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const SPACING = 10;



const AnimatedCarousel = () => {
  const [businessInfo, setBusinessInfo] = useState([]); // State để lưu trữ dữ liệu từ Firestore

  // Lấy dữ liệu từ Firestore collection "business_infor"
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "business_infor"));
        const businessData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBusinessInfo(businessData.slice(8,15));
        
         // Cập nhật state với dữ liệu từ Firestore
      } catch (error) {
        console.error("Error fetching business info:", error);
      }
    };

    fetchBusinessInfo();
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.BackgroundImage }} style={styles.image} />
      <Text style={styles.companyName}>{item.name}</Text>
      <Text style={styles.description}>{item.Slogan}</Text>
      <Text style={styles.jobs}>{Math.floor((Math.random() * 10) + 1)} jobs</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={businessInfo}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_WIDTH + SPACING * 2}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      <View style={styles.pagination}>
        {businessInfo.map((_, index) => {
          const inputRange = [
            (index - 1) * (ITEM_WIDTH + SPACING * 2),
            index * (ITEM_WIDTH + SPACING * 2),
            (index + 1) * (ITEM_WIDTH + SPACING * 2),
          ];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    
    
  },
  card: {
    width: ITEM_WIDTH,
    marginHorizontal: SPACING,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    
    textAlign: 'center'
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
  jobs: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 4,
  },
});

export default AnimatedCarousel;
