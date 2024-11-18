import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerNavigator from "./CustomDrawerNavigator";
import TabNavigator from "./TabNavigator"
import ScreenPlaceholder from "../components/ScreenPlaceHolder"
import { Image, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerNavigator {...props} />}
            screenOptions={{
                headerTitle: () => {
                    return (
                        <Image style={styles.imageNavigator} source={require('../assets/images/Bjob-logo.png')} />
                    )
                },
                headerTitleAlign: 'center',
            }}
        >
            <Drawer.Screen name='Tab' component={TabNavigator}
            />


        </Drawer.Navigator>
    )
}



export default DrawerNavigator;

const styles = StyleSheet.create({
    imageNavigator: {
        resizeMode: 'contain',
        width: 100,
    },
});