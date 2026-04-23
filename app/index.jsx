import { router } from "expo-router";
import { Alert, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {

   const handleCreateAccountPress = () => {
    Alert.alert(
      "Você já tem uma conta do app?",
      "Escolha uma opção para continuar.",
      [
        {
          text: "NÃO",
          style: "cancel",
          onPress: () => router.push("./register")
        },
        {
          text: "SIM",
          onPress: () => router.push("./login")
        }
      ],
      {cancelable: true}
    );
   };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/entrar.jpg")}
        style={styles.image}
      >
        <Pressable onPress={(handleCreateAccountPress)}>
        <Text style={styles.text}>
          Entrar
     </Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#158cec"
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",       
  },
  text: {
    textAlign: "center",
    color: "#060606", 
    fontSize: 36,
    marginBottom: 450, 
    fontWeight: "bold", 
  },
});