import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function App() {

  const [world, setWorld] = useState([]);

  useEffect(() => {

    const ws = new WebSocket("wss://mmo-server.com");

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      setWorld(data.players);
    };

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", id: "player1" }));
    };

  }, []);

  return (
    <View>
      <Text>🌍 VAULT MMO LIVE</Text>

      {world.map((p, i) => (
        <Text key={i}>
          {p.name} | HP: {p.hp}
        </Text>
      ))}
    </View>
  );
}