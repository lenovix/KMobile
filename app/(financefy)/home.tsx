import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Halo, IT Junior!</Text>
        <Text style={styles.title}>Total Balance</Text>
        <Text style={styles.balance}>Rp 15.000.000</Text>
      </View>

      {/* Content Dummy */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.emptyState}>
          <Text style={{ color: "#999" }}>Belum ada data database</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#2ecc71",
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  title: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
  balance: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyState: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
});
