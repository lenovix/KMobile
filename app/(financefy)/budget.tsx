import { AlertCircle, ChevronRight, Plus } from "lucide-react-native";
import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function BudgetScreen() {
  // Data Dummy Anggaran
  const budgets = [
    {
      id: "1",
      category: "Makanan & Minuman",
      icon: "🍔",
      spent: 1200000,
      limit: 2000000,
      remaining: 800000,
      daysLeft: 5,
    },
    {
      id: "2",
      category: "Transportasi",
      icon: "🚗",
      spent: 950000,
      limit: 1000000,
      remaining: 50000,
      daysLeft: 5,
    },
    {
      id: "3",
      category: "Hiburan",
      icon: "🎬",
      spent: 600000,
      limit: 500000, // Overbudget!
      remaining: -100000,
      daysLeft: 5,
    },
  ];

  const renderBudgetItem = ({ item }: { item: (typeof budgets)[0] }) => {
    const progress = Math.min(item.spent / item.limit, 1);
    const isOver = item.spent > item.limit;

    return (
      <TouchableOpacity style={styles.budgetCard} activeOpacity={0.7}>
        <View style={styles.cardHeader}>
          <View style={styles.categoryInfo}>
            <View style={styles.iconBox}>
              <Text style={{ fontSize: 20 }}>{item.icon}</Text>
            </View>
            <View>
              <Text style={styles.categoryName}>{item.category}</Text>
              <Text style={styles.daysText}>{item.daysLeft} hari lagi</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#ccc" />
        </View>

        <View style={styles.amountRow}>
          <View>
            <Text style={styles.amountLabel}>Terpakai</Text>
            <Text style={styles.amountValue}>
              Rp {item.spent.toLocaleString()}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.amountLabel}>Batas</Text>
            <Text style={styles.amountValue}>
              Rp {item.limit.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${progress * 100}%`,
                backgroundColor: isOver ? "#e74c3c" : "#2ecc71",
              },
            ]}
          />
        </View>

        <View style={styles.footerRow}>
          {isOver ? (
            <View style={styles.warningBox}>
              <AlertCircle size={14} color="#e74c3c" />
              <Text style={styles.warningText}>
                Overbudget Rp {Math.abs(item.remaining).toLocaleString()}
              </Text>
            </View>
          ) : (
            <Text style={styles.remainingText}>
              Sisa Rp {item.remaining.toLocaleString()}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Anggaran</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Plus size={20} color="#2ecc71" />
          <Text style={styles.addBtnText}>Buat Anggaran</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Tab */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Anggaran Januari</Text>
        <Text style={styles.summaryAmount}>Rp 3.500.000</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summarySub}>Terpakai: Rp 2.750.000</Text>
          <Text style={styles.summarySub}>Sisa: Rp 750.000</Text>
        </View>
      </View>

      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id}
        renderItem={renderBudgetItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#333" },
  addBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
  addBtnText: { color: "#2ecc71", fontWeight: "700", fontSize: 14 },
  summaryCard: {
    backgroundColor: "#2ecc71",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },
  summaryLabel: { color: "rgba(255,255,255,0.8)", fontSize: 12 },
  summaryAmount: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    paddingTop: 10,
  },
  summarySub: { color: "#fff", fontSize: 12, fontWeight: "500" },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  budgetCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  categoryInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBox: {
    width: 45,
    height: 45,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  daysText: { fontSize: 11, color: "#999" },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  amountLabel: { fontSize: 10, color: "#999", marginBottom: 2 },
  amountValue: { fontSize: 14, fontWeight: "700", color: "#333" },
  progressBarBg: {
    height: 8,
    backgroundColor: "#f1f2f6",
    borderRadius: 4,
    marginBottom: 10,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%", borderRadius: 4 },
  footerRow: { flexDirection: "row", justifyContent: "flex-end" },
  remainingText: { fontSize: 12, color: "#2ecc71", fontWeight: "600" },
  warningBox: { flexDirection: "row", alignItems: "center", gap: 5 },
  warningText: { fontSize: 12, color: "#e74c3c", fontWeight: "bold" },
});
