import React,{Component} from 'react'
import {View, Button, Text, Image} from 'react-native'

export default function Index(props)
{
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <Text>
          Notify
            </Text>
            <Text></Text>
        <Image source={require('../assets/logo.png')} style={{width: 150, height: 150}} />
            <Button title="Testar notificação" onPress={ () => props.enviarNotificacao()}></Button>
            <Text></Text>
            <Button title="Cancelar notificação" onPress={ () => props.cancelar()}></Button>
            <Text></Text>
            <Button title="Receber novidades" onPress={ () => props.agendar()}></Button>
        </View>
    )
}