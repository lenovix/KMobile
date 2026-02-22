import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Eye,
  EyeOff
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../services/database";
import { styles } from "./styles";

export default function HomeScreen() {
  const router = useRouter();

  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [wallets, setWallets] = useState<any[]>([]);
  const isFocused = useIsFocused();
  const [showBalance, setShowBalance] = useState(true);
  const [summary, setSummary] = useState({
    totalBalance: 0,
    income: 0,
    expense: 0,
  });

  useEffect(() => {
    if (isFocused) {
      loadHomeData();
    }
  }, [isFocused]);

  const loadHomeData = async () => {
    try {
      const walletRes: any = await db.getFirstAsync(
        "SELECT SUM(balance) as total FROM wallets",
      );

      const allWallets: any[] = await db.getAllAsync("SELECT * FROM wallets");
      setWallets(allWallets);

      const statsRes: any[] = await db.getAllAsync(`
      SELECT type, SUM(amount) as total 
      FROM transactions 
      WHERE strftime('%m', date) = strftime('%m', 'now')
      AND exclude_from_report = 0
      GROUP BY type
    `);

      const transRes: any[] = await db.getAllAsync(`
      SELECT * FROM transactions 
      ORDER BY date DESC 
      LIMIT 5
    `);
      setRecentTransactions(transRes);

      let income = 0;
      let expense = 0;
      statsRes.forEach((row) => {
        if (row.type === "income") income = row.total;
        if (row.type === "expense") expense = row.total;
      });

      setSummary({
        totalBalance: walletRes?.total || 0,
        income: income,
        expense: expense,
      });
    } catch (error) {
      console.error("Gagal memuat data home:", error);
    }
  };

  const formatCurrency = (val: number) => {
    return "Rp " + val.toLocaleString("id-ID");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Selamat Malam, Ichsanul Kamil Sudarmi! 👋</Text>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.balanceTitle}>Total Saldo Tersedia</Text>
              <Text style={styles.balanceAmount}>
                {showBalance
                  ? formatCurrency(summary.totalBalance)
                  : "••••••••"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowBalance(!showBalance)}
              style={styles.eyeBtn}
            >
              {showBalance ? (
                <EyeOff color="#2ecc71" size={22} />
              ) : (
                <Eye color="#2ecc71" size={22} />
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
                <Text style={[styles.reportValue, { color: "#2ecc71" }]}>
                  {formatCurrency(summary.income)}
                </Text>
              </View>
            </View>
            <View style={styles.reportDivider} />
            <View style={styles.reportItem}>
              <View style={styles.reportIconBg}>
                <ArrowUpCircle color="#e74c3c" size={20} />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.reportLabel}>Pengeluaran</Text>
                <Text style={[styles.reportValue, { color: "#e74c3c" }]}>
                  {formatCurrency(summary.expense)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.sectionHeaderChart}>
            <Text style={styles.sectionTitle}>Portofolio Dompet</Text>
            <TouchableOpacity onPress={() => router.push("/wallets")}>
              <Text style={styles.seeAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.walletScroll}
          >
            {wallets.length > 0 ? (
              wallets.map((wallet) => (
                <TouchableOpacity
                  key={wallet.id}
                  onPress={() => router.push({
                    pathname: "/(financefy)/wallet-detail/[id]",
                    params: { id: wallet.id }
                  })}
                  style={[styles.walletCard]}
                >
                  <Text style={{ fontSize: 20 }}>{wallet.icon || "💰"}</Text>
                  <Text style={styles.walletName}>{wallet.name}</Text>
                  <Text style={styles.walletMoney}>{formatCurrency(wallet.balance)}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <TouchableOpacity style={[styles.walletCard, { borderStyle: 'dashed', borderWidth: 1, borderColor: '#555' }]}>
                <Text style={{ color: '#888' }}>+ Tambah Dompet</Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          <View style={styles.sectionHeaderChart}>
            <Text style={styles.sectionTitle}>Riwayat Terkini</Text>
            <TouchableOpacity onPress={() => router.push("/(financefy)/transactions")}>
              <Text style={styles.seeAll}>Detail</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.length > 0 ? (
            recentTransactions.map((item) => (
              <View key={item.id} style={styles.transCard}>
                <View style={styles.transIcon}>
                  <Text style={{ fontSize: 18 }}>{item.category_icon || "💸"}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{item.note || item.category_name}</Text>
                  <Text style={styles.itemSub}>
                    {item.wallet_name} • {item.date}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.itemAmount,
                    { color: item.type === "income" ? "#2ecc71" : "#e74c3c" }
                  ]}
                >
                  {item.type === "income" ? "+" : "-"} {formatCurrency(item.amount)}
                </Text>
              </View>
            ))
          ) : (
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Text style={{ color: '#666' }}>Belum ada transaksi</Text>
            </View>
          )}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
    </View>
  );
}
