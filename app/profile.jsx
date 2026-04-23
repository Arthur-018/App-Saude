import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { supabase } from "../lib/supabase";
import { calculateAge } from "../utils/calculateAge";
import { useRouter } from "expo-router";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
  };

  if (!profile) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/doctor.png")}
        style={styles.avatar}
      />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.info}>Idade: {calculateAge(profile.birth_date)}</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/consultas")}
      >
        <Text style={styles.buttonText}>Ver consultas</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#f5f7fb",
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 20,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  name: { fontSize: 22, fontWeight: "bold", color: "#1c3d5a" },
  info: { fontSize: 16, marginTop: 8, color: "#444" },
  button: {
    marginTop: 24,
    backgroundColor: "#2f80ed",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  loading: { textAlign: "center", marginTop: 40 },
});
