import { Picker } from "@react-native-picker/picker";
import { ChevronLeft, ChevronRight, Wallet } from "lucide-react-native";
import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function TransactionsScreen() {
  const [selectedWallet, setSelectedWallet] = useState("total");
  const [selectedMonth, setSelectedMonth] = useState("Bulan Ini");

  // Data Dummy Transaksi
  const transactionData = [
    {
      id: "1",
      date: "25",
      day: "Minggu",
      monthYear: "Januari 2026",
      totalDay: -55000,
      items: [
        {
          id: "t1",
          title: "Kopi Starbucks",
          category: "Makanan",
          amount: -55000,
          icon: "☕",
        },
      ],
    },
    {
      id: "2",
      date: "24",
      day: "Sabtu",
      monthYear: "Januari 2026",
      totalDay: 450000,
      items: [
        {
          id: "t2",
          title: "Gaji Freelance",
          category: "Income",
          amount: 500000,
          icon: "💰",
        },
        {
          id: "t3",
          title: "Bensin Motor",
          category: "Transport",
          amount: -50000,
          icon: "⛽",
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* 1. Header & Dropdown Wallet */}
      <View style={styles.header}>
        <View style={styles.pickerContainer}>
          <Wallet size={18} color="#2ecc71" style={{ marginRight: 8 }} />
          <Picker
            selectedValue={selectedWallet}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedWallet(itemValue)}
          >
            <Picker.Item label="Total Saldo" value="total" />
            <Picker.Item label="Cash" value="cash" />
            <Picker.Item label="Bank BCA" value="bca" />
          </Picker>
        </View>
      </View>

      {/* 2. Navigasi Bulan */}
      <View style={styles.monthNav}>
        <TouchableOpacity>
          <ChevronLeft size={20} color="#95a5a6" />
        </TouchableOpacity>

        {["Bulan Lalu", "Bulan Ini", "Bulan Depan"].map((m) => (
          <TouchableOpacity
            key={m}
            onPress={() => setSelectedMonth(m)}
            style={[
              styles.monthItem,
              selectedMonth === m && styles.monthActive,
            ]}
          >
            <Text
              style={[
                styles.monthText,
                selectedMonth === m && styles.monthTextActive,
              ]}
            >
              {m}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity>
          <ChevronRight size={20} color="#95a5a6" />
        </TouchableOpacity>
      </View>

      {/* 3. List Transaksi Per Hari */}
      <FlatList
        data={transactionData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.dayCard}>
            {/* Header Per Hari */}
            <View style={styles.dayHeader}>
              <View style={styles.dateInfo}>
                <Text style={styles.dateText}>{item.date}</Text>
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.dayText}>{item.day}</Text>
                  <Text style={styles.monthYearText}>{item.monthYear}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.dayTotal,
                  { color: item.totalDay > 0 ? "#2ecc71" : "#333" },
                ]}
              >
                {item.totalDay > 0
                  ? `+Rp ${item.totalDay.toLocaleString()}`
                  : `-Rp ${Math.abs(item.totalDay).toLocaleString()}`}
              </Text>
            </View>

            {/* List Item Transaksi */}
            {item.items.map((trans) => (
              <View key={trans.id} style={styles.transItem}>
                <View style={styles.iconBox}>
                  <Text style={{ fontSize: 20 }}>{trans.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.transTitle}>{trans.title}</Text>
                  <Text style={styles.transCat}>{trans.category}</Text>
                </View>
                <Text
                  style={[
                    styles.transAmount,
                    { color: trans.amount > 0 ? "#2ecc71" : "#e74c3c" },
                  ]}
                >
                  {trans.amount > 0
                    ? `+${trans.amount.toLocaleString()}`
                    : trans.amount.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f2f6",
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  monthNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  monthItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  monthActive: {
    backgroundColor: "#2ecc71",
  },
  monthText: {
    fontSize: 13,
    color: "#95a5a6",
    fontWeight: "600",
  },
  monthTextActive: {
    color: "#fff",
  },
  dayCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 1,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dateInfo: { flexDirection: "row", alignItems: "center" },
  dateText: { fontSize: 24, fontWeight: "bold", color: "#333" },
  dayText: { fontSize: 12, fontWeight: "bold", color: "#333" },
  monthYearText: { fontSize: 10, color: "#999" },
  dayTotal: { fontWeight: "bold", fontSize: 14 },
  transItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f1f1f1",
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  transTitle: { fontSize: 14, fontWeight: "600", color: "#333" },
  transCat: { fontSize: 11, color: "#999", marginTop: 2 },
  transAmount: { fontWeight: "700", fontSize: 14 },
});
