import { View } from 'native-base';
import React from 'react';
import { ScrollView,StyleSheet} from 'react-native';

const DisplayPost =()=>{
    const{data}=route.params;
    return(
        <View style={{flex:1}}> 
            <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}>
                <Text style={styles.text}>{JSON.stringify(data)}</Text>
            </ScrollView>
        </View>
    );
};

const styles=StyleSheet.create({
  container:{
      margin:25,
  },
  text:{
      fontSize:18,
  },
});

export default DisplayPost;