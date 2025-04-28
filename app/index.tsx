import {Text, View, Button } from "react-native";
import {Link, useRouter} from "expo-router";
import './global.css';

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-4xl text-primary">Flow of a Falling Film Calculator</Text>
      <Button title="Calculate"  onPress={() => router.push('/calc')}/>
      <Button title="History"  onPress={() => router.push('/history')}/>
    </View>
  );
}
 