import React, { useState } from "react";
import { Text, View, TextInput, TextInputBase} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const App: React.FC<{}> = () => {
  const [length, setLength] = useState(0);
  const [color, setColor] = useState('#00A170');
  const [bgColor, setBg] = useState('#A0DAA9');
  const maxCount = 40;

  return (
    <View>
      <TextInput
        style={{
          fontSize: 20,
          height: 200,
          margin: 20,
          padding: 20,
          borderWidth: 2,
          borderRadius: 20,
          textAlignVertical: "top",
          borderColor: color,
          backgroundColor: bgColor,
        }}
        multiline={true}
        numberOfLines={4}
        placeholder="Type here!"
        placeholderTextColor="#00A170"
        onChange={(event) => {
          let len:number = event.nativeEvent.text.length;
          if(len < 30) {
            setColor('#00A170');
            setBg('#A0DAA9');
          }
          else if(len <= 40) {
            setColor('#ffc70f');
            setBg('#fce7a1');
          }
          else {
            setColor('#f32f2f');
            setBg('#ff9a9a');
          }
          return setLength(len);
          }
        }
      />
      <Text style={{
          textAlign: "center",
          fontSize: 20,
          color: color,
        }}
      >
        {maxCount - length}
      </Text>

    </View>
  );
}

export default App;