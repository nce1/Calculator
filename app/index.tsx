import {Text, View, Button } from "react-native";
import {useRouter} from "expo-router";
import * as FileSystem from 'expo-file-system';
import React from 'react'
import './global.css';

export default function Index() {
  const router = useRouter();
  const monitorFile = async() => {
    const path = FileSystem.documentDirectory + 'history.txt';
    try{
      const file = await FileSystem.getInfoAsync(path);
      if (!file.exists)
        await FileSystem.writeAsStringAsync(path, '');
    } catch(error){
      console.log(error);
    }
  }
  React.useEffect(() => {
    monitorFile();
  }, []);
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-4xl text-primary">Flow of a Falling Film Calculator</Text>
      <Button title="Calculate"  onPress={() => router.push('/calc')}/>
      <Button title="History"  onPress={() => router.push('/history')}/>
    </View>
  );
}
 