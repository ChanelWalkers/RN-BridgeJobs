import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FavoriteContext } from '../store/context/favorite-context';
export default function JobDetailScreen() {
  const route = useRoute();
  const { jobData } = route.params;
  const jobId = jobData.id;

  const favoriteJobCtx = useContext(FavoriteContext);
  const jobIsFavorite = favoriteJobCtx.ids.includes(jobId);


  function changeFavoriteStatusHandler(){
    if(!jobIsFavorite){
      return favoriteJobCtx.addFavorite(jobId);
    }else{
      return favoriteJobCtx.removeFavorite(jobId);
    }
  }
    const suggestedJobs = [
        { id: '1', title: 'Trung Tâm Đổi Mới Sáng Tạo', company: 'Tổng Công ty Bưu điện Việt Nam', location: 'Quận Nam Từ Liêm, Hà Nội', salary: '15.000 $ to 40.000 $', tags: ['Machine Learning', 'AI', 'PyTorch'], time: '5 hours ago' },
        { id: '2', title: 'Chuyên Viên Kinh Doanh', company: 'Viettel Post', location: 'Quận Cầu Giấy, Hà Nội', salary: '15.000 $ to 40.000 $', tags: ['Sales', 'Business'], time: '1 day ago' },
      ];
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.jobImageContainer}>
          <Image
            source={{ uri: jobData?.Image||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxUS1iz_zXk2ph06jC2_TK-oSFHf3HyYgoWg&s' }} // Thay bằng URL hình ảnh công ty
            style={styles.companyLogo}
          />
        </View>

        <View style={styles.jobInfoContainer}>
          <Text style={styles.jobTitle}>{jobData?.name}</Text>
          <Text style={styles.companyName}>{jobData?.Title}</Text>

          <View style={styles.tagContainer}>
            {jobData.TechStack?.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.timeAgo}>1 day ago</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin</Text>
          <Text style={styles.sectionDescription}>
            <Ionicons name="location-sharp" size={16} color="#555" /> {jobData?.Address}
          </Text>
          <Text style={styles.sectionDescription}>
            <Ionicons name="briefcase" size={16} color="#555" /> {jobData?.Type}
          </Text>
          <Text style={styles.sectionDescription}>
            <Ionicons name="cash-outline" size={16} color="#555" /> Up to 2.000 USD
          </Text>
          <Text style={styles.sectionDescription}>
            <Ionicons name="time-outline" size={16} color="#555" /> {jobData?.Experince}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yêu cầu công việc</Text>
          <Text style={styles.sectionDescription}>
              {jobData?.responsibilities.replace(/;/g, '\n')}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phúc lợi</Text>
          <Text style={styles.sectionDescription}>
              {jobData?.benefits.replace(/;/g, '\n')}
          </Text>
        </View>

        <View style={styles.suggestedJobsSection}>
          <Text style={styles.sectionTitle}>Gợi ý việc làm cho bạn</Text>
          <FlatList
            data={suggestedJobs}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.suggestedJobCard}>
                <Text style={styles.suggestedJobTitle}>{item.title}</Text>
                <Text style={styles.suggestedJobCompany}>{item.company}</Text>
                <Text style={styles.suggestedJobLocation}>{item.location}</Text>
                <Text style={styles.suggestedJobSalary}>{item.salary}</Text>
                <View style={styles.tagContainer}>
                  {item.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.suggestedJobTime}>{item.time}</Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.saveButton} onPress={changeFavoriteStatusHandler}>
          {!jobIsFavorite ? 
            <Text style={styles.saveButtonText}>LƯU</Text>
          :
            <Text style={styles.saveButtonText}>BỎ LƯU</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>ỨNG TUYỂN NGAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { padding: 20 },
    jobImageContainer: { alignItems: 'center', marginBottom: 20 },
    companyLogo: {  width: 70,
      height: 70,
      resizeMode: 'contain',
      marginRight: 10},
    jobInfoContainer: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 10, marginBottom: 15 },
    jobTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    companyName: { fontSize: 16, color: '#666', marginBottom: 10 },
    tagContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
    tag: { backgroundColor: '#e0e0e0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20, marginRight: 5, marginBottom: 5 },
    tagText: { fontSize: 12, color: '#555' },
    timeAgo: { fontSize: 14, color: '#888' },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    sectionDescription: { fontSize: 14, color: '#555', marginBottom: 5 },
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
    bottomNav: { flexDirection: 'row', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#fff' },
    saveButton: { flex: 1, alignItems: 'center', paddingVertical: 15, backgroundColor: '#f5f5f5' },
    saveButtonText: { color: '#555', fontSize: 16 },
    applyButton: { flex: 1, alignItems: 'center', paddingVertical: 15, backgroundColor: Colors.button },
    applyButtonText: { color: '#fff', fontSize: 16 },
  });
  
