import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronRight,
  Eye,
  EyeOff,
  Wallet,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(true);

  const lineData = [
    { value: 15, label: "Sen" },
    { value: 30, label: "Sel" },
    { value: 26, label: "Rab" },
    { value: 40, label: "Kam" },
    { value: 18, label: "Jum" },
    { value: 35, label: "Sab" },
  ];

  return (
    // Gunakan View biasa karena SafeArea sudah dihandle oleh _layout.tsx
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1. Header & Total Balance */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Halo, IT Junior! 👋</Text>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.balanceTitle}>Total Saldo</Text>
              <Text style={styles.balanceAmount}>
                {showBalance ? "Rp 15.250.000" : "••••••••"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowBalance(!showBalance)}
              style={styles.eyeBtn}
            >
              {showBalance ? (
                <EyeOff color="white" size={24} />
              ) : (
                <Eye color="white" size={24} />
              )}
            </TouchableOpacity>
          </View>

          {/* Quick Report Card */}
          <View style={styles.quickReport}>
            <View style={styles.reportItem}>
              <ArrowDownCircle color="#fff" size={20} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.reportLabel}>Pemasukan</Text>
                <Text style={styles.reportValue}>Rp 20jt</Text>
              </View>
            </View>
            <View style={styles.reportDivider} />
            <View style={styles.reportItem}>
              <ArrowUpCircle color="#fff" size={20} />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.reportLabel}>Pengeluaran</Text>
                <Text style={styles.reportValue}>Rp 4.7jt</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* 2. Wallet List */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dompet Saya</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.walletScroll}
          >
            <View style={[styles.walletCard, { backgroundColor: "#3498db" }]}>
              <Wallet color="white" size={20} />
              <Text style={styles.walletName}>Cash</Text>
              <Text style={styles.walletMoney}>Rp 500k</Text>
            </View>
            <View style={[styles.walletCard, { backgroundColor: "#9b59b6" }]}>
              <Wallet color="white" size={20} />
              <Text style={styles.walletName}>Bank BCA</Text>
              <Text style={styles.walletMoney}>Rp 14.7jt</Text>
            </View>
          </ScrollView>

          {/* 3. Laporan Mingguan */}
          <View style={styles.chartCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Laporan Mingguan</Text>
              <TouchableOpacity>
                <ChevronRight color="#2ecc71" />
              </TouchableOpacity>
            </View>
            <View style={styles.chartWrapper}>
              <LineChart
                data={lineData}
                height={120}
                width={280}
                initialSpacing={20}
                color="#2ecc71"
                thickness={3}
                hideDataPoints
                noOfSections={3}
                yAxisTextStyle={{ color: "#999", fontSize: 10 }}
                xAxisLabelTextStyle={{ color: "#999", fontSize: 10 }}
                areaChart
                startFillColor="rgba(46, 204, 113, 0.3)"
                endFillColor="rgba(46, 204, 113, 0.01)"
              />
            </View>
          </View>

          {/* 4. Pengeluaran Teratas */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pengeluaran Teratas</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Detail</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <View style={[styles.iconBox, { backgroundColor: "#ffeaa7" }]}>
                <Text>🍔</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>Makanan</Text>
                <Text style={styles.itemSub}>45%</Text>
              </View>
              <Text style={styles.itemAmount}>Rp 2.100.000</Text>
            </View>
          </View>

          {/* 5. Transaksi Terakhir */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transaksi Terakhir</Text>
          </View>
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.transCard}>
              <View style={styles.transIcon}>
                <Text>💰</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>Pembayaran Listrik</Text>
                <Text style={styles.itemSub}>25 Jan 2026</Text>
              </View>
              <Text style={[styles.itemAmount, { color: "#e74c3c" }]}>
                - Rp 350.000
              </Text>
            </View>
          ))}

          {/* Padding bawah agar tidak tertutup tab bar */}
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    backgroundColor: "#2ecc71",
    padding: 20,
    paddingTop: 20, // Diperkecil karena sudah ada SafeArea di Root
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
  },
  greeting: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "500" },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  balanceTitle: { color: "white", fontSize: 14, opacity: 0.9 },
  balanceAmount: { color: "white", fontSize: 30, fontWeight: "bold" },
  eyeBtn: { padding: 5 },
  quickReport: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    marginTop: 25,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
  reportItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  reportDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  reportLabel: { color: "#eee", fontSize: 10 },
  reportValue: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  content: { paddingHorizontal: 20, marginTop: -20 }, // Margin negatif agar konten agak naik menumpuk header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 17, fontWeight: "bold", color: "#2d3436" },
  seeAll: { color: "#2ecc71", fontSize: 13, fontWeight: "700" },
  walletScroll: { flexDirection: "row", marginBottom: 5 },
  walletCard: {
    padding: 20,
    borderRadius: 24,
    width: 160,
    marginRight: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  walletName: { color: "white", marginTop: 12, fontSize: 12, opacity: 0.8 },
  walletMoney: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 2,
  },
  chartCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
  },
  chartWrapper: { alignItems: "center", marginTop: 10, paddingRight: 20 },
  listContainer: { backgroundColor: "white", borderRadius: 24, padding: 10 },
  listItem: { flexDirection: "row", alignItems: "center", padding: 12 },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemTitle: { fontWeight: "700", color: "#2d3436", fontSize: 15 },
  itemSub: { color: "#b2bec3", fontSize: 12, marginTop: 2 },
  itemAmount: { fontWeight: "800", fontSize: 15 },
  transCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 1,
  },
  transIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#f1f2f6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
});
