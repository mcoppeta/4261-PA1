import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios'
import qs from 'qs';

export default function LoggedScreen(props) {
  const url = "https://pa1-4261.herokuapp.com/teams/"
  let subs = props.data['subscriptions']
  let [events, setEvents] = useState([])

  useEffect(() => {
  for (let i=0; i<subs.length; i++) {
    let team = subs[i]
    axios.get(url + team)
        .then(res => {
            for (let y=0; y<res.data['events'].length; y++) {
                let point = res.data['events'][y]
                point['team'] = team
                setEvents(old => [...old, point])
            }
        })
        .catch(e => {
            console.log(e)
        })
    }
  }, [subs])
  
  function toBrowse() {
    props.setScreen('BROWSE')
  }
  
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Welcome, {props.data['username']}!</Text>
        <Button title='Browse Schedules' onPress={toBrowse} />
        <ScrollView>
            {
                events[0] ? events.map((item) => {
                    return (
                        <View key={item.id} style={styles.item} >
                            <View style={styles.horizontal}>
                              <Text>{item.team}</Text>
                              <Text>{item.date}</Text>
                            </View>
                            <Text>{item.title}</Text>
                            
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
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: 20,
    textAlign: 'center'
  },
});
