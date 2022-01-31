import React, { useState, createContext, useContext } from 'react'
import { FlatList, Text, View, StatusBar, StyleSheet, SafeAreaView, Alert, Button, Image , Dimensions, TouchableOpacity} from 'react-native';
import { NavigationContainer, NavigationProp, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const ItemButton = ({ price }) => {
  const [count, setCount] = useState(0);
  const {total, setTotal, numberOfItems, setNumberOfItems} = useContext(ItemContext);

  return (
    <View style={styles.itemButtonContainer}>
      <TouchableOpacity
        style={[styles.itemButton, {borderTopLeftRadius: 6, borderBottomLeftRadius: 6}]}
        disabled={count == 0}
        onPress={() => {
          setCount(count - 1);
          setTotal(Math.round((total - price)*100)/100);
          setNumberOfItems(numberOfItems - 1);
        }}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <View style={styles.itemCount}> 
        <Text style={styles.buttonText}>{count}</Text>
      </View>
      <TouchableOpacity
        style={[styles.itemButton, {borderTopRightRadius: 6, borderBottomRightRadius: 6}]}
        onPress={() => {
          setCount(count + 1);
          setTotal(Math.round((total + price)*100)/100);
          setNumberOfItems(numberOfItems + 1);
        }}
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
        <ItemButton price={price}/>
      </View>
    </View>
  );
}

const ItemContext = createContext();

const HomeScreen: React.FC<{}> = ({ navigation }) => {
  const [data, setData] = useState(DATA);
  const {total, numberOfItems} = useContext(ItemContext);

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
        onPress={() => navigation.navigate(`Checkout`)}
      >
        <Text style={{ fontSize: 20, textAlign: 'center'}}>Checkout ({numberOfItems})</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const SuffixTest = ({addStyle, children}) => {
  return (
    <Text style={[styles.suffixTest, addStyle]}>{children}</Text>
  )
}

const CheckoutScreen = ({navigation}) => {
  const {total, numberOfItems} = useContext(ItemContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: "row", margin: 25}}>
        <Text style={{fontSize: 25}}>Total </Text>
        <SuffixTest addStyle={{fontSize:20, fontWeight:'bold'}} children='$'/>
        <Text style={{fontSize: 25, fontWeight:'bold'}}> {total}</Text>
      </View>
      <View style={styles.checkoutContainer}>
        <Text style={{fontSize: 25}}>Total items: {numberOfItems}</Text>
      </View>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => Alert.alert('Itne paise mein itna hi milega')}
      >
        <Text style={{ fontSize: 20, textAlign: 'center'}}>Pay ${total}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();

const App: React.FC<{}> = () => {
  const [total, setTotal] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);

  return (
    <ItemContext.Provider value={{total, setTotal, numberOfItems, setNumberOfItems}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cart' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ItemContext.Provider>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  suffixTest: {
    fontSize: 25,
  },
  itemContainer: { 
    marginBottom: 20,
    padding: 20,
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
    marginTop: 25,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#ffd814',
    paddingVertical: 12,
  }, 
  checkoutContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    marginHorizontal: 25,
  }
});

export default App;