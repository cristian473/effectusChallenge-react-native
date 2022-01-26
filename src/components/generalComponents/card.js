import React from 'react'
import { Image, Text, View } from "react-native";

const Card = ({image, title}) => {
    return (
        <View>
            <View>
                <Image
                    source={image}
                />
            </View>
            <Text>{title}</Text>
        </View>
    )
}

export default Card;

