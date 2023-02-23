import PushNotification from "react-native-push-notification"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
  let navegador;
  let lastId;
  class Notification {

      setNavegador(novoConteudo)
      {
          navegador = novoConteudo
      }
      setLastId()
      {
          lastId = this.lastId++;
      }

      //Criar canal para as notificações serem disparadas 
      criarCanal = () => {
        PushNotification.createChannel(
            {
            channelId: "channel-id", // (required)
            channelName: "My channel", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            //importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
      }

      // Configuração orientada pela documentação do React Native Push Notification
      // Essa configuração garante o funcionamento da biblioteca no Android e no iOS
      configurar = () => {
          PushNotification.configure({
              onRegister: function (token) {
                  console.log("[NotificationManager] onRegister token:", token);
                },
              onNotification: function (notification) {
                console.log("[NotificationManager] onNotification:", notification);
                navegador.navigate("ScreenDestiny")
              },
              onAction: function(notification){
                  console.log("ACTION:", notification.action)
              }
          })
      }

      // É aqui que nossa notificação para o Android é construida
      buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
          return {
              id: id,
              autoCancel: true,
              channelId: "channel-id",
              largeIcon: options.largeIcon || "ic_launcher",
              smallIcon: options.smallIcon || "ic_launcher",
              bigText: message || '',
              subText: title || '',
              vibrate: options.vibrate || false,
              vibration: options.vibration || 300,
              priority: options.priority || "high",
              importance: options.importance || "high",
              data: data            
          }
      }

      // Fução que exibe a notificação
      showNotification = (id, title, message, data = {}, options = {}) => {
          PushNotification.localNotification({
              /* Propriedades do Android */
              ...this.buildAndroidNotification(id, title, message, data, options),

              /* Propriedades do Android e iOS */
              title: title || "",
              message: message || "",
              playSound: options.playSound || false,
              soundName: options.soundName || 'default',
              userInteraction: false
          })
      }

      // Função que cancela todas notiificações e limpa as que estão no centro de notificações
      cancelAllLocalNotification = () => {
          PushNotification.cancelAllLocalNotifications();
      }

      agendarNotificacao() {
        PushNotification.localNotificationSchedule({
          date: new Date(Date.now() + 300 * 1000), // in 300 secs
    
          /* Android Only Properties */
          channelId: 'channel-id',
          ticker: 'My Notification Ticker', // (optional)
          autoCancel: true, // (optional) default: true
          largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
          smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
          bigText: 'Clique para acessar o aplicativo', // (optional) default: "message" prop
          subText: 'This is a subText', // (optional) default: none
          color: 'blue', // (optional) default: system default
          vibrate: true, // (optional) default: true
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
          tag: 'some_tag', // (optional) add tag to message
          group: 'group', // (optional) add group to message
          groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
          ongoing: false, // (optional) set whether this is an "ongoing" notification // (Android only) See the doc for notification actions to know more
          invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
          repeatTime: 900 * 1000, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
          repeatType: 'time',
          when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
          usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
          timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
        
          /* iOS only properties */
          category: '', // (optional) default: empty string
          
          /* iOS and Android properties */
          id: this.setLastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
          title: 'Venha aproveitar o Cupom de Frete Grátis!', // (optional)
          message: 'Cupom de Frete Grátis', // (required)
          userInfo: { screen: "index" }, // (optional) default: {} (using null throws a JSON value '<null>' error)
          number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
          });

          PushNotification.localNotificationSchedule({
            date: new Date(Date.now() + 600 * 1000), // in 600 secs

            /* Android Only Properties */
            channelId: 'channel-id',
            ticker: 'My Notification Ticker', // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
            smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: 'Clique para acessar o aplicativo', // (optional) default: "message" prop
            subText: 'This is a subText', // (optional) default: none
            color: 'blue', // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: 'group', // (optional) add group to message
            groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
            ongoing: false, // (optional) set whether this is an "ongoing" notificati // (Android only) See the doc for notification actions to know more
            invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
            repeatTime: 1800 * 1000, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
            repeatType: 'time',
            when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
            usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
            timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
          
            /* iOS only properties */
            category: '', // (optional) default: empty string
            
            /* iOS and Android properties */
            id: this.setLastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            title: 'Venha pedir seu prato favorito!', // (optional)
            message: 'Lembrete de Refeição', // (required)
            userInfo: { screen: "index" }, // (optional) default: {} (using null throws a JSON value '<null>' error)
            number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
          });
                    PushNotification.localNotificationSchedule({
                      date: new Date(Date.now() + 900 * 1000), // in 900 secs

                      /* Android Only Properties */
                      channelId: 'channel-id',
                      ticker: 'My Notification Ticker', // (optional)
                      autoCancel: true, // (optional) default: true
                      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
                      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
                      bigText: 'Clique para acessar o aplicativo', // (optional) default: "message" prop
                      subText: 'This is a subText', // (optional) default: none
                      color: 'blue', // (optional) default: system default
                      vibrate: true, // (optional) default: true
                      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                      tag: 'some_tag', // (optional) add tag to message
                      group: 'group', // (optional) add group to message
                      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
                      ongoing: false, // (optional) set whether this is an "ongoing" notificati // (Android only) See the doc for notification actions to know more
                      invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
                      repeatTime: 2700 * 1000, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
                      repeatType: 'time',
                      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
                      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
                      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
                    
                      /* iOS only properties */
                      category: '', // (optional) default: empty string
                      
                      /* iOS and Android properties */
                      id: this.setLastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                      title: 'Venha aproveitar a Grande Semana de Ofertas!', // (optional)
                      message: 'Ofertas Imperdíveis', // (required)
                      userInfo: { screen: "index" }, // (optional) default: {} (using null throws a JSON value '<null>' error)
                      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
          });
      }

  }

  export const notificationManager = new Notification();