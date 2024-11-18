import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FavoriteContext } from "../store/context/favorite-context";
import { db, collection, getDocs } from '../config/firebase'
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

function FavoriteScreen({navigation}) {
    const favoriteJobCtx = useContext(FavoriteContext);
    const [JobInfor, setJobInfor] = useState([]);

    useEffect(() => {
        const fetchJobInfor = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "job_infor"));
                const JobInforData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setJobInfor(JobInforData);

            } catch (error) {
                console.error("Error fetching JobInfor info:", error);
            }
        };

        fetchJobInfor();
    }, []);

    const favoriteJobs = JobInfor.filter(item => favoriteJobCtx.ids.includes(item.id));

    if (favoriteJobs.length === 0) {
        return (
            <View style={styles.txtContainer}>
                <Text style={styles.txtInner}>You have no favorite jobs yet.</Text>
            </View>
        )
    }

    function handlePress(item) {
        navigation.navigate("JobDetail", { jobData: item });
    }

    return (
        <FlatList
            data={favoriteJobs}
            renderItem={({ item }) => (
                <View>
                    <TouchableOpacity style={styles.jobContainer} onPress={() => handlePress(item)}>
                        <View style={styles.row}>
                            <Image
                                source={{ uri: item.Image || 'https://via.placeholder.com/50' }}
                                style={styles.companyImage}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.jobCompany}>{item.name || 'Unknown Company'}</Text>
                                <Text style={styles.jobTitle}>{item.Title || 'No Title'}</Text>

                            </View >


                        </View>
                        <View style={styles.jobTitleContainer}>
                            <Text style={styles.jobLocation}>
                                <Ionicons name="location-sharp" size={16} color="#555" /> {item.Address || 'No Location'}

                            </Text>

                            <Text style={styles.jobLocation}><Ionicons name="briefcase" size={16} color="#555" /> {item.Experince || 'No Location'}</Text>
                            <View style={styles.tagsContainer}>
                                {item.TechStack?.map((tag, index) => (
                                    <Text key={index} style={styles.tag}>
                                        {tag}
                                    </Text>
                                ))}
                            </View>
                            <View style={styles.tagsContainer}>
                                {item.Level?.map((tag, index) => (
                                    <Text key={index} style={styles.tag}>
                                        {tag}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
}

export default FavoriteScreen;

const styles = StyleSheet.create({
    jobContainer: {
        padding: 15,
        backgroundColor: Colors.primary,
        margin: 10,
        borderRadius: 8,
    },
    jobTitleContainer: {
        backgroundColor: Colors.primary,
        margin: 10,
        borderRadius: 8,
    },
    jobCompany: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    jobTitle: {
        fontSize: 16,
        color: Colors.button,
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
    txtContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtInner:{
        color: Colors.button,
        fontSize: 16,
    }
});