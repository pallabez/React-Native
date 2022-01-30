import React from 'react';
import { FlatList, Text, View, StatusBar, StyleSheet, SafeAreaView, Alert, Button, Image , Dimensions, TouchableOpacity} from 'react-native';
import { NavigationContainer, NavigationProp, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useState } from 'react';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    price: 59.99,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    price: 45.47,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    price: 30.81,
  },
];

const ItemButton = () => {
  return (
    <View style={styles.itemButtonContainer}>
      <TouchableOpacity
        style={[styles.itemButton, {borderTopLeftRadius: 6, borderBottomLeftRadius: 6}]}
        onPress={() => {}}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <View style={styles.itemCount}> 
        <Text style={styles.buttonText}>3</Text>
      </View>
      <TouchableOpacity
        style={[styles.itemButton, {borderTopRightRadius: 6, borderBottomRightRadius: 6}]}
        onPress={() => {}}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const Item: React.FC = ({ title, id, price}) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        style={{
          width: 100,
          height: 100,
          borderWidth: 2,
        }}
        source={require('./shopping-bag.png')}
      />
      <View style={styles.itemDetailContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{fontSize: 20,fontWeight: "bold"}}>$ {price} </Text>
        <ItemButton />
      </View>
    </View>
  );
}

const HomeScreen: React.FC<{}> = ({ navigation }) => {
  const [data, setData] = useState(DATA);

  const renderItem: React.FC<{item : {id: String, title: String}}> = ({item}) => (
    <Item 
      title={item.title}
      price={item.price}
      id={item.id}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('Checkout')}
      >
        <Text style={{ fontSize: 20, textAlign: 'center'}}>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const CheckoutScreen = () => {
  return (
    <Text>
    </Text>
  );
};


const Stack = createNativeStackNavigator();

const App: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cart' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 18,
  },
  buttonText: { 
    fontSize: 20, 
    textAlign: 'center', 
    textAlignVertical: 'center',
    margin: 4,
  },
  itemContainer: { 
    marginBottom: 20,
    padding: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomWidth: 0.5,
    borderColor: '#0F1111',
  },
  itemDetailContainer: {
    justifyContent: "space-evenly",
    marginLeft: 32,
  },
  itemButtonContainer: {
    flexDirection: 'row',
  },
  itemButton: {
    width: 50,
    backgroundColor: '#e7e9ec',
    borderColor: '#8D9096',
    borderWidth: 1,
  },
  itemCount: {
    width: 70,
    borderColor: '#8D9096',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  checkoutButton: {
    marginBottom: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#ffd814',
    paddingVertical: 12,
  }
});

export default App;