import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { supabase } from "../lib/supabase";

export default function Consultas() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id);

    setDataList(data || []);
  };

  return (
    <FlatList
      data={dataList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.appointment_date}</Text>
          <Text>{item.status}</Text>
        </View>
      )}
    />
  );
}