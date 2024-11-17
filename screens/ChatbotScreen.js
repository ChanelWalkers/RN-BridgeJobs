import { StyleSheet, View, TextInput, Pressable, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "../constants/Colors";
import { useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import { GiftedChat } from "react-native-gifted-chat";


function ChatbotScreen() {
    const [inputMessage, setInputMessage] = useState("");
    const [outputMessage, setOutputMessage] = useState("Results be shown here");
    const [messages, setMessages] = useState([]);

    const apiKey = process.env.REACT_APP_KEY_API_AI;
    const handleButtonClick = () => {
        // console.log(inputMessage);
        const message = {
            _id: Math.random().toString(36).substring(7),
            text: inputMessage,
            createdAt: new Date(),
            user: { _id: 1 },
        };
        setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, [message])
        );
        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: inputMessage
                    }
                ],
                max_tokens: 1000,
                temperature: 1,
                top_p: 0.9
            }),
        }).then((response) => response.json())
            .then((data) => {
                let messageContent = data.choices[0].message.content;
                setOutputMessage(messageContent.trim());
                const message = {
                    _id: Math.random().toString(36).substring(7),
                    text: messageContent.trim(),
                    createdAt: new Date(),
                    user: { _id: 2, name: 'Bot' },
                };
                setMessages((prevMessages) =>
                    GiftedChat.append(prevMessages, [message])
                );
                setInputMessage('');
            }).catch(error => {
                console.error('Error:', error);
            });
    };

    const handleTextInput = (txt) => {
        setInputMessage(txt);
    };

    const dismissKeyboard = () => {
        if (Keyboard.isVisible()) {
            Keyboard.dismiss();
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 80}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.inner}>
                    <View style={styles.resultTxt}>
                        <GiftedChat
                            messages={messages}
                            renderInputToolbar={() => { }}
                            user={{ _id: 1 }}
                            minInputToolbarHeight={50}
                            bottomOffset={Platform.OS === 'ios' ? 20 : 0}
                        />
                    </View>

                    <View style={styles.bottomTaskBar}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Enter your question here"
                                value={inputMessage}
                                onChangeText={handleTextInput}
                                style={styles.txtInput}
                                cursorColor={Colors.txt}
                                
                            />
                        </View>
                        <Pressable
                            android_ripple={{ color: Colors.titleButton }}
                            style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                            onPress={handleButtonClick}
                        >
                            <Feather name="send" size={24} color="white" />
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    );
}

export default ChatbotScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    inner: {
        flex: 1,
    },
    resultTxt: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    bottomTaskBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: Colors.button,
        padding: 10,
        marginLeft: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        marginLeft: 10,
        borderColor: Colors.backgroundChat,
        borderWidth: 1,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
        height: 50,
    },
    txtInput: {
        borderColor: Colors.background,
    },
    buttonPressed: {
        opacity: 0.25,
    }
});
