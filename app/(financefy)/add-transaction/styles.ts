import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1A1A1A",
    letterSpacing: 0.3,
  },
  saveBtn: { color: "#2ecc71", fontWeight: "700", fontSize: 15 },
  typeSelector: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#F5F7F8",
    borderRadius: 12,
    padding: 4,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  typeBtnActive: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  typeLabel: { color: "#7F8C8D", fontSize: 13, fontWeight: "500" },
  typeLabelActive: { color: "#1A1A1A", fontWeight: "700" },
  inputSection: { padding: 30, alignItems: "center" },
  label: {
    fontSize: 12,
    color: "#95A5A6",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  amountInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  amountText: {
    fontSize: 32,
    fontWeight: "700",
  },
  currency: {
    fontSize: 24,
    fontWeight: "300",
    color: "#1A1A1A",
    marginRight: 8,
  },
  amountInput: { fontSize: 48, fontWeight: "200", color: "#1A1A1A" },
  formSection: { paddingHorizontal: 20 },
  formItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#F1F1F1",
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  itemLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  itemValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  switchSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#F1F1F1",
  },
  switchTitle: { fontSize: 14, fontWeight: "600", color: "#1A1A1A" },
  switchSub: { fontSize: 11, color: "#95A5A6", marginTop: 2, lineHeight: 16 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: "70%",
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#1A1A1A" },
  pickerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginBottom: 8,
  },
  pickerItemActive: {
    backgroundColor: "#F5F7F8",
  },
  pickerIcon: { fontSize: 22, marginRight: 15 },
  pickerText: { flex: 1, fontSize: 16, color: "#1A1A1A", fontWeight: "500" },
  itemSubValue: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
});

export const keypadStyles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FA",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  key: {
    width: width / 3 - 20,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  keyText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  amountText: {
    fontSize: 32,
    fontWeight: "700",
  },
});
