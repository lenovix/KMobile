import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import {
    Calendar,
    ChevronRight,
    Notebook,
    Wallet as WalletIcon,
    X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddTransactionScreen() {
  const router = useRouter();

  // States
  const [type, setType] = useState("expense"); // expense, income, debt
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [wallet, setWallet] = useState("Cash");
  const [category, setCategory] = useState("Pilih Kategori");
  const [date, setDate] = useState(new Date());
  const [excludeFromReport, setExcludeFromReport] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      {/* 1. Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X color="#333" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tambah Transaksi</Text>
        <TouchableOpacity onPress={() => console.log("Simpan ke DB")}>
          <Text style={styles.saveBtn}>SIMPAN</Text>
        </TouchableOpacity>
      </View>

      <ScrollView bounces={false}>
        {/* 2. Type Selector */}
        <View style={styles.typeSelector}>
          {["expense", "income", "debt"].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setType(t)}
              style={[styles.typeBtn, type === t && styles.typeBtnActive]}
            >
              <Text
                style={[styles.typeLabel, type === t && styles.typeLabelActive]}
              >
                {t === "expense"
                  ? "Pengeluaran"
                  : t === "income"
                    ? "Pemasukan"
                    : "Hutang"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 3. Input Nominal */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Nominal</Text>
          <View style={styles.amountInputRow}>
            <Text style={styles.currency}>Rp</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              autoFocus
            />
          </View>
        </View>

        {/* 4. Detail Options */}
        <View style={styles.formSection}>
          {/* Wallet */}
          <TouchableOpacity style={styles.formItem}>
            <View style={styles.iconCircle}>
              <WalletIcon size={20} color="#666" />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Dompet</Text>
              <Text style={styles.itemValue}>{wallet}</Text>
            </View>
            <ChevronRight size={20} color="#ccc" />
          </TouchableOpacity>

          {/* Category */}
          <TouchableOpacity style={styles.formItem}>
            <View style={[styles.iconCircle, { backgroundColor: "#f1f2f6" }]}>
              <Text style={{ fontSize: 18 }}>🍴</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Kategori</Text>
              <Text style={styles.itemValue}>{category}</Text>
            </View>
            <ChevronRight size={20} color="#ccc" />
          </TouchableOpacity>

          {/* Note */}
          <View style={styles.formItem}>
            <View style={styles.iconCircle}>
              <Notebook size={20} color="#666" />
            </View>
            <TextInput
              style={[styles.itemContent, { fontSize: 16 }]}
              placeholder="Catatan..."
              value={note}
              onChangeText={setNote}
            />
          </View>

          {/* Date Time */}
          <TouchableOpacity
            style={styles.formItem}
            onPress={() => setShowDatePicker(true)}
          >
            <View style={styles.iconCircle}>
              <Calendar size={20} color="#666" />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Tanggal</Text>
              <Text style={styles.itemValue}>
                {date.toLocaleDateString("id-ID", { dateStyle: "full" })}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 5. Switch Section */}
        <View style={styles.switchSection}>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>Pisahkan dari laporan</Text>
            <Text style={styles.switchSub}>
              Transaksi ini tidak akan dihitung di statistik bulanan
            </Text>
          </View>
          <Switch
            value={excludeFromReport}
            onValueChange={setExcludeFromReport}
            trackColor={{ false: "#ddd", true: "#2ecc71" }}
          />
        </View>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  saveBtn: { color: "#2ecc71", fontWeight: "bold", fontSize: 14 },
  typeSelector: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
    gap: 10,
  },
  typeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  typeBtnActive: { backgroundColor: "#2ecc71" },
  typeLabel: { color: "#666", fontSize: 13, fontWeight: "600" },
  typeLabelActive: { color: "#fff" },
  inputSection: { padding: 20, backgroundColor: "#fdfdfd" },
  label: { fontSize: 12, color: "#999", marginBottom: 5 },
  amountInputRow: { flexDirection: "row", alignItems: "center" },
  currency: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  amountInput: { fontSize: 40, fontWeight: "bold", color: "#2ecc71", flex: 1 },
  formSection: { paddingHorizontal: 20, marginTop: 10 },
  formItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemContent: { flex: 1 },
  itemLabel: { fontSize: 12, color: "#999" },
  itemValue: { fontSize: 16, color: "#333", marginTop: 2, fontWeight: "500" },
  switchSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    backgroundColor: "#f9f9f9",
    marginHorizontal: 20,
    borderRadius: 15,
  },
  switchTitle: { fontSize: 14, fontWeight: "600", color: "#333" },
  switchSub: { fontSize: 11, color: "#999", marginTop: 2 },
});
