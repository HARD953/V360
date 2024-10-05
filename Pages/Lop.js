// import React, {useState,useContext} from 'react';
// import { Formik } from 'formik';
// import { Octicons, Ionicons,Fontisto } from '@expo/vector-icons';
// import { AuthContext } from '../Components/globalContext';

// import {
//     StyledContainer,
//     InnerContainer,
//     PageLogo,
//     PageTitle,
//     SubTitle,
//     StyledFormArea,
//     LeftIcon,
//     StyledInputLabel,
//     StyledTextInput,
//     RightIcon,
//     Colors,
//     ButtonText,
//     StyledButton,
//     MsBox,
//     Line,
//     ExtraText,
//     ExtraView,
//     Avatar
// } from '../Components/styles';
// import { View } from 'react-native';
// import Spinner from 'react-native-loading-spinner-overlay/lib';


// const {brand,darkLight, primary,black}=Colors;

// const Login = ({ navigation }) => {
//     const [hidePassword,setHidePassword]=useState(true);
//     const [password,setPassword]=useState(null);
//     const [email,setEmail]=useState(null);
//     const { loading,login }=useContext(AuthContext)
//   return (
//     <StyledContainer resizeMode="cover" source={require('../assets/Images/AdobeStock_229865638.jpg')}>
//         <InnerContainer >
//             <PageTitle></PageTitle>
//             <SubTitle></SubTitle>
//             <Avatar resizeMode="cover" />
//             <Formik
//             initialValues={{ email:'',password:'',}}
//             onSubmit={(values)=>{
//                 console.log(values);
//             }}
//             >
//             {({ handleChange, handleBlur, handleSubmit, values }) =>(
//             <StyledFormArea>
//                 <Spinner  />
//                 <MyTextInput
//                     label="Email Address"
//                     icon="mail"
//                     placeholder="issa@gmail.com"  
//                     placeholderTextColor={darkLight} 
//                     onChangeText={handleChange('email')}
//                     onBlur={handleBlur('email')}
//                     value={values.email}
//                     keyboardType="email-address"
//                 />
//                 <MyTextInput
//                     label="Password"
//                     icon="lock"
//                     placeholder="* * * * * * * * * * * * "  
//                     placeholderTextColor={darkLight} 
//                     onChangeText={handleChange('password')}
//                     onBlur={handleBlur('password')}
//                     value={values.password}
//                     secureTextEntry={hidePassword}
//                     isPassword={true}
//                     setHidePassword={setHidePassword}
//                 />
//                 <MsBox>...</MsBox> 
//                 <StyledButton  onPress={()=>{login(values.email,values.password)}}>
//                     <ButtonText>
//                         Se Connecter
//                     </ButtonText>
//                 </StyledButton>
//                 <Line />
//                 <StyledButton google={true} onPress={handleSubmit}>
//                     <Fontisto name='google' color={primary} size={17} />
//                     <ButtonText google={true}>
//                         Identifiant Oublier
//                     </ButtonText >
//                 </StyledButton>
//                 <ExtraView>
//                 <ExtraText>La vie est un don et il faut la préserver </ExtraText>
//                     {/* <TextLink>
//                         <TextLinkContent>SignUp</TextLinkContent>
//                     </TextLink> */}
//                 </ExtraView>
            
//                 </StyledFormArea>)}
//             </Formik>
//         </InnerContainer>
//     </StyledContainer>
//     // <View style={{justifyContent:'center',alignItems:'center',marginTop:50}}>
//     //     <Spinner visible={loading} />
//     //     <TextInput value={email} onChangeText={text=>setEmail(text)} placeholder='email' />
//     //     <TextInput value={password} onChangeText={text=>setPassword(text)} placeholder='password' secureTextEntry/>
//     //     <Button title='Login' onPress={()=>{login(email,password)}}/>
//     // </View>
//   );
// }
// const  MyTextInput = ({ label, icon,isPassword,hidePassword,setHidePassword, ...props })=>{
//     return (
//          <View>
//             <LeftIcon>
//                 <Octicons name={icon} size={20} color={black}/>
//             </LeftIcon>
//             <StyledInputLabel>{label}</StyledInputLabel>
//             <StyledTextInput {...props} />
//             {isPassword && (
//                 <RightIcon onPress={()=>setHidePassword(!hidePassword)}>
//                     <Ionicons name={ hidePassword ? 'md-eye-off' : 'md-eye' } size={20} color={darkLight} />
//                 </RightIcon>
//             )}
//          </View> 
//     );
// };
// export default Login;

// Import des bibliothèques nécessaires

// Import des bibliothèques nécessaires