import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({onChangeText, value, handleSearch}) => {
    const [inputIsFocused, setInputIsFocused] = useState(false)
    const [keyPressed, setKeyPressed] = useState('')
    const inputRef = useRef()

    const handleCrossPress = () => {
        onChangeText('')
        inputRef.current.blur()
    }

    const handleSearchPress = () => {
        handleSearch()
        inputRef.current.blur()
    }

    return (
        <View style={styles.searchbar__container}>
            <TextInput 
                onFocus={() => setInputIsFocused(true)}
                onBlur={() => setInputIsFocused(false)}
                style={styles.header__search}        
                onChangeText={onChangeText}        
                onKeyPress={(e) => setKeyPressed(e.nativeEvent.key)}         
                value={value}   
                ref={inputRef}
            />
            {inputIsFocused && (
                keyPressed === 'Backspace' ? 
                <Icon 
                    onPress={handleCrossPress}
                    style={styles.searchbar__icon} 
                    name="close"
                /> :
                <Icon 
                    onPress={handleSearchPress}
                    style={styles.searchbar__icon} 
                    name="search"
                />
            )}
        </View>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    searchbar__container: {
        flexDirection: 'row',
        position: 'relative',
        alignContent: 'center'
    },
    searchbar__icon: {
        position: 'absolute',
        fontSize: 30,
        color:"black",
        right: 10,
        top: 8
    },
    header__search: {
        backgroundColor: '#bec4d0',
        width: '95%',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    }
})