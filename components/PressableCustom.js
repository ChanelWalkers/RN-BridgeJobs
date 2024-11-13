import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";

function PressableCustom({onPress, title, style}) {
    return (

        <Pressable android_ripple={{ color: Colors.titleButton }}
            style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null,style,]}
            onPress={onPress}>
            <Text style={styles.txtInnerButton}>{title}</Text>
        </Pressable>
    );
}

export default PressableCustom;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.button,
        borderRadius: 8,
        padding: 8,
        marginVertical: 5,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    txtInnerButton: {
        color: Colors.titleButton,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
});