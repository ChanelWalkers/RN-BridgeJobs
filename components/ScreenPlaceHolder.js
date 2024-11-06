import { View, Text, StyleSheet } from "react-native";


function ScreenPlaceHolder({title}) {
    <View style = {styles.screenContainer}>
        <Text>{title}</Text>
    </View>
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ScreenPlaceHolder;