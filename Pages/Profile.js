import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, Text, View, ImageBackground, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';


import Colors from '../constants/Colors';
import Font from "../constants/Font";
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import HomPage2 from './HomePage2';

const { height, width } = Dimensions.get("screen");

export default function ProfilePage({ navigation }) {

    return (

        <SafeAreaView>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
            >

                <View style={styles.container}>
                    <View style={styles.appB}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name="chevron-left" style={styles.iconeback} />
                        </TouchableOpacity>
                        <Text style={styles.txt} > Profil</Text>
                    </View>
                    <View style={styles.photoCard}>
                        <View style={styles.imageView}>
                            <ImageBackground
                                style={styles.images}
                                source={require("../assets/Images/homme.png")}
                                resizeMode='cover' />
                        </View>
                    </View>
                    <View style={styles.champ}>
                        <View style={styles.liste} >
                            <Text style={styles.titre}> Nom et prénoms </Text>
                            <Text style={styles.contenu}> OUEDRAOGO Issa</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.rien}>  </Text>
                        </View>
                        <View style={styles.liste} >
                            <Text style={styles.titre}> Email </Text>
                            <Text style={styles.contenu}> issa@gmail.com</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.rien}>  </Text>
                        </View>
                        <View style={styles.liste} >
                            <Text style={styles.titre}> Identifiant</Text>
                            <Text style={styles.contenu}> ISSA13487Z4D</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.rien}>  </Text>
                        </View>
                        <View style={styles.liste} >
                            <Text style={styles.titre}> Numéro</Text>
                            <Text style={styles.contenu}>+225 0779327926</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.rien}>  </Text>
                        </View>
                        <View style={styles.liste} >
                            <Text style={styles.titre}> Affectation </Text>
                            <Text style={styles.contenu}> Abidjan - Cocody</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.rien}>  </Text>
                        </View>
                        <TouchableOpacity onPress={()=> navigation.navigate('')} style={[styles.btn, styles.shadow]} >
                            <MaterialIcons name="logout" style={styles.iconeNext} />
                            <Text style={styles.btntxt}>Déconnexion</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: width / 14,
        height: height
    },
    appB: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '8%'

    },
    iconeback: {
        fontSize: 35,
        color: Colors.primary
    },
    txt: {
        fontSize: FontSize.large,
        color: Colors.primary,
        fontFamily: Font["poppins-bold"],
        fontWeight: '700',
        marginVertical: Spacing * 2,
        paddingHorizontal: width / 3.7
    },
    photoCard: {
        height: "20%",
        marginVertical: "9%",
        justifyContent: "center",
        alignItems: "center"
    },
    imageView: {
        height: "100%",
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: "100%",
    },
    images: {
        height: "100%",
        width: "100%",
        borderRadius: 75,

    },
    champ: {
        paddingLeft: "6%",
        height: '52%',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        padding: "7%",
        borderRadius: 15,
        borderStyle: 'dotted'
    },
    liste: {
        height: "15%",
        alignItems: 'start',
        justifyContent: 'center',

    },
    titre: {
        FontSize: FontSize.medium,
        fontWeight: 'bold',
        marginBottom: "2%",
        color: Colors.darkText
    },
    contenu: {
        fontSize: 17,
        color: Colors.text
    },
    btn: {
        backgroundColor: Colors.gray,
        alignItems: 'center',
        justifyContent: 'start',
        flexDirection: 'row',
        borderRadius: Spacing,
        height: "14%",
        paddingTop: "5%"

    },
    btntxt: {
        color: "990000",
        textAlign: 'start',
        fontSize: FontSize.large,
        fontFamily: Font['poppins-bold'],
        fontWeight: '600',
        paddingLeft: "4%"
    },
    iconeNext: {
        color: "990000",
        textAlign: 'start',
        fontSize: 32,

    },
    line: {
        backgroundColor: "#969696",
    },
    rien: {
        fontSize: 0.5
    }
});
