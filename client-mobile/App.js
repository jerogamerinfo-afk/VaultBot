import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function App() {

  const [world, setWorld] = useState([]);

  useEffect(() => {

    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (msg) => {
      setWorld(JSON.parse(msg.data).players);
    };

  }, []);

  return (
    <View>
      <Text>🌍 VAULT MMO MOBILE</Text>

      {world.map((p, i) => (
        <Text key={i}>{p.name} - lvl {p.level}</Text>
      ))}
    </View>
  );
}