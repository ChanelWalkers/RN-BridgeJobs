// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledButton,
  StyledTextInput,
  RightIcon,
  ButtonText,
  HrLine,
  MsgBox,
  SubButtonText,
  SubStyledButton,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent
} from "../components/LoginStyles";
import { StatusBar } from "expo-status-bar";
import Colors from "../constants/Colors";
import { Formik } from "formik";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase"; // Đảm bảo đường dẫn đúng
import { doc, getDoc } from "firebase/firestore";
import { useUser } from '../store/context/user-context';

function LoginScreen({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  
  const { login } = useUser(); // Sử dụng hàm login từ UserContext

  function navigateSignUpScreen() {
    navigation.navigate('SignUp');
  }

  const handleLogin = async (values) => {
    setMessage('');
    const { email, password } = values;

    try {
      // Xác thực người dùng với Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Lấy thông tin người dùng từ Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Tạo đối tượng dữ liệu người dùng để lưu vào context
        const loggedInUser = {
          uid: user.uid,
          email: userData.email,
          phone: userData.phone,
          name: userData.name
          // Bạn có thể thêm các thông tin khác nếu có
        };

        // Lưu thông tin người dùng vào context
        login(loggedInUser);

        setMessage("Login thành công!");
        setMessageType("SUCCESS");

        // Điều hướng đến màn hình Jobs hoặc màn hình chính
        navigation.navigate("Jobs");
      } else {
        // Nếu không tìm thấy tài liệu người dùng trong Firestore
        setMessage("Không tìm thấy thông tin người dùng.");
        setMessageType("ERROR");
      }
    } catch (error) {
      // Xử lý lỗi đăng nhập
      console.error("Login Error:", error);
      setMessage(error.message);
      setMessageType("ERROR");
    }
  };

  return (
    
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo
          resizeMode="contain"
          source={require('../assets/images/Bjob-logo.png')}
        />
        <SubTitle>Account Login</SubTitle>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label={"Email Address"}
                icon={"user-circle"}
                placeholder={"abc@gmail.com"}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
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
                autoCapitalize="none"
              />
              <MsgBox type={messageType}>{message}</MsgBox>
              <StyledButton
                onPress={handleSubmit}
                android_ripple={{ color: Colors.titleButton }}
                style={({ pressed }) => [
                  styles.button,
                  pressed ? styles.buttonPressed : null,
                ]}
              >
                <ButtonText>
                  Login
                </ButtonText>
              </StyledButton>
              <HrLine />
              <SubStyledButton
                android_ripple={{ color: Colors.titleButton }}
                style={({ pressed }) => [
                  styles.button,
                  pressed ? styles.buttonPressed : null,
                ]}
                onPress={() => Alert.alert("Thông báo", "Tính năng này đang được phát triển!")}
              >
                <View style={styles.rightIconContainer}>
                  <FontAwesome5 name="google" size={24} color="#DB4437" />
                  <SubButtonText>
                    Sign in with Google
                  </SubButtonText>
                </View>
              </SubStyledButton>
              <ExtraView>
                <ExtraText>Don't have an account already?</ExtraText>
                <TextLink
                  onPress={navigateSignUpScreen}
                  style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : null,
                  ]}
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
        <FontAwesome5 name={icon} size={24} color={Colors.icon} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
            color={Colors.icon}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.5,
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
  inputContainer: {
    marginBottom: 15,
    marginTop: 15,
  },
});
