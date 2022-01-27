import axios from 'axios';
import React, { useState } from 'react'
import { Text, View, StyleSheet, Alert, ScrollView, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../../store/reducers';
import Button from '../generalComponents/button';
import Card from '../generalComponents/card';
import SearchBar from '../generalComponents/searchBar';
import auth from '@react-native-firebase/auth'
import {RAPID_API_KEY} from '@env';

const Home = () => {
    const moviesResults = useSelector((state) => state.movies.searchResults)
    const [inputSearch, setInputSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleSearch = async () => {
        try {         
            setLoading(true)  
            if(!inputSearch) return dispatch(setSearchResults([]))
            const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${inputSearch}`
            const headers = {
                'x-rapidapi-host': 'imdb8.p.rapidapi.com',
                'x-rapidapi-key': RAPID_API_KEY
            }
            const res = await axios.get(url, {headers})
            dispatch(setSearchResults(res.data.d))
            setLoading(false)
        } catch (err) {
            console.error(err)
            setLoading(false)
            Alert.alert(err.message)
        }
    }

    const handleLogout = async () => {
        try {
            await auth().signOut()
            dispatch(setSearchResults([]))
        } catch (err) {
            console.error(err)
            Alert.alert(err.message)
        }
    }

    return (
        <View style={styles.home__container}>
            <View style={styles.home__header}>
                <Button onPress={handleLogout} style={styles.header__logout}>
                    Logout
                </Button>
                <Text style={styles.header__title}>
                    Welcome!
                </Text>
                <SearchBar 
                    value={inputSearch}
                    onChangeText={setInputSearch}
                    handleSearch={handleSearch}
                />
            </View>   
            {loading && (
                 <View style={styles.home__noMovies_container}>
                    <ActivityIndicator size={'large'} color='#000'/>
                </View>
            )}         
            {!loading && moviesResults.length > 0 && (
                <View style={{flex: 8}}>
                    <ScrollView contentContainerStyle={styles.home__listMovies}>
                        {moviesResults.map((film, i) => (
                            <Card
                                key={i}
                                title={film.l}
                                image={{uri: film.i?.imageUrl}}
                            />
                        ))}
                    </ScrollView>
                </View>
            )} 
            {!loading && moviesResults.length === 0 && (
                <View style={styles.home__noMovies_container}>
                    <Text style={styles.home__noMovies_text}>
                        No movies, look for some
                    </Text>
                </View>
            )}
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    home__container:{
        flex: 1
    },
    home__header:{
        flex: 2,
        alignItems: 'center',
    },
    home__listMovies:{
        flexGrow: 1,
        alignItems: 'center'
    },
    header__logout:{
        button: {
            position: 'absolute',
            right: 15,
        },
        text: {
            color: '#000',
            fontSize: 17
        }
    },  
    header__title:{
        fontSize: 40,
        color: '#000',
        marginVertical: 10
    },
    home__noMovies_container: {
        flex: 8,
        justifyContent:'center',
        alignItems:'center',
    },
    home__noMovies_text: {
        fontSize: 20,
        color: '#000'
    }
})