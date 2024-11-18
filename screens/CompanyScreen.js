// Import Firebase configuration và các hàm Firestore cần thiết
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AnimatedCarousel from '../components/SlideShow';

import { db, collection, getDocs } from '../model/firebase'; // Import Firestore config
import Search from '../components/Search';

const CompanyScreen = ({navigation}) => {
  const [businessInfo, setBusinessInfo] = useState([]); // State để lưu trữ dữ liệu từ Firestore

  // Lấy dữ liệu từ Firestore collection "business_infor"
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "business_infor"));
        const businessData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBusinessInfo(businessData);
        
         // Cập nhật state với dữ liệu từ Firestore
      } catch (error) {
        console.error("Error fetching business info:", error);
      }
    };

    fetchBusinessInfo();
  }, []);

  // Lấy dữ liệu từ API Job
  function handlePress(item) {
    navigation.navigate("CompanyDetail", { jobData: item }); 
  }

  return (
    <FlatList
      data={ businessInfo} // Hiển thị dữ liệu từ Firestore nếu không có dữ liệu từ API
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <>
          <Search/>
          <AnimatedCarousel />
          <Text style={{ padding: 15, fontSize: 18, color: '#e74c3c' }}>Hot for you</Text>
        </>
      )}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity style={styles.jobContainer} onPress={() => handlePress(item) }>
            <View style={styles.row}>
              <Image 
                source={{ uri: item.Logo|| 'https://via.placeholder.com/50' }} 
                style={styles.companyImage} 
              />
              <View style={styles.textContainer}>
                <Text style={styles.jobCompany}>{item.name || 'Unknown Company'}</Text>
                <Text style={styles.jobTitle}>{item.Slogan || 'No Title'}</Text>
                <Text style={styles.jobLocation}>{item.Country || 'No Location'}</Text>
                <View style={styles.tagsContainer}>
                  {item.Skill?.map((tag, index) => (
                    <Text key={index} style={styles.tag}>
                      {tag}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  jobContainer: {
    padding: 15,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
  },
  jobCompany: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 16,
    color: '#e74c3c',
  },
  jobLocation: {
    color: '#888',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  companyImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    margin: 10,
    borderRadius: 8,
  },
  searchText: {
    color: '#888',
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    color: '#444',
  },
});

export default CompanyScreen;
