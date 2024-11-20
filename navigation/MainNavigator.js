import Colors from "../constants/Colors";
import CompanyDetailScreen from "../screens/CompanyDetailScreen";
import ExportCVScreen from "../screens/ExportCVScreen";
import JobDetailScreen from "../screens/JobDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import SalaryConverter from "../screens/SalaryScreen";
import ResultSearch from "../screens/ResultSearch";
import SignUpScreen from "../screens/SignUpScreen";
import DrawerNavigator from "./DrawerNavigator";
import UserDetailScreen from "../screens/UserDetailScreen";
import EditUserScreen from "../screens/EditUserScreen";

import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatbotScreen from "../screens/ChatbotScreen";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";



const Stack = createNativeStackNavigator();
function MainNavigator() {
    const navigation = useNavigation();

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.button,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
                color: Colors.txtField
            },
            headerLeft: () => (
                <Pressable onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.primary}/>
                </Pressable>
            ),
        }}>
            <Stack.Screen
                name='Drawer'
                component={DrawerNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='Home' component={DrawerNavigator} />
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
            <Stack.Screen name="Salary" component={SalaryConverter}
            />
            <Stack.Screen name="UserDetail" component={UserDetailScreen} />
            <Stack.Screen name="EditUser" component={EditUserScreen} />
            <Stack.Screen name="Chat" component={ChatbotScreen} />
        </Stack.Navigator>
    )
}



export default MainNavigator;