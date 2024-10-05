import styled from "styled-components";
import  Constants  from "expo-constants";

const StatusBarHeight=Constants.StatusBarHeight;

export const Colors={
    primary:"#ffffff",
    secondary:"#E5EFEB",
    tertiary:"#1F2937",
    darkLiht:"#9CA3AF",
    brand:"#7ADBCE",
    green:"#A23492",
    red:"green",
    bluec:"#FFF",
    subtit:"#7D3C98",
    blue:'blue',
    black:'black'
};

const {blue,subtit,bluec,primary,secondary,tertiary,darkLiht,brand,green,red,black}=Colors;

export const StyledContainer=styled.ImageBackground`
    flex:1;
    padding: 25px;
    justify-content:center;
    background-color: ${primary};
`;

export const StyledContainer1=styled.ImageBackground`
    flex:1;
    justify-content:center;
    background-color: ${primary};
`;

export const InnerContainer=styled.View`
    justify-content:center;
    flex:1;
    width:100%;
    align-items:center;
`;
export const WelcomeContainer =styled(InnerContainer)`
    padding:25px;
    padding-top: 10px;
    justify-content: center;
`

export const Avatar =styled.Image`
    width:100px;
    height:100px;
    margin:auto;
    border-radius:50px;
    border-width:2px;
    margin-bottom:2px;
    margin-top:1px;
`
export const WelcomeImage=styled.Image`
    height:50%; 
    min-width:100%;

`
export const PageLogo =styled.Image`
    width:100%;
    height:60px;
`;

export const PageTitle=styled.Text`
    font-size: 25px;
    text-align:center;
    
    color: ${bluec};
 
    ${(props)=>props.welcome && `
        font-size: 35px;
    `}
`;

export const SubTitle = styled.Text`
    font-size:12px;
    margin-bottom:20px;
    letter-spacing:1px;
    font-weight:bold;
    color: ${bluec};

    ${(props)=>props.welcome && `
        margin-bottom:5px;
        font-weight:normal;
    `}
`;

export const StyledFormArea=styled.View`
    width:90%;
`;

export const StyledTextInput=styled.TextInput`
    background-color:${secondary};
    padding:15px;
    padding-left:55px;
    padding-right:55px;
    border-radius:5px;
    font-size:16px;
    height:50px;
    margin-vertical:3px;
    margin-bottom:10px;
    color:${tertiary};
    

`;

export const StyledInputLabel = styled.Text`
    color:'#A93226';
    font-weight:bold;
    font-size:13px;
    text-align: left;
`;

export const LeftIcon =styled.View`
    left:15px;
    top:38px;
    position:absolute;
    z-index:1;

`;

export const RightIcon =styled.TouchableOpacity`
    right: 15px; 
    top:38px;
    position:absolute;
    z-index:1;
`;

export const StyledButton =styled.TouchableOpacity`
    padding:15px;
    background-color:${blue};
    justify-content:center;
    align-items:center;
    border-radius:5px;
    margin-vertical:5px;
    padding-horizontal:5px;
    height:50px;


    ${(props)=>props.google == true && `
        background-color:${red};
        flex-direction: row;
        justify-content: center;
    `}
`;
export const ButtonText=styled.Text`
    color:${primary};
    font-size:18px;
    

    ${(props)=>props.google == true && `
        background-color:${red};
    `}
`;

export const MsBox=styled.Text`
    text-align:center;
    font-size:13px;
`;
export const Line =styled.View`
    height:1px;
    width:100%;
    background-color:${darkLiht};
    margin-vetical: 10px;
`

export const ExtraView=styled.View`
    justify-content:center;
    flex-direction:row;
    align-items:center;
    padding:10px;
`

export const ExtraText=styled.Text`
    justify-content:center;
    align-content:center;
    align-items:center;
    color: white;
    font-size:15px;
    font-weight:bold;

`

export const TextLink=styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`

export const TextLinkContent =styled.Text`
    color: ${brand};
    font-size: 15px;
`