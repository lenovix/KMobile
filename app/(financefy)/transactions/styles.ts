import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7F8",
    borderRadius: 15,
    paddingHorizontal: 12,
  },
  picker: { flex: 1, height: 50 },
  monthNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  monthItem: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 20 },
  monthActive: { backgroundColor: "#1A1A1A" },
  monthText: { fontSize: 13, color: "#95A5A6", fontWeight: "600" },
  monthTextActive: { color: "#FFF" },

  // Day Grouping Styles
  dayCard: { marginBottom: 25 },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F9FAFB",
  },
  dateInfo: { flexDirection: "row", alignItems: "center" },
  dateText: { fontSize: 22, fontWeight: "300", color: "#1A1A1A" },
  dayText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1A1A1A",
    textTransform: "uppercase",
  },
  monthYearText: { fontSize: 10, color: "#95A5A6" },
  dayTotal: { fontWeight: "600", fontSize: 13 },

  // Transaction Item Styles
  transItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  iconBox: {
    width: 45,
    height: 45,
    backgroundColor: "#F5F7F8",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  transTitle: { fontSize: 15, fontWeight: "500", color: "#1A1A1A" },
  transCat: { fontSize: 12, color: "#95A5A6", marginTop: 2 },
  transAmount: { fontWeight: "600", fontSize: 15 },
  emptyState: { alignItems: "center", marginTop: 100 },
});
