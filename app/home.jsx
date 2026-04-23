import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import Input from "../components/Input";
import Button from "../components/Button";
import { useRouter } from "expo-router";

export default function Home() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("appointments").insert([
      {
        user_id: user.id,
        appointment_date: date,
        appointment_time: time,
        status: "scheduled",
      },
    ]);

    alert("Consulta marcada!");
  };

  return (
    <View style={styles.container}>
      
      {/* 👤 BOTÃO DE PERFIL */}
      <Pressable
        style={styles.profileButton}
        onPress={() => router.push("/profile")}
      >
        <Text style={styles.profileText}>Perfil</Text>
      </Pressable>

      <Text style={styles.title}>Agendar consulta</Text>

      <Input placeholder="Data (YYYY-MM-DD)" onChangeText={setDate} />
      <Input placeholder="Hora (HH:MM)" onChangeText={setTime} />

      <Button title="Agendar" onPress={handleCreate} />

      {/* 📅 VER CONSULTAS */}
      <Pressable
        style={styles.consultasButton}
        onPress={() => router.push("/consultas")}
      >
        <Text style={styles.consultasText}>Ver consultas</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f7fb",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 60,
  },

  profileButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#2f80ed",
    padding: 10,
    borderRadius: 8,
  },

  profileText: {
    color: "#fff",
    fontWeight: "bold",
  },

  consultasButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },

  consultasText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});