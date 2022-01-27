import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let timeoutId = 0

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

    const handleKeyPress = ({nativeEvent: {key}}) => {
        clearTimeout(timeoutId)
        setKeyPressed(key)
        timeoutId = setTimeout(() => setKeyPressed(''), 1000)
    }

    return (
        <View style={styles.searchbar__container}>
            <TextInput 
                onFocus={() => setInputIsFocused(true)}
                onBlur={() => setInputIsFocused(false)}
                style={styles.header__search}        
                onChangeText={onChangeText}        
                onKeyPress={handleKeyPress}    
                onSubmitEditing={handleSearchPress}                     
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
        color: '#000',
        right: 10,
        top: 8
    },
    header__search: {
        backgroundColor: '#bec4d0',
        width: '95%',
        padding: 10,
        fontSize: 20,
        paddingHorizontal: 17,
        borderRadius: 10,
        color: '#000'
    }
})