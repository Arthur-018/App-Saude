import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { supabase } from "../lib/supabase";
import { useRouter } from "expo-router";
import Input from "../components/Input";
import Button from "../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (loading) return;
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          name,
          birth_date: birthDate,
        },
      ]);
    }

    if (Platform.OS === "web") {
      window.alert("Conta criada! Faça login.");
    } else {
      Alert.alert("Conta criada!", "Faça login.");
    }
    setLoading(false);
    router.replace("/login");
  };

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      const iso = selectedDate.toISOString().split("T")[0];
      setBirthDate(iso);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f5f7fb" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Cadastro</Text>

        <Input placeholder="Nome" value={name} onChangeText={setName} />

        <Pressable onPress={() => setShowPicker(true)}>
          <View pointerEvents="none">
            <Input
              placeholder="Data de nascimento"
              value={birthDate}
              editable={false}
            />
          </View>
        </Pressable>

        {showPicker && (
          <DateTimePicker
            value={birthDate ? new Date(birthDate) : new Date(2000, 0, 1)}
            mode="date"
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button
          title={loading ? "Criando conta..." : "Criar conta"}
          onPress={loading ? () => {} : handleRegister}
        />

        <Text style={styles.link} onPress={() => router.push("/login")}>
          Já tem conta? Entrar
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1c3d5a",
  },
  link: {
    textAlign: "center",
    marginTop: 16,
    color: "#2f80ed",
    fontWeight: "bold",
  },
});
