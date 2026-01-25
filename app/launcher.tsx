import { useRouter } from "expo-router";
import { Wallet } from "lucide-react-native";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LauncherScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const apps = [
    {
      id: "financefy",
      name: "Financefy",
      desc: "Kelola uangmu",
      icon: <Wallet size={40} color="white" />, // Ukuran icon diperbesar sedikit
      color: "#2ecc71",
      route: "/(financefy)/home",
    },
    // Nanti modul baru muncul di sini
  ];

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Bagian Header agar tetap di atas */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>K-Mobile</Text>
        <Text style={styles.subHeader}>Pilih aplikasi untuk memulai</Text>
      </View>

      {/* Bagian Grid yang dibuat Center */}
      <View style={styles.centerWrapper}>
        <View style={styles.grid}>
          {apps.map((app) => (
            <TouchableOpacity
              key={app.id}
              activeOpacity={0.8}
              style={[styles.card, { backgroundColor: app.color }]}
              onPress={() => router.push(app.route as any)}
            >
              <View style={styles.iconContainer}>{app.icon}</View>
              <Text style={styles.appName}>{app.name}</Text>
              <Text style={styles.appDesc}>{app.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer opsional untuk mempercantik */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>IT Junior Project v1.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a1a",
  },
  subHeader: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  centerWrapper: {
    flex: 1, // Mengambil sisa ruang
    justifyContent: "center", // Center secara vertikal
    alignItems: "center", // Center secara horizontal
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Agar card di dalam grid juga center
    gap: 20,
  },
  card: {
    width: "42%", // Sedikit dikecilkan agar proporsional di tengah
    aspectRatio: 1,
    borderRadius: 28,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    // Shadow lebih halus
    elevation: 8,
    shadowColor: "#2ecc71",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  iconContainer: {
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 15,
  },
  appName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  appDesc: {
    fontSize: 11,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    marginTop: 4,
  },
  footer: {
    paddingBottom: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#ccc",
  },
});
