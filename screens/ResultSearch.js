import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const ResultSearch = ({ route }) => {
  const [jobs, setJobs] = useState([]);
  const { keyword } = route.params;
  console.log(keyword);

  useEffect(() => {
    axios.post('https://api.apijobs.dev/v1/job/search', {
      'q': keyword,
    }, {
      headers: {
        apikey: '9996e9bfa6275575b0a037ef69dee0344706581a42d8ca243fb4f425aadc58ca',
      }
    })
    .then((res) => {
      // Kiểm tra xem res.data có phải là mảng hay không
      const data = Array.isArray(res.data) ? res.data : res.data.hits || [];

      // Hàm kiểm tra giá trị không rỗng và không phải là "Unknown" hoặc "N/A"
      const isValid = (value) => {
        if (typeof value === 'string') {
          return value.trim() !== "" && value.trim().toLowerCase() !== "unknown" && value.trim().toLowerCase() !== "n/a";
        }
        return value !== null && value !== undefined;
      };

      // Lọc các job có đầy đủ thông tin cần thiết
      const filteredJobs = data
        .slice(0, 200)
        .filter(job => {
          const websiteName = job.website_name || job.websiteName;
          const websiteUrl = job.website_url || job.websiteUrl;
          const url = job.url;
          const title = job.title;
          const description = job.description;
          const region = job.region || job.city;
          const language = job.language;
          const status = job.status;
          const hiringOrganizationName = job.hiringOrganizationName || job.websiteName;
          const industry = job.industry;

          // Kiểm tra tất cả các trường quan trọng
          return isValid(websiteName) &&
                 isValid(websiteUrl) &&
                 isValid(url) &&
                 isValid(title) &&
                 isValid(description) &&
                 isValid(region) &&
                 isValid(language) &&
                 isValid(status) &&
                 isValid(hiringOrganizationName) &&
                 isValid(industry);
        })
        .map(job => ({
          id: job.id,
          website_name: job.website_name || job.websiteName,
          website_url: job.website_url || job.websiteUrl,
          url: job.url,
          title: job.title,
          description: job.description,
          region: job.region || job.city,
          city: job.city || job.region,
          language: job.language,
          status: job.status,
          published_since: job.published_since,
          published_until: job.published_until,
          baseSalaryValue: job.baseSalaryValue,
          baseSalaryCurrency: job.baseSalaryCurrency,
          baseSalaryType: job.baseSalaryType,
          baseSalaryValueUnitText: job.baseSalaryValueUnitText,
          employmentType: job.employmentType || job.employment_type,
          hiringOrganizationName: job.hiringOrganizationName || job.websiteName,
          industry: job.industry,
          educationRequirements: job.educationRequirements, // Bạn có thể xử lý định dạng nếu cần
          // Thêm các trường khác nếu cần
        }));

      setJobs(filteredJobs);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [keyword]);

  

  const handlePress = (item) => {
    // Chuyển hướng đến URL ứng tuyển
    Linking.openURL(item.url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <>
          <Text style={styles.headerText}>{jobs.length} JOBS FOR YOU</Text>
        </>
      )}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity style={styles.jobContainer} onPress={() => handlePress(item)}>
            <View style={styles.row}>
              {/* Hình ảnh công ty */}
              <Image 
                source={{ uri: 'https://via.placeholder.com/50' }} 
                style={styles.companyImage} 
              />
              <View style={styles.textContainer}>
                {/* Tên công ty */}
                <Text style={styles.jobCompany}>{item.hiringOrganizationName}</Text>
                {/* Tiêu đề công việc */}
                <Text style={styles.jobTitle}>{item.title}</Text>
              </View>
            </View>

            {/* Mô tả công việc */}
            <Text style={styles.jobDescription} numberOfLines={2}>
              {item.description}
            </Text>

            {/* Thông tin bổ sung */}
            <View style={styles.jobInfoContainer}>
              {/* Vị trí công việc */}
              <Text style={styles.jobInfo}>
                <Ionicons name="location-sharp" size={16} color="#555" /> {item.city || item.region}
              </Text>
              {/* Loại công việc */}
              <Text style={styles.jobInfo}>
                <Ionicons name="briefcase" size={16} color="#555" /> {item.employmentType}
              </Text>
              {/* Ngành nghề */}
              <Text style={styles.jobInfo}>
                <Ionicons name="business" size={16} color="#555" /> {item.industry}
              </Text>
              {/* Ngôn ngữ */}
              <Text style={styles.jobInfo}>
                <Ionicons name="language" size={16} color="#555" /> {item.language}
              </Text>
              {/* Lương cơ bản */}
              {item.baseSalaryValue && item.baseSalaryCurrency ? (
                <Text style={styles.jobInfo}>
                  <Ionicons name="cash" size={16} color="#555" /> {item.baseSalaryValue} {item.baseSalaryCurrency}
                </Text>
              ) : null}
              {/* Ngày đăng tin */}
              <Text style={styles.jobInfo}>
                <Ionicons name="calendar" size={16} color="#555" /> {new Date(item.published_since).toLocaleDateString()} - {new Date(item.published_until).toLocaleDateString()}
              </Text>
            </View>

            {/* Nút "Xem chi tiết" */}
            <TouchableOpacity 
              style={styles.detailButton} 
              onPress={() => handlePress(item)}
            >
              <Text style={styles.detailButtonText}>View Details</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  headerText: {
    padding: 15,
    fontSize: 18,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  jobContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  companyImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    flex: 1
  },
  jobCompany: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 16,
    color: '#e74c3c',
    marginTop: 5,
  },
  jobDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  jobInfoContainer: {
    marginTop: 10,
  },
  jobInfo: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailButton: {
    marginTop: 10,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Các style khác nếu cần
});

export default ResultSearch;
