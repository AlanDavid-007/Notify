import React, {Component} from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import {useNavigation} from '@react-navigation/native';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import NotifService from './components/NotifService';
//Navigation import
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { setupPushNotification, onNotification } from './components/NotificationHandler';

const Stack = createStackNavigator();
 //Screen One
 class ScreenOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }
  
  
  render(){
   
  return (
    <View style={styles.container}>
        <Text style={styles.title}>
          Notify
        </Text>
        <View style={styles.spacer}></View>
        <Image source={require('./assets/logo.png')} style={{width: 150, height: 150}} />
        <View style={styles.spacer}></View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.localNotif();
          }}>
          <Text>Testar Notificação (now)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.scheduleNotif(); 
          }}>
          <Text>Aperte para Receber Notificações sobre Cupons</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.scheduleNotif2(); 
          }}>
          <Text>Aperte para Receber Notificações sobre Refeições</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.scheduleNotif3(); 
          }}>
          <Text>Aperte para Receber Notificações sobre Ofertas</Text>
        </TouchableOpacity>
      </View>
  )
        }
        onRegister(token) {
          this.setState({registerToken: token.token, fcmRegistered: true});
        }
      
        onNotif(notif) {

          Alert.alert(notif.title, notif.message);
    
          // navigation.navigate("Destino")
        }
      
        handlePerm(perms) {
          Alert.alert('Permissions', JSON.stringify(perms));
        }
}
//Home
const Home = () => {
return (
  <View style={styles.container}>
        <Text style={styles.title}>
          Tela Destino para Notificação
        </Text>

      </View>
);
};
const App = () => {

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Notify" component={ScreenOne} />
          <Stack.Screen name="Destino" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
);
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
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
export default App;