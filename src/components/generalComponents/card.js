import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Card = ({image, title}) => {
    if(!image.uri) return<></>
    return (
        <TouchableOpacity style={styles.card__container}>
            <View style={styles.card__image_container}>
                <Image
                    style={styles.card__image}
                    source={image}
                />
                <Text style={styles.card__title}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Card;

const styles = StyleSheet.create({
    card__container:{
        flex: 1,
        height: 400,
        width: 350,
        alignItems: 'center',
        marginVertical: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    card__image_container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        borderRadius: 15
    },
    card__image: {
        flex: 1,
        height: 300,
        resizeMode: 'cover',
        width: 350,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    card__title: {
        margin: 10,
        fontSize: 20,
        color: '#ffff'
    }
})

