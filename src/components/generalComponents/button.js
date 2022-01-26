import React from "react";
import { Pressable, Text } from "react-native";

const Button = ({
    title = '', 
    children = '', 
    style = {}, 
    onPress = () => {}
}) => {
    return (
        <Pressable style={style.button} onPress={onPress}>
            <Text style={style.text}>{children || title}</Text>
        </Pressable>
    )
}
export default Button;