import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios'
import qs from 'qs';

export default function BrowseScreen(props) {
  const url = "https://pa1-4261.herokuapp.com/teams/"
  let subs = props.data['subscriptions']
  let [teams, setTeams] = useState([])

  useEffect(() => {
    axios.get(url)
        .then(res => {
            console.log(res.data)
            for (let y=0; y<res.data['teams'].length; y++) {
                let point = res.data['teams'][y]
                setTeams(old => [...old, point])
            }
        })
        .catch(e => {
            console.log(e)
        })
    }, [subs])

  function sub(name) {
    axios.post(url + name + "/sub/" + props.data['username'])
        .then(res => {
            console.log(res.data)
        })
        .catch(e => {
            console.log(e)
        })
  }
  
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Browse Schedules</Text>
        <ScrollView>
            {
                teams[0] ? teams.map((item) => {
                    return (
                        <View key={item.id} style={styles.item} >
                            <View style={styles.horizontal}>
                              <Text>{item.name}</Text>
                              <Button title='Subscribe' onPress={() => sub(item.name)} />
                            </View>
                        </View>
                    )
                }) : ""
            }
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  unsub: {
    color: 'red',
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: 20,
    textAlign: 'center'
  },
});
