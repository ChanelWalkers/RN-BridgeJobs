import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { useDrawerNavigation } from "@react-navigation/drawer";
import Colors from "../constants/Colors";
import { useUser } from '../store/context/user-context';
function CustomDrawerNavigation({ props, navigation }) {
    const {user} = useUser();
    return (
        <DrawerContentScrollView {...props} style={styles.drawerContainer}>
            <View style={styles.topDrawer}>
                <Pressable onPress={() => navigation.closeDrawer()}>
                    <Ionicons name='close' size={24} color={'white'} style={styles.closeIcon} />
                </Pressable>
                <View style = {styles.innerContainer}>
                    <Text style={styles.txtInnerTopDrawer}>MENU</Text>
                </View>
            </View>

            {!user ?<Pressable style={styles.loginButton}
            onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.loginText}>LOGIN</Text>
            </Pressable>  : null}

            <DrawerItem
                label="Home page"
                icon={() => <Ionicons name="star-outline" size={20} color="white" />}
                onPress={() => navigation.navigate('Jobs')}
                labelStyle={styles.drawerItemLabel}
            />

            <DrawerItem
                label="Tools"
                icon={() => <Feather name="tool" size={20} color="white" />}
                onPress={() => navigation.navigate('Tools')}
                labelStyle={styles.drawerItemLabel}
            />
            <DrawerItem
                label="Profiles"
                icon={() => <Ionicons name="person-outline" size={20} color="white" />}
                onPress={() => navigation.navigate('Profiles')}
                labelStyle={styles.drawerItemLabel}
            />

            <DrawerItem 
                label={"Favorites"}
                icon={() => <AntDesign name="staro" size={20} color={"white"} />}
                labelStyle={styles.drawerItemLabel}
                onPress={() => navigation.navigate('Favorites')}
            />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    drawerContainer: {
        backgroundColor: Colors.txt,
        paddingTop: 10,
    },
    closeIcon: {
        marginLeft: 20,
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: Colors.button,
        marginHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    loginText: {
        color: Colors.titleButton,
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: Colors.background,
        fontSize: 14,
        marginLeft: 20,
        marginTop: 20,
    },
    drawerItemLabel: {
        color: Colors.titleButton,
        fontSize: 16,
    },
    topDrawer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    txtInnerTopDrawer: {
        color: Colors.titleButton,
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: -45
    },
    innerContainer:{
        flex: 1,
        alignItems: 'center',
    },
});

export default CustomDrawerNavigation;