import React, { useRef } from 'react';
import { View, Text, Image, Animated, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const SPACING = 10;

const data = [
  {
    id: '1',
    image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMWJjSFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--c6975aeb50006aa40670481a18573440a73eacb0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmtCcWpBPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--79eee5883893a012786006950460867831e6f661/46937175_254973108505798_8154454633654255616_n.png',
    companyName: 'Travala.com',
    description: 'Môi trường làm việc thuần theo lối Tây, thoải mái, flexible và chú trọng tới kết quả cuối cùng và của cả một tập thể chứ không phải cá nhân. Cùng nhau giải quyết vấn đề khi có và support lẫn nhau để phát triển. Tasks được tự pick trong...',
    jobs: '3 jobs',
  },
  {
    id: '2',
    image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNHhjSlE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--9713cf0acec3f5cbaf1a60ce0b0bbae4d6f69f99/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmtCcWpBPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--79eee5883893a012786006950460867831e6f661/Logo-SSP-RGB-02-01_sqrt_small.png',
    companyName: 'Scandinavian Software Park',
    description: 'Làm việc với các đồng nghiệp Thụy Điển rất thân thiện. Các bạn nói tiếng Anh trôi chảy, dùng tiếng Anh là ngôn ngữ thứ hai. Mình học được rất nhiều điều tự sự cởi mở và chia sẻ của các bạn. Công việc thì rất chi là ổn nhé. Mình thích...',
    jobs: '5 jobs',
  },
  {
    id: '3',
    image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNHhjSlE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--9713cf0acec3f5cbaf1a60ce0b0bbae4d6f69f99/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmtCcWpBPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--79eee5883893a012786006950460867831e6f661/Logo-SSP-RGB-02-01_sqrt_small.png',
    companyName: 'Scandinavian Software Park',
    description: 'Làm việc với các đồng nghiệp Thụy Điển rất thân thiện. Các bạn nói tiếng Anh trôi chảy, dùng tiếng Anh là ngôn ngữ thứ hai. Mình học được rất nhiều điều tự sự cởi mở và chia sẻ của các bạn. Công việc thì rất chi là ổn nhé. Mình thích...',
    jobs: '5 jobs',
  },
  {
    id: '4',
    image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNHhjSlE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--9713cf0acec3f5cbaf1a60ce0b0bbae4d6f69f99/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmtCcWpBPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--79eee5883893a012786006950460867831e6f661/Logo-SSP-RGB-02-01_sqrt_small.png',
    companyName: 'Scandinavian Software Park',
    description: 'Làm việc với các đồng nghiệp Thụy Điển rất thân thiện. Các bạn nói tiếng Anh trôi chảy, dùng tiếng Anh là ngôn ngữ thứ hai. Mình học được rất nhiều điều tự sự cởi mở và chia sẻ của các bạn. Công việc thì rất chi là ổn nhé. Mình thích...',
    jobs: '5 jobs',
  },
  {
    id: '5',
    image: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNHhjSlE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--9713cf0acec3f5cbaf1a60ce0b0bbae4d6f69f99/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmtCcWpBPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--79eee5883893a012786006950460867831e6f661/Logo-SSP-RGB-02-01_sqrt_small.png',
    companyName: 'Scandinavian Software Park',
    description: 'Làm việc với các đồng nghiệp Thụy Điển rất thân thiện. Các bạn nói tiếng Anh trôi chảy, dùng tiếng Anh là ngôn ngữ thứ hai. Mình học được rất nhiều điều tự sự cởi mở và chia sẻ của các bạn. Công việc thì rất chi là ổn nhé. Mình thích...',
    jobs: '5 jobs',
  },
  // Add more items as needed
];

const AnimatedCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.jobs}>{item.jobs}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
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
        {data.map((_, index) => {
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
