import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../lib/supabase";

const POSTOS = [
  "UBS Centro",
  "UBS Bom Jesus",
  "UBS Restinga",
  "UBS Lomba do Pinheiro",
  "UBS Vila Nova",
];

const DOCTORS = [
  "Dr. Carlos Silva - Clínico Geral",
  "Dra. Ana Souza - Pediatra",
  "Dr. Marcos Oliveira - Cardiologista",
  "Dra. Juliana Lima - Dermatologista",
];

export default function Agendar() {
  const router = useRouter();

  const [posto, setPosto] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctor, setDoctor] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const canConfirm = date && time && doctor && posto;

  const showAlert = (msg) => {
    if (Platform.OS === "web") window.alert(msg);
    else Alert.alert("Aviso", msg);
  };

  const handleConfirm = async () => {
    if (!canConfirm || saving) return;
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("appointments").insert([
      {
        user_id: user.id,
        appointment_date: date,
        appointment_time: time,
        doctor_name: doctor,
        posto,
        status: "scheduled",
      },
    ]);

    setSaving(false);

    if (error) {
      showAlert(error.message);
      return;
    }

    showAlert("Consulta agendada com sucesso!");
    router.replace("/consultas");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.title}>Agendar Consulta</Text>

      {/* Step 1 */}
      <View style={styles.card}>
        <Text style={styles.step}>1. Posto de Saúde</Text>
        {POSTOS.map((p) => (
          <Pressable
            key={p}
            style={[styles.option, posto === p && styles.optionActive]}
            onPress={() => setPosto(p)}
          >
            <Text
              style={[
                styles.optionText,
                posto === p && styles.optionTextActive,
              ]}
            >
              {p}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Step 2 */}
      {posto ? (
        <View style={styles.card}>
          <Text style={styles.step}>2. Data</Text>
          <Pressable style={styles.fakeInput} onPress={() => setShowDate(true)}>
            <Text style={styles.fakeInputText}>
              {date || "Selecionar data"}
            </Text>
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
        </View>
      ) : null}

      {/* Step 3 */}
      {date ? (
        <View style={styles.card}>
          <Text style={styles.step}>3. Horário</Text>
          <Pressable style={styles.fakeInput} onPress={() => setShowTime(true)}>
            <Text style={styles.fakeInputText}>
              {time || "Selecionar horário"}
            </Text>
          </Pressable>
          {showTime && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              is24Hour
              onChange={onChangeTime}
            />
          )}
        </View>
      ) : null}

      {/* Step 4 */}
      {date && time ? (
        <View style={styles.card}>
          <Text style={styles.step}>4. Médico</Text>
          {DOCTORS.map((d) => (
            <Pressable
              key={d}
              style={[styles.option, doctor === d && styles.optionActive]}
              onPress={() => setDoctor(d)}
            >
              <Text
                style={[
                  styles.optionText,
                  doctor === d && styles.optionTextActive,
                ]}
              >
                {d}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {/* Step 5 */}
      <Pressable
        style={[
          styles.confirm,
          (!canConfirm || saving) && styles.confirmDisabled,
        ]}
        onPress={handleConfirm}
        disabled={!canConfirm || saving}
      >
        <Text style={styles.confirmText}>
          {saving ? "Salvando..." : "Confirmar Agendamento"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fb", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1c3d5a",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  step: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1c3d5a",
    marginBottom: 12,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
  },
  optionActive: { backgroundColor: "#2f80ed", borderColor: "#2f80ed" },
  optionText: { color: "#1c3d5a", fontWeight: "500" },
  optionTextActive: { color: "#fff", fontWeight: "bold" },
  fakeInput: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafbfd",
  },
  fakeInputText: { color: "#1c3d5a", fontSize: 15 },
  confirm: {
    backgroundColor: "#2f80ed",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  confirmDisabled: { backgroundColor: "#a8c4ec" },
  confirmText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
