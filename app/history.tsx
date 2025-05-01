import {StyleSheet, Text, View} from 'react-native'
import * as FileSystem from 'expo-file-system';
import React, {useState} from 'react'

const History = () =>{
    const [historyContent, setHistoryContent] = useState('');

    React.useEffect(() => {
      const readFile = async () => {
        const path = FileSystem.documentDirectory + 'history.txt';
        try {
          const file = await FileSystem.readAsStringAsync(path, {
            encoding: FileSystem.EncodingType.UTF8,
          });
          setHistoryContent(file);
        } catch (error) {
          console.log('Error reading file:', error);
          setHistoryContent('No history available.');
        }
        console.log('historyContent:', historyContent, "End");

      };
      readFile();
    }, []);
    return(
        <View style={styles.container}>
            <Text style={styles.title}>History</Text>
            <Text>{historyContent}</Text>
        </View>
    )
}
export default History
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    }
})