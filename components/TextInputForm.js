import { TextInput, View, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";

function TextInputForm({ placeholder, value, onChangeText, label }) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

export default TextInputForm;

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
        color: Colors.txt,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: Colors.titleButton,
        borderRadius: 5,
    },
})