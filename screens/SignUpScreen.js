// SignUpScreen.js
import { StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledButton, StyledTextInput, RightIcon, ButtonText, HrLine, MsgBox, SubButtonText, SubStyledButton, ExtraText, ExtraView, TextLink, TextLinkContent } from "../components/LoginStyles";
import { StatusBar, View, Platform, StyleSheet, Image, ScrollView } from "react-native";
import React, { useState } from "react";

import Colors from "../constants/Colors"
import { Formik } from "formik";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase"; // Đảm bảo đường dẫn đúng
import { setDoc, doc } from "firebase/firestore";
import { useUser } from '../store/context/user-context';
function SignUpScreen({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { login } = useUser();
  function navigateSignUpScreen() {
    navigation.navigate("SignUp");
  }

  return (
    <StyledContainer>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <InnerContainer>
          <PageLogo
            resizeMode="contain"
            source={require("../assets/images/Bjob-logo.png")}
          />
          <SubTitle>Account SignUp</SubTitle>
          <Formik
            initialValues={{
              email: "",
              phone: "",
              name: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={async (values) => {
              const { email, password, confirmPassword, phone, name } = values;

              if (password !== confirmPassword) {
                setMessage("Passwords do not match");
                setMessageType("ERROR");
                return;
              }

              try {
                const userCredential = await createUserWithEmailAndPassword(
                  auth,
                  email,
                  password
                );
                const user = userCredential.user;

                // Lưu thông tin người dùng vào Firestore
                await setDoc(doc(db, "users", user.uid), {
                  email: email,
                  phone: phone,
                  name: name,
                });
                const userData = {
                  uid: user.uid,
                  email: email,
                  phone: phone,
                  name:name
                };
                
                // Lưu thông tin người dùng vào context
                login(userData);
                
                
                setMessage("Account created successfully!");
                setMessageType("SUCCESS");
                
                // Điều hướng đến màn hình khác nếu cần
                navigation.navigate("Jobs");
              } catch (error) {
                setMessage(error.message);
                setMessageType("ERROR");
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label={"Name"}
                  icon={"user-circle"}
                  placeholder={"Nguyễn Văn A"}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                 
                />
                <MyTextInput
                  label={"Email Address"}
                  icon={"user-circle"}
                  placeholder={"abc@gmail.com"}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label={"Phone number"}
                  icon={"phone-alt"}
                  placeholder={"+84"}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                <MyTextInput
                  label={"Password"}
                  icon={"lock"}
                  placeholder={"*********"}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MyTextInput
                  label={"Confirm Password"}
                  icon={"lock"}
                  placeholder={"*********"}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox>{message}</MsgBox>
                <StyledButton
                  onPress={handleSubmit}
                  android_ripple={{ color: Colors.titleButton }}
                  style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : null,
                  ]}
                >
                  <ButtonText>Sign Up</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Already have an account?</ExtraText>
                  <TextLink
                    onPress={navigateSignUpScreen}
                    style={({ pressed }) => [
                      styles.button,
                      pressed ? styles.buttonPressed : null,
                    ]}
                  >
                    <TextLinkContent>Login</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </ScrollView>
    </StyledContainer>
  );
}

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      <LeftIcon>
        <FontAwesome5 name={icon} size={24} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.5,
  },
  button: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    marginTop: 20, // Adds space above the button
  },
  inputContainer: {
    marginBottom: 15, // Space between inputs
    marginTop: 15, // Adds top margin for consistency
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center", // Center the form if it's too short
    paddingBottom: 20, // Space at the bottom of the scrollable content
  },
});
