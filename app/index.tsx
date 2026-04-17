import { router } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/entrar.jpg")}
        style={styles.image}
      >
        <Pressable onPress={() => router.replace("./home")}>
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