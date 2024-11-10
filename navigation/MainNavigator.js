import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DrawerNavigator from "./DrawerNavigator";
import TabNavigator from "./TabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
function MainNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle:{
                backgroundColor: Colors.button,
            },
            headerTitleAlign: "center",
            headerTitleStyle:{
                color: Colors.txtField
            }
        }}>
            <Stack.Screen
                name='Drawer'
                component={DrawerNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
    )
}



export default MainNavigator;