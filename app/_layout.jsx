import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const current = segments[0];
    const publicRoutes = ["index", "login", "register"];
    const protectedRoutes = ["home", "profile", "consultas"];

    if (!session && protectedRoutes.includes(current)) {
      router.replace("/login");
    } else if (session && publicRoutes.includes(current)) {
      router.replace("/home");
    }
  }, [session, segments, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2f80ed" />
      </View>
    );
  }

  if (!session) {
    return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ title: "Perfil" }} />
      <Stack.Screen name="consultas" options={{ title: "Consultas" }} />
    </Stack>
  );
}
