import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { supabase } from "../lib/supabase";
import { calculateAge } from "../utils/calculateAge";
import { useRouter } from "expo-router";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../assets/images/doctor.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{profile?.name || "Sem nome"}</Text>
        {profile?.birth_date ? (
          <Text style={styles.info}>
            Idade: {calculateAge(profile.birth_date)}
          </Text>
        ) : null}
        {profile?.phone ? (
          <Text style={styles.info}>Telefone: {profile.phone}</Text>
        ) : null}
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/consultas")}
      >
        <Text style={styles.buttonText}>Ver consultas</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.secondary]}
        onPress={async () => {
          await supabase.auth.signOut();
        }}
      >
        <Text style={[styles.buttonText, { color: "#e63946" }]}>Sair</Text>
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f7fb",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    backgroundColor: "#f5f7fb",
  },
  name: { fontSize: 22, fontWeight: "bold", color: "#1c3d5a" },
  info: { fontSize: 16, marginTop: 6, color: "#444" },
  button: {
    backgroundColor: "#2f80ed",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  secondary: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e63946",
  },
});
