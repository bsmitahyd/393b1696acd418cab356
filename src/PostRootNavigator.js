import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FetchPosts from './FetchPosts';
import DisplayPost from "./DisplayPost";

const Stack = createStackNavigator();

const RootNavigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FetchPosts">
        <Stack.Screen
          name="FetchPosts"
          component={FetchPosts}
          options={{title: 'FetchPosts'}}
          navigation={props.navigation}
        />

        <Stack.Screen
          name="DisplayPost"
          component={DisplayPost}
          options={{title: 'DisplayPost'}}
          navigation={props.navigation}
          route={props.route}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
