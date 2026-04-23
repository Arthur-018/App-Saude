import { useEffect, useState } from "react";
import { View, Text } from "react-native";
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

  if (!profile) return <Text>Carregando...</Text>;

  return (
    <View>
      <Text>Nome: {profile.name}</Text>
      <Text>Idade: {calculateAge(profile.birth_date)}</Text>

      <Text onPress={() => router.push("/consultas")}>
        Ver consultas
      </Text>
    </View>
  );
}