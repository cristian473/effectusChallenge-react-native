import React from "react";
import { useState } from "react";
import { View, TextInput, StyleSheet, Image, Text, Alert, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import Button from "../generalComponents/button";
import EffectusIcon from '../../assets/images/effectusIcon.png'
import auth from '@react-native-firebase/auth';

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        try {
            setLoading(true)
            await auth().signInWithEmailAndPassword(form.email, form.password)
        } catch (error) {
            setLoading(false)
            const errorMessage = JSON.stringify(error.message).replace(`[${error.code}]`, '')
            Alert.alert('Error', errorMessage.replace(/"/g, ''))
        }
    };

    const handleInputChange = (label) => ({nativeEvent: {text}}) => {
        setForm({...form, [label]: text})
    }

    return (
        <KeyboardAvoidingView 
            style={styles.login__container}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}
        >
            <View style={styles.login__image_container}>
                <Image 
                    style={styles.login__image}
                    source={EffectusIcon}
                />
            </View>
            <View style={styles.login__input_container}>
                <TextInput 
                    onChange={handleInputChange('email')} 
                    placeholder="Email" 
                    style={styles.login__input}
                    value={form.email}
                />
                <TextInput 
                    onChange={handleInputChange('password')} 
                    placeholder="Password" 
                    secureTextEntry={true}
                    style={styles.login__input}
                    value={form.password}
                />
            </View>
            <View style={styles.login__button_container}>
                {loading ? 
                    <ActivityIndicator size={'large'} color='black'/>
                    :
                    <Button onPress={handleLogin} style={styles.login__button}>
                        Login
                    </Button>
                }
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    login__container: {
        flex: 1,
        flexDirection: 'column',
    },
    login__input_container:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2
    },
    login__button_container:{
        flex: 2,
        alignItems: 'center'
    },
    login__image_container:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2
    },   
    login__image: {
        flex: 1,
        height: '70%',
        resizeMode: 'contain',
        width: '70%',
    },  
    login__input:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '80%',
        paddingBottom: 5,
        height: 40,
        marginVertical: 8,
        fontSize: 18
    },
    login__button:{
        button: {
            marginVertical: 10,            
            padding: 10,
            alignItems: 'center',
            backgroundColor: 'black',
            width: 230,
            borderRadius: 20
        },
        text: {
            fontSize: 17,
            color: '#FFFF',
            fontWeight: 'bold',
        }
    }
})
