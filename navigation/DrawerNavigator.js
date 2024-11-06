import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerNavigator from "./CustomDrawerNavigator";
import TabNavigator from "./TabNavigator"
import ScreenPlaceholder from "../components/ScreenPlaceHolder"

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerNavigator {...props} />}>
            <Drawer.Screen name='Tab' component={TabNavigator}
                options={{
                    drawerIcon: ({ size }) => (
                        <Image source={require('../assets/images/td-logo.png')} style={{ width: size, height: size }} />
                    ),
                }}
            />
            <Drawer.Screen name='Home'>{() => <ScreenPlaceholder title={"Home"} />}</Drawer.Screen>
        </Drawer.Navigator>
    )
}



export default DrawerNavigator;