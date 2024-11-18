
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db, collection, getDocs } from '../model/firebase'; // Import Firestore config

function SuggestJobs() {
    const [JobInfor, setJobInfor] = useState([]); // State để lưu trữ dữ liệu từ Firestore

    // Lấy dữ liệu từ Firestore collection "business_infor"
    useEffect(() => {
      const fetchJobInfor = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "job_infor"));
          const JobInforData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setJobInfor(JobInforData);
          
           // Cập nhật state với dữ liệu từ Firestore
        } catch (error) {
          console.error("Error fetching JobInfor info:", error);
        }
      };
  
      fetchJobInfor();
    }, []);
    return (
        <View style={styles.suggestedJobsSection}>
          <Text style={styles.sectionTitle}>Gợi ý việc làm cho bạn</Text>
          <FlatList
            data={JobInfor}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.suggestedJobCard}>
                <Text style={styles.suggestedJobTitle}>{item.Title}</Text>
                <Text style={styles.suggestedJobCompany}>{item.name}</Text>
                <Text style={styles.suggestedJobLocation}>{item.Address}</Text>
                
                <View style={styles.tagContainer}>
                  {item.TechStack?.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.suggestedJobTime}>5 hours ago</Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
    )
}

export default SuggestJobs;
const styles = StyleSheet.create({
    suggestedJobsSection: { marginTop: 20 },
    suggestedJobCard: {
      backgroundColor: '#f5f5f5',
      padding: 15,
      borderRadius: 10,
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      width: 250,
    },
    suggestedJobTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    suggestedJobCompany: { fontSize: 14, color: '#666', marginBottom: 5 },
    suggestedJobLocation: { fontSize: 14, color: '#555', marginBottom: 5 },
    suggestedJobSalary: { fontSize: 14, color: '#555', marginBottom: 10 },
    suggestedJobTime: { fontSize: 12, color: '#888' },
    tagContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
    tag: { backgroundColor: '#e0e0e0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20, marginRight: 5, marginBottom: 5 },
    tagText: { fontSize: 12, color: '#555' },
    timeAgo: { fontSize: 14, color: '#888' },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    sectionDescription: { fontSize: 14, color: '#555', marginBottom: 5 },
})