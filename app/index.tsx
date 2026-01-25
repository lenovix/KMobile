import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simulasi proses loading (misal: cek user login, load DB)
    const prepareApp = async () => {
      // Tunggu 2 detik
      setTimeout(() => {
        // Pindah ke Launcher (Gunakan 'replace' agar tidak bisa di-back)
        router.replace("/launcher");
      }, 2000);
    };

    prepareApp();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>K-Mobile</Text>
      <Text style={styles.subLogo}>Super App System</Text>
      <ActivityIndicator
        size="large"
        color="#007AFF"
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  subLogo: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
