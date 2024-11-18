import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Keyboard 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icon
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation(); // Hook for navigation

  const data = [
    'Java', 'Python', 'C', 'C++', 'C#', 'PHP', 'JavaScript', 'TypeScript', 'Ruby', 'Swift', 'Kotlin', 'Go', 'Rust', 'Dart',
    'React', 'Angular', 'Vue.js', 'Svelte', 'Django', 'Flask', 'Spring Boot', 'Laravel', '.NET', 'Express.js', 'NestJS',
    'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Oracle Database', 'Microsoft SQL Server', 'Firebase', 'Elasticsearch',
    'Docker', 'Kubernetes', 'Ansible', 'Jenkins', 'Terraform', 'Git', 'GitHub', 'GitLab', 'CI/CD', 'Prometheus', 'Grafana',
    'Linux', 'Ubuntu', 'Red Hat', 'CentOS', 'Windows Server', 'macOS', 'Debian',
    'TCP/IP', 'UDP', 'DNS', 'HTTP', 'HTTPS', 'SSL/TLS', 'VPN', 'Firewall', 'Load Balancer', 'Penetration Testing', 'Ethical Hacking',
    'Flutter', 'React Native', 'SwiftUI', 'Ionic', 'Android Studio', 'Xcode',
    'AWS', 'Google Cloud', 'Azure', 'Heroku', 'DigitalOcean', 'IBM Cloud', 'OpenStack',
    'Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'NLP', 'Computer Vision',
    'Big Data', 'Hadoop', 'Spark', 'Kafka', 'Hive', 'Pig', 'ETL', 'Data Warehousing',
    'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Wireframing', 'Prototyping', 'User Research',
    'Agile', 'Scrum', 'OOP', 'TDD', 'MVC', 'REST API', 'GraphQL', 'WebSocket', 'JSON', 'XML', 'NoSQL', 'Blockchain', 'IoT', 'Cybersecurity', 'AR/VR',
  ];

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.length > 0) {
      const filteredData = data.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredData);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    setSearchText(item);
    setSuggestions([]);
    navigateToResult(item);
  };

  const handleSubmit = () => {
    const trimmedText = searchText.trim();
    if (trimmedText.length > 0) {
      setSuggestions([]);
      Keyboard.dismiss(); // Ẩn bàn phím
      navigation.navigate('ResultSearch', { keyword: trimmedText }); // Điều hướng kèm từ khóa
    }
  };

  const navigateToResult = (keyword) => {
    navigation.navigate('ResultSearch', { keyword });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchText}
          placeholder="Type keyword to search..."
          value={searchText}
          onChangeText={handleSearch}
          returnKeyType="search"
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Icon name="arrow-forward" size={20} color="#888" style={styles.submitIcon} />
        </TouchableOpacity>
      </View>
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 2,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchText: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  submitIcon: {
    marginLeft: 10,
  },
  suggestionList: {
    position: 'absolute',
    top: 70, // Đảm bảo đề xuất không bị che bởi nút search
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 400,
    zIndex: 1,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  suggestionText: {
    fontSize: 16,
  },
});

export default Search;
