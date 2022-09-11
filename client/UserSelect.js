import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios'
import qs from 'qs';

export default function UserSelect(props) {
  const url = "https://pa1-4261.herokuapp.com/"
  const loginURL = url + 'user/login'
  const signupURL = url + 'user'
 
  const [usernameIN, setUsernameIN] = useState("")
  const [passwordIN, setPasswordIN] = useState("")
  const [msg, setMsg] = useState("")

  const toLogin = (username, subscriptions) => {
    let ret = {
        'username': username,
        'subscriptions': subscriptions,
    }
    props.setData(ret)
    props.callback(true)
    props.setScreen('LOGGED')
  }

  const login = () => {
    axios.post(loginURL, qs.stringify({
      username: `'${usernameIN}'`,
      password: passwordIN
    }))
    .then((response) => {
      if (response.data['status'] == 'success') {
        subs = []
        for (let s in response.data['subs']) {
            subs.push(response.data['subs'][s]['team'])
        }
        toLogin(usernameIN, subs)
      } else {
        setMsg(response.data['status'])
      }
    })
    .catch((e) => {
      console.log(e)
    })
  }

  const signup = () => {;
    axios.post(signupURL, qs.stringify({
      username: `'${usernameIN}'`,
      password: `'${passwordIN}'`,
      notifications: true
    }))
    .then((response) => {
      console.log(response.data)
      if (response.data['status'] == 'success') {
        toLogin(usernameIN, [])
      } else {
        setMsg(response.data['status'])
      }
    })
    .catch((e) => {
      console.log(e)
    })
  }

  return (
    <View style={styles.container}>
      <Text>Enter username:</Text>
      <TextInput 
        style={styles.input}
        placeholder='username'
        onChangeText={(val) => {setUsernameIN(val)}}
      />
      <Text>Enter password:</Text>
      <TextInput 
        style={styles.input}
        placeholder='password'
        onChangeText={(val) => {setPasswordIN(val)}}
      />
      <View style={styles.horizontal}>
        <Button title="Login" onPress={login} />
        <Button title="Sign Up" onPress={signup} />
      </View>
      <Text style={styles.err}>{msg}</Text>
      <StatusBar style="auto" />
    </View>
  );
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
