import Colors from "../constants/Colors";
import CompanyDetailScreen from "../screens/CompanyDetailScreen";
import ExportCVScreen from "../screens/ExportCVScreen";
import JobDetailScreen from "../screens/JobDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import ResultSearch from "../screens/ResultSearch";
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
            <Stack.Screen name='JobDetail' component={JobDetailScreen}/>
            <Stack.Screen name='CompanyDetail' component={CompanyDetailScreen}/>
            <Stack.Screen name='ResultSearch' component={ResultSearch}
                options={{
                    headerTitle: 'Result for Search'
                }}
            />
            <Stack.Screen name="CV" component={ExportCVScreen} 
                options={{
                    headerTitle: 'Update or Create Your CV'
                }}
            />
        </Stack.Navigator>
    )
}



export default MainNavigator;