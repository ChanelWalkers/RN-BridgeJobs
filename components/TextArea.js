import { View, Text, TextInput, StyleSheet } from "react-native"
import Colors from "../constants/Colors";
function TextArea({placeholder, onChangeText, label, value}){
        return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                multiline={true}
                numberOfLines={3}
                textAlignVertical="top"
            />
        </View>
    );
}

export default TextArea;

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
        borderColor: '#ccc',
        borderRadius: 5,
        // textAlignVertical: "top",
    },
})