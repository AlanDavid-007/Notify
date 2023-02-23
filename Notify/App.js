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
//Navigation import
import {notificationManager} from './components/NotificationHandler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './components/Index';
import ScreenDestiny from './components/ScreenDestiny';

const Stack = createStackNavigator();
const notificador = notificationManager;
//  //Screen One
//  class ScreenOne extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//     this.notif = new NotifService(
//       this.onRegister.bind(this),
//       this.onNotif.bind(this),
//     );
//   }
  
  
//   render(){
   
//   return (
//     <View style={styles.container}>
//         <Text style={styles.title}>
//           Notify
//         </Text>
//         <View style={styles.spacer}></View>
//         <Image source={require('./assets/logo.png')} style={{width: 150, height: 150}} />
//         <View style={styles.spacer}></View>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.localNotif();
//           }}>
//           <Text>Testar Notificação (now)</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.scheduleNotif(); 
//           }}>
//           <Text>Aperte para Receber Notificações sobre Cupons</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.scheduleNotif2(); 
//           }}>
//           <Text>Aperte para Receber Notificações sobre Refeições</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.scheduleNotif3(); 
//           }}>
//           <Text>Aperte para Receber Notificações sobre Ofertas</Text>
//         </TouchableOpacity>
//       </View>
//   )
//         }
//         onRegister(token) {
//           this.setState({registerToken: token.token, fcmRegistered: true});
//         }
      
//         onNotif(notif) {

//           Alert.alert(notif.title, notif.message);
    
//           // navigation.navigate("Destino")
//         }
      
//         handlePerm(perms) {
//           Alert.alert('Permissions', JSON.stringify(perms));
//         }
// }
// //Home
// const Home = () => {
// return (
//   <View style={styles.container}>
//         <Text style={styles.title}>
//           Tela Destino para Notificação
//         </Text>

//       </View>
// );
// };

  export default class App extends Component {
    constructor(props) {
      super(props)
    }
  
    componentDidMount() {
      notificador.configurar()
      // notificador.criarCanal()
      // notificador.agendarNotificacao()
    }
  
    disparar = () => {
      notificador.showNotification(
        1,
        "Seja Bem Vindo!",
        "Veja nosso Github para Mais!",
        {}, // data
        {} // options
      )
    }
  
    cancelar = () => {
      notificador.cancelAllLocalNotification()
    }

    agendar = () => {
      notificador.agendarNotificacao()
    }
  
    render() {
    
      return(
        <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen name="Home">
              {
                ({navigation}) => {notificador.setNavegador(navigation); 
                return(<Index navegador={navigation} enviarNotificacao={this.disparar} cancelar={this.cancelar} agendar={this.agendar}/>)}
              }
            </Stack.Screen>
  
            <Stack.Screen name="ScreenDestiny">
              {({navigation}) => {return(<ScreenDestiny navegador={navigation} />)}}
            </Stack.Screen>
  
          </Stack.Navigator>
        </NavigationContainer>
      )
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