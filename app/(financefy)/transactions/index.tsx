import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import { Inbox } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { db } from "../../services/database";
import { styles } from "./styles";

export default function TransactionsScreen() {
  const isFocused = useIsFocused();
  const [selectedWallet, setSelectedWallet] = useState("all");
  const [groupedTransactions, setGroupedTransactions] = useState<any[]>([]);

  // State baru untuk menyimpan daftar dompet dari database
  const [wallets, setWallets] = useState<any[]>([]);

  useEffect(() => {
    if (isFocused) {
      fetchWallets(); // Ambil daftar dompet terbaru
      fetchTransactions();
    }
  }, [isFocused, selectedWallet]);

  // Fungsi untuk mengambil data dompet
  const fetchWallets = async () => {
    try {
      const result: any[] = await db.getAllAsync(
        "SELECT * FROM wallets ORDER BY name ASC",
      );
      setWallets(result);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      let query = `SELECT * FROM transactions ORDER BY date DESC`;
      let params: any[] = [];

      if (selectedWallet !== "all") {
        query = `SELECT * FROM transactions WHERE wallet_name = ? ORDER BY date DESC`;
        params = [selectedWallet];
      }

      const result: any[] = await db.getAllAsync(query, params);

      const groups = result.reduce((acc: any, item: any) => {
        const dateObj = new Date(item.date);
        const dateString = dateObj.toISOString().split("T")[0];
        if (!acc[dateString])
          acc[dateString] = { date: dateObj, items: [], total: 0 };

        acc[dateString].items.push(item);
        acc[dateString].total +=
          item.type === "expense" ? -item.amount : item.amount;
        return acc;
      }, {});

      const formattedData = Object.keys(groups).map((dateKey) => ({
        id: dateKey,
        ...groups[dateKey],
      }));

      setGroupedTransactions(formattedData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const renderDayGroup = ({ item }: any) => (
    <View style={styles.dayCard}>
      <View style={styles.dayHeader}>
        <View style={styles.dateInfo}>
          <Text style={styles.dateText}>{item.date.getDate()}</Text>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.dayText}>
              {item.date.toLocaleDateString("id-ID", { weekday: "long" })}
            </Text>
            <Text style={styles.monthYearText}>
              {item.date.toLocaleDateString("id-ID", {
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.dayTotal,
            { color: item.total >= 0 ? "#2ecc71" : "#e74c3c" },
          ]}
        >
          {item.total >= 0
            ? `+Rp ${item.total.toLocaleString()}`
            : `-Rp ${Math.abs(item.total).toLocaleString()}`}
        </Text>
      </View>

      {item.items.map((trans: any) => (
        <View key={trans.id} style={styles.transItem}>
          <View style={styles.iconBox}>
            <Text style={{ fontSize: 20 }}>{trans.category_icon}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.transTitle}>
              {trans.note || trans.category_name}
            </Text>
            <Text style={styles.transCat}>{trans.wallet_name}</Text>
          </View>
          <Text
            style={[
              styles.transAmount,
              { color: trans.type === "expense" ? "#e74c3c" : "#2ecc71" },
            ]}
          >
            {trans.type === "expense"
              ? `-${trans.amount.toLocaleString()}`
              : `+${trans.amount.toLocaleString()}`}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.pickerContainer}>
          {/* <Wallet size={18} color="#1A1A1A" style={{ marginRight: 8 }} /> */}
          <Picker
            selectedValue={selectedWallet}
            style={styles.picker}
            onValueChange={(val) => setSelectedWallet(val)}
          >
            <Picker.Item label="Semua Dompet" value="all" />

            {/* Loop data dompet dari database */}
            {wallets.map((wallet) => (
              <Picker.Item
                key={wallet.id}
                label={`${wallet.icon} ${wallet.name}`}
                value={wallet.name}
              />
            ))}
          </Picker>
        </View>
      </View>

      <FlatList
        data={groupedTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderDayGroup}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Inbox size={48} color="#D1D1D1" />
            <Text style={{ color: "#95A5A6", marginTop: 10 }}>
              Belum ada transaksi
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
