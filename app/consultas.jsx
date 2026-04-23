import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";

export default function Consultas() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("appointments")
        .select("*")
        .eq("user_id", user.id)
        .order("appointment_date", { ascending: true });

      setDataList(data || []);
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

  if (dataList.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Nenhuma consulta agendada.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
      data={dataList}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.row}>
            <Text style={styles.label}>Data: </Text>
            {item.appointment_date}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Hora: </Text>
            {item.appointment_time}
          </Text>
          {item.doctor_name ? (
            <Text style={styles.row}>
              <Text style={styles.label}>Médico: </Text>
              {item.doctor_name}
            </Text>
          ) : null}
          {item.posto ? (
            <Text style={styles.row}>
              <Text style={styles.label}>Posto: </Text>
              {item.posto}
            </Text>
          ) : null}
          <Text style={[styles.row, styles.status]}>{item.status}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fb" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f7fb",
  },
  empty: { color: "#666", fontSize: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  row: { fontSize: 15, color: "#1c3d5a", marginBottom: 4 },
  label: { fontWeight: "bold", color: "#2f80ed" },
  status: { marginTop: 4, color: "#27ae60", fontWeight: "bold" },
});
