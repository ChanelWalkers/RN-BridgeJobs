import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import SuggestJobs from '../components/SuggestJobs';
export default function CompanyDetailScreen() {
  const route = useRoute();
  const { jobData } = route.params;



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Job Image */}
        <View style={styles.jobImageContainer}>
          <Image
            source={{ uri: jobData?.Logo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxUS1iz_zXk2ph06jC2_TK-oSFHf3HyYgoWg&s' }} // Thay bằng URL hình ảnh công ty
            style={styles.companyLogo}
          />
        </View>

        {/* Job Info */}
        <View style={styles.jobInfoContainer}>
          <Text style={styles.jobTitle}>{jobData?.name}</Text>
          <Text style={styles.companyName}>{jobData?.Slogan}</Text>

          <View style={styles.tagContainer}>
            {jobData.Skill?.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* <Text style={styles.timeAgo}>1 day ago</Text> */}
        </View>

        {/* Job Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin</Text>
          <Text style={styles.sectionDescription}>
            <Ionicons name="location-sharp" size={16} color="#555" /> {jobData?.Country}
          </Text>
          <Text style={styles.sectionDescription}>
            <Ionicons name="briefcase" size={16} color="#555" /> {jobData?.Field}
          </Text>

          <Text style={styles.sectionDescription}>
            <FontAwesome name="group" size={16} color="black" /> {jobData?.CompanySie}
          </Text>
        </View>

        {/* Job Requirements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giới thiệu</Text>
          <Text style={styles.sectionDescription}>
            {jobData?.About.replace(/;/g, '\n')}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phúc lợi</Text>
          <Text style={styles.sectionDescription}>
            {jobData?.Benefit.replace(/;/g, '\n')}
          </Text>
        </View>

        <SuggestJobs />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>LƯU</Text>
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
  companyLogo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 10
  },
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

  bottomNav: { flexDirection: 'row', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#fff' },
  saveButton: { flex: 1, alignItems: 'center', paddingVertical: 15, backgroundColor: '#f5f5f5' },
  saveButtonText: { color: Colors.txt, fontSize: 16 },
  applyButton: { flex: 1, alignItems: 'center', paddingVertical: 15, backgroundColor: Colors.button },
  applyButtonText: { color: '#fff', fontSize: 16 },
});

