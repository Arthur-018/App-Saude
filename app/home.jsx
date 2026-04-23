import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Pressable
        style={styles.profileButton}
        onPress={() => router.push("/profile")}
      >
        <Text style={styles.profileText}>Perfil</Text>
      </Pressable>

      <Image
        source={require("../assets/images/home-header.png")}
        style={styles.header}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>Olá!</Text>
        <Text style={styles.subtitle}>
          Cuide da sua saúde marcando uma consulta.
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/agendar")}
        >
          <Text style={styles.primaryText}>Agendar Consulta</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push("/consultas")}
        >
          <Text style={styles.secondaryText}>Ver consultas</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fb" },
  header: {
    width: "100%",
    height: 200,
    marginTop: 90,
  },
  content: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1c3d5a",
    marginTop: 8,
  },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 24, marginTop: 4 },
  profileButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#2f80ed",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    zIndex: 10,
  },
  profileText: { color: "#fff", fontWeight: "bold" },
  primaryButton: {
    backgroundColor: "#2f80ed",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  secondaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  secondaryText: { color: "#1c3d5a", fontWeight: "bold", fontSize: 16 },
});
