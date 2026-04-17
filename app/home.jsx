import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";


export default function Home() {
    return (
        <View style={styles.container}>
            <View>
                <ImageBackground source={require("../assets/images/home-fundo.png")} style={styles.image}>
                    
                    <Pressable style={styles.profileButton} onPress={() => router.navigate("./profile")}>
                        <Ionicons name="person-circle-outline" size={40} color={"#FFF"} />
                    </Pressable>
                </ImageBackground>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000000"
    },
    profileButton: {
        position: "absolute",
        top: 50,
        right: 20,
    }
})