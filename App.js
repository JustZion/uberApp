import { StatusBar } from 'expo-status-bar';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from './sideMenu/Profile';
import SettingsScreen from './sideMenu/Settings';
import SavedScreen from './sideMenu/Saved';
import ReferScreen from './sideMenu/Refer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import CustomDrawer from './components/CustomDrawer';


const Drawer = createDrawerNavigator(); 

const DrawerRoutes = () => {
  return (
    
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{headerShown: false}}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
    
  )
}


export default function App() {
  const Stack = createNativeStackNavigator();
  


  return (
    <Provider store={store}>
       
      <NavigationContainer>
     
        <SafeAreaProvider>
          <KeyboardAvoidingView 
          enabled={true}
          behavior={Platform.OS==='ios' ? 'padding': 'height'}
          keyboardVerticalOffset={Platform.OS==='ios' ? 64: 0}
          style={{flex: 1}}>

            
            <Stack.Navigator>
              <Stack.Screen name='HomeScreen' component={DrawerRoutes}
              options=
              {{
                headerShown: false
              }}/>
          
              <Stack.Screen name='MapScreen' component={MapScreen}
              options=
              {{
                headerShown: false
              }}/>

              
            </Stack.Navigator>
          </KeyboardAvoidingView>
          

        </SafeAreaProvider>
      </NavigationContainer>
      
       
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
