import axios from 'axios';
import React, { useState } from 'react'
import { Text, View, StyleSheet, Alert, ScrollView} from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../../store/reducers';
import Button from '../generalComponents/button';
import Card from '../generalComponents/card';
import SearchBar from '../generalComponents/searchBar';

const Home = () => {
    const [inputSearch, setInputSearch] = useState('')
    const moviesResults = useSelector((state) => state.movies.searchResults)
    const dispatch = useDispatch()
    
    const handleSearch = async () => {
        try {
            const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${inputSearch}`
            const headers = {
                'x-rapidapi-host': 'imdb8.p.rapidapi.com',
                'x-rapidapi-key': '1fb6e36c67msh21f0172f72c0d9ep1da4b1jsn335cbb44d2b3'
            }
            const res = await axios.get(url, {headers})
            dispatch(setSearchResults(res.data.d))
        } catch (err) {
            console.error(err)
            Alert.alert(err.message)
        }
    }
    console.log(moviesResults)

    return (
        <View style={styles.home__container}>
            <View style={styles.home__header}>
                <Button style={styles.header__logout}>
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
            {moviesResults.length > 0 ? (
                <ScrollView style={styles.home__listMovies}>
                    {moviesResults.map((film) => (
                        <Card
                            title={film.l}
                            image={film.i?.imageUrl}
                        />
                    ))}
                </ScrollView>
            ): (
                <View>
                    <Text>No movies, look for some</Text>
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
        alignItems: 'center'
    },
    home__listMovies:{
        flex: 8
    },
    header__logout:{
        button: {
            position: 'absolute',
            right: 15,
        },
        text: {
            color: 'black',
            fontSize: 17
        }
    },  
    header__title:{
        fontSize: 40,
        color: 'black'
    }    
})