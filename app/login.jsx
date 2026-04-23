import { useRouter } from "expo-router";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";


export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
        } else {
            router.replace("/home");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Senha"
                secureTextEntry
                style={styles.input}
                onChangeText={setPassword}
            />

            <Pressable style={styles.button} onPress={handleLogin}> 
             <Text style={styles.buttonText}>Entrar</Text>
            </Pressable>

            <Pressable onPress={() => router.push("/register")}>
                <Text>Criar conta</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#1cc7f1"
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
    },
    button: {
        backgroundColor: "2f80ed",
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center"
    }
})