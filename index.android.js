import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import FCM, { FCMEvent } from 'react-native-fcm'

export default class pushNotif extends Component {
  componentDidMount () {
    FCM.requestPermissions()
    FCM.getInitialNotification()
      .then((notif) => { console.log('INITIAL NOTIFICATION', notif) })

    this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {
      if (notif && notif.local_notification) {
        return
      }

      if (Platform.OS === 'ios') {
        this.displayNotificationIos(notif)
      }

      if (Platform.OS === 'android') {
        this.displayNotificationAndroid(notif)
      }
    })
  }

  componentWillUnmount () {
    this.notificationListener()
  }

  displayNotificationIos (notif) {
    console.log('isi notif ios', notif)
    FCM.presentLocalNotification({
      title: notif.aps.alert,
      priority: 'high',
      show_in_foreground: true,
      local: true
    })
  }

  displayNotificationAndroid (notif) {
    console.log('isi notif', notif)
    FCM.presentLocalNotification({
      title: notif.fcm.title,
      body: notif.fcm.body,
      priority: 'high',
      click_action: notif.fcm.click_action,
      show_in_foreground: true,
      local: true,
      badge: 0
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('pushNotif', () => pushNotif);
