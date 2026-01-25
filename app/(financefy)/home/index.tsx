import {
    ArrowDownCircle,
    ArrowUpCircle,
    ChevronRight,
    Eye,
    EyeOff,
    Wallet,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { styles } from "./styles"; // Import style dari file sebelah

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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Selamat Malam, IT Junior! 👋</Text>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.balanceTitle}>Total Saldo Tersedia</Text>
              <Text style={styles.balanceAmount}>
                {showBalance ? "Rp 15.250.000" : "••••••••"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowBalance(!showBalance)}
              style={styles.eyeBtn}
            >
              {showBalance ? (
                <EyeOff color="#2ecc71" size={24} />
              ) : (
                <Eye color="#2ecc71" size={24} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.quickReport}>
            <View style={styles.reportItem}>
              <View style={styles.reportIconBg}>
                <ArrowDownCircle color="#2ecc71" size={20} />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.reportLabel}>Pemasukan</Text>
                <Text style={styles.reportValue}>Rp 20.000k</Text>
              </View>
            </View>
            <View style={styles.reportDivider} />
            <View style={styles.reportItem}>
              <View style={styles.reportIconBg}>
                <ArrowUpCircle color="#e74c3c" size={20} />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.reportLabel}>Pengeluaran</Text>
                <Text style={styles.reportValue}>Rp 4.750k</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* 2. Wallet List */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Portofolio Dompet</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.walletScroll}
          >
            <View
              style={[
                styles.walletCard,
                {
                  backgroundColor: "#1e1e1e",
                  borderColor: "#333",
                  borderWidth: 1,
                },
              ]}
            >
              <Wallet color="#2ecc71" size={20} />
              <Text style={styles.walletName}>Cash Flow</Text>
              <Text style={styles.walletMoney}>Rp 500k</Text>
            </View>
            <View
              style={[
                styles.walletCard,
                {
                  backgroundColor: "#1e1e1e",
                  borderColor: "#333",
                  borderWidth: 1,
                },
              ]}
            >
              <Wallet color="#3498db" size={20} />
              <Text style={styles.walletName}>Bank Mandiri</Text>
              <Text style={styles.walletMoney}>Rp 14.7jt</Text>
            </View>
          </ScrollView>

          {/* 3. Laporan Mingguan - Dark Chart */}
          <View style={styles.chartCard}>
            <View style={styles.sectionHeaderChart}>
              <Text style={styles.sectionTitle}>Analisis Mingguan</Text>
              <ChevronRight color="#2ecc71" size={20} />
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
                yAxisTextStyle={{ color: "#555", fontSize: 10 }}
                xAxisLabelTextStyle={{ color: "#555", fontSize: 10 }}
                rulesColor="#222"
                yAxisColor="#222"
                xAxisColor="#222"
                areaChart
                startFillColor="rgba(46, 204, 113, 0.2)"
                endFillColor="rgba(46, 204, 113, 0.0)"
              />
            </View>
          </View>

          {/* 4. Transaksi Terakhir */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Riwayat Terkini</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Detail</Text>
            </TouchableOpacity>
          </View>
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.transCard}>
              <View style={styles.transIcon}>
                <Text style={{ fontSize: 18 }}>💰</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>Subscription Netflix</Text>
                <Text style={styles.itemSub}>Entertainment • 25 Jan</Text>
              </View>
              <Text style={[styles.itemAmount, { color: "#e74c3c" }]}>
                - Rp 189.000
              </Text>
            </View>
          ))}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
    </View>
  );
}
