import React from 'react';
import { FlatList, Text, View, StatusBar, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { useState } from 'react';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const rightAction = () => {
  return (
    <View style={{
      backgroundColor: '#c70000',
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: 20,
      flex: 1,
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: '500',
        color: '#f2b5b4',
      }}>
        Delete Card
      </Text>
    </View>
  )
}



const Item: React.FC<{title: String, id: String, deleteItem:Function}> = ({ title, id, deleteItem}) => {
  return (
    <Swipeable
      renderRightActions={rightAction}
      onSwipeableRightOpen={() => deleteItem(id)}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Swipeable>
  );
}

const App: React.FC<{}> = () => {
  const [data, setData] = useState(DATA);

  const deleteItem = (currId:string) => {
    const temp = data.filter(item => item.id !== currId);
    setData(temp);
  }

  const renderItem: React.FC<{item : {id: String, title: String}}> = ({item}) => (
    <Item 
      title={item.title}
      id={item.id}
      deleteItem={deleteItem}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
  },
});

export default App;