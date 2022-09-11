import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios'
import qs from 'qs';
import UserSelect from './UserSelect.js';
import LoggedScreen from './LoggedScreen.js';
import BrowseScreen from './BrowseScreen.js';

export default function App() {
  const [logged, setLogged] = useState(false);
  const [screen, setScreen] = useState('HOME')
  const [loggedData, setLoggedData] = useState("");
  
  if (!logged) {
    return (
      <UserSelect callback={setLogged} setData={setLoggedData} setScreen={setScreen} />
    );
  } else if (screen == 'LOGGED') {
    //console.log(loggedData['subscriptions'])
    return (
      <LoggedScreen data={loggedData} setScreen={setScreen} />
    )
  } else if (screen == 'BROWSE') {
    return (
      <BrowseScreen data={loggedData} setScreen={setScreen} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
  err: {
    color: 'red',
  }
});
