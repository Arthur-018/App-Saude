import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import Input from "../components/Input";
import Button from "../components/Button";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Home() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const onChangeDate = (event, selected) => {
    setShowDate(Platform.OS === "ios");
    if (selected) setDate(selected.toISOString().split("T")[0]);
  };

  const onChangeTime = (event, selected) => {
    setShowTime(Platform.OS === "ios");
    if (selected) {
      const hh = String(selected.getHours()).padStart(2, "0");
      const mm = String(selected.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm}`);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Pressable style={styles.profileButton} onPress={() => router.push("/profile")}>
        <Text style={styles.profileText}>Perfil</Text>
      </Pressable>

      <Image
        source={require("../assets/images/home-header.png")}
        style={styles.header}
        resizeMode="cover"
      />

      <Text style={styles.title}>Agendar consulta</Text>

      <Pressable onPress={() => setShowDate(true)}>
        <View pointerEvents="none">
          <Input placeholder="Data da consulta" value={date} editable={false} />
        </View>
      </Pressable>
      {showDate && (
        <DateTimePicker
          value={date ? new Date(date) : new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()}
        />
      )}

      <Pressable onPress={() => setShowTime(true)}>
        <View pointerEvents="none">
          <Input placeholder="Hora da consulta" value={time} editable={false} />
        </View>
      </Pressable>
      {showTime && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={onChangeTime}
          is24Hour
        />
      )}

      <Button title="Agendar" onPress={handleCreate} />

      <Pressable style={styles.consultasButton} onPress={() => router.push("/consultas")}>
        <Text style={styles.consultasText}>Ver consultas</Text>
      </Pressable>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  header: {
    width: "100%",
    height: 180,
    marginTop: 90,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 20,
    color: "#1c3d5a",
  },
  profileButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#2f80ed",
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  profileText: { color: "#fff", fontWeight: "bold" },
  consultasButton: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 12,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  consultasText: { textAlign: "center", fontWeight: "bold" },
  logoutButton: {
    marginTop: 12,
    marginHorizontal: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e63946",
  },
  logoutText: { textAlign: "center", color: "#e63946", fontWeight: "bold" },
});

// Apply margin to inputs container by wrapping in View
