/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {store} from './src/store'
import { Provider } from 'react-redux'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView, View,
} from 'react-native';
import Login from './src/components/login';
import auth from '@react-native-firebase/auth'
import Home from './src/components/home';
const App = () => {
  const [loged, setLoged] = useState(null);

  useEffect(() => {
    auth().onAuthStateChanged(setLoged)
  }, [])

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
        {loged ? <Home/> : <Login/>}
      </SafeAreaView>
    </Provider>
  );
};

export default App;
