import styled from "styled-components";
import { View, Image, Text, Dimensions, TextInput, Pressable, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import Colors from "../constants/Colors"

const StatusBarHeight = Constants.statusBarHeight;

const { width } = Dimensions.get('window');
const logoWidth = width * 0.5;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${Colors.primary};
`
export const InnerContainer = styled(View)`
    flex: 1;
    width: 100%;
    align-items: center;
`
export const PageLogo = styled(Image)`
    width: ${logoWidth}px;
    height: 100px;
`

export const PageTitle = styled(Text)`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${Colors.txt};
    padding: 10px;
`

export const SubTitle = styled(Text)`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${Colors.txtField};
`

export const StyledFormArea = styled(View)`
    width: 90%;
`;

export const StyledTextInput = styled(TextInput)`
    background-color:${Colors.txtField};
    padding: 15px;
    padding-left: 55px;
    border-radius: 5px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    height: 60px;
    font-size : 16px;
    color: ${Colors.txt};
`;

export const StyledInputLabel = styled(Text)`
    color: ${Colors.txt};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled(View)`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;    
`;

export const RightIcon = styled(Pressable)`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled(Pressable)`
    padding: 15px;
    background-color: ${Colors.button};
    justify-content: center;
    border-radius: 30px;
    align-content: center;
    margin-vertical: 5px;
    height: 60px;
`;

export const ButtonText = styled(Text)`
    color: ${Colors.titleButton};
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`;

export const MsgBox = styled(Text)`
    text-align: center;
    font-size: 13px;
`

export const HrLine = styled(View)`
    height: 1px;
    width: 100%;
    background-color: ${Colors.hr};
    margin-vertical: 10px;
`
export const SubLogo = styled(Image)`
    width: 24px;
    height: 24px;
    padding-horizontal: 15px;
`
export const SubButtonText = styled(Text)`
    color: ${Colors.txt};
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`

export const SubStyledButton = styled(Pressable)`
    padding: 15px;
    background-color: ${Colors.titleButton};
    justify-content: center;
    border-radius: 30px;
    align-content: center;
    margin-vertical: 5px;
    height: 60px;
`


export const ExtraView = styled(View)`
    flex-direction: row;
    justify-content: center;
    align-item: center;
    padding: 10px;
`
export const ExtraText = styled(Text)`
    justify-content: center;
    align-content: center;
    color:${Colors.txt};
    font-size: 15px;
`

export const TextLink = styled(Pressable)`
    justify-content: center;
    align-items: center;
`
export const TextLinkContent = styled(Text)`
    font-size: 15px;
    color: ${Colors.textLink};
    padding-horizontal: 10px;
`