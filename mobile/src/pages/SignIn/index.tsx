import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function SignIn() {
  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      return;
    }

    await signIn({ email, password });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/logoImage.png")}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor="#f0f0f0"
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholderTextColor="#f0f0f0"
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e",
  },
  logo: {
    marginBottom: 18,
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input: {
    width: "95%",
    height: 40,
    backgroundColor: "#101026",
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: "#fff",
  },
  button: {
    width: "95%",
    height: 40,
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#101026",
  },
});
