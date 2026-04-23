import { useEffect } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function Profile () {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const {
            data: {user},
        } = await supabase.auth.getUser();

        const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

        setProfile(data);
    };

    if(!profile) return <Text>Carrgando...</Text>;

    return (
        <View>
            <Text>Nome: {profile.name}</Text>
        </View>
    )
}