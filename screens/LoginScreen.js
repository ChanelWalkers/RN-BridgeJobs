import { StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledButton, StyledTextInput, RightIcon, ButtonText, HrLine, MsgBox, SubButtonText, SubStyledButton, ExtraText, ExtraView, TextLink, TextLinkContent } from "../components/LoginStyles";
import { StatusBar, View, Platform, StyleSheet, Image } from "react-native";
import { Formik } from "formik";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Colors from "../constants/Colors";



function LoginScreen({navigation}) {
    const [hidePassword, setHidePassword] = useState(true);
    function navigateSignUpScreen(){
        navigation.navigate('SignUp')
    }
    return (
        <StyledContainer>
            <StatusBar barStyle={"dark-content"} />
            <InnerContainer>
                <PageLogo resizeMode="contain" source={require('../assets/images/Bjob-logo.png')} />
                <SubTitle>Account Login</SubTitle>
                <Formik initialValues={{ email: '', password: '' }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) =>
                    (<StyledFormArea>
                        <MyTextInput
                            label={"Email Address"}
                            icon={"user-circle"}
                            placeholder={"abc@gmail.com"}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        <MyTextInput
                            label={"Password"}
                            icon={"lock"}
                            placeholder={"*********"}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MsgBox>...</MsgBox>
                        <StyledButton android_ripple={{ color: Colors.titleButton }}
                            style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}>
                            <ButtonText>
                                Login
                            </ButtonText>
                        </StyledButton>
                        <HrLine />
                        <SubStyledButton android_ripple={{ color: Colors.titleButton }}
                            style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}>
                            <View style={styles.rightIconContainer}>
                                <Image source={require('../assets/images/google-logo.png')} style={styles.img} />
                                <SubButtonText>
                                    Sign in with Google
                                </SubButtonText>
                            </View>
                        </SubStyledButton>
                        <ExtraView>
                            <ExtraText>Don't have an account already?</ExtraText>
                            <TextLink
                            style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
                                onPress={navigateSignUpScreen}
                            >
                                <TextLinkContent>Sign up</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <FontAwesome5 name={icon} size={24} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={24} />
                </RightIcon>
            )}
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    buttonPressed: {
        opacity: 0.5
    },
    button: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    img: {
        width: 24,
        height: 24,
        marginHorizontal: 8,
    },
    rightIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})