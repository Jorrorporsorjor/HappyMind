import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your existing screens
import HomeScreen from '@/screens/home';
import CommunityScreen from '@/screens/community';
import ResultsScreen from '@/screens/results';
import DocumentsScreen from '@/screens/documents';
import ProfileScreen from '@/screens/profile';
import TestScreen from '@/screens/test';
import AiScreen from '@/screens/Ai';
import NotificationScreen from '@/screens/notification';
import HelpCenterScreen from '@/screens/helpcenter';
import ARScreen from '@/screens/ARscan';

//
import LoginScreen from '@/screens/login';
import SignupScreen from '@/screens/signup';
import ForgotPasswordScreen from '@/screens/forgot';
import PersonalDataScreen from '@/screens/personalData';

// Admin screens
import AdminCommunityScreen from '@/Adscreens/AdminCommunity';
import AdminDocumentsScreen from '@/Adscreens/AdminDocuments';
import AdminMediaScreen from '@/Adscreens/AdminMedia';

// Test screens
import Test1Screen from '@/formScreens/test1';
import Test2Screen from '@/formScreens/test2';
import Test3Screen from '@/formScreens/test3';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
          tabBarLabel: 'หน้าหลัก',
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
          tabBarLabel: 'ชุมชน',
        }}
      />
      <Tab.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={24} color={color} />
          ),
          tabBarLabel: 'ผลลัพธ์',
        }}
      />
      <Tab.Screen
        name="Documents"
        component={DocumentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={24} color={color} />
          ),
          tabBarLabel: 'เอกสาร',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
          tabBarLabel: 'บัญชี',
        }}
      />
    </Tab.Navigator>
  );
}

const AdminNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Community"
        component={AdminCommunityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
          tabBarLabel: 'ชุมชน',
        }}
      />
      <Tab.Screen
        name="Documents"
        component={AdminDocumentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={24} color={color} />
          ),
          tabBarLabel: 'เอกสาร',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
          tabBarLabel: 'บัญชี',
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="PersonData" component={PersonalDataScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Test1" component={Test1Screen} />
        <Stack.Screen name="Test2" component={Test2Screen} />
        <Stack.Screen name="Test3" component={Test3Screen} />
        <Stack.Screen name="AR" component={ARScreen} />
        <Stack.Screen name="Ai" component={AiScreen} />
        <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="AdminTabs" component={AdminNavigator} />
        <Stack.Screen name="AdminMedia" component={AdminMediaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
