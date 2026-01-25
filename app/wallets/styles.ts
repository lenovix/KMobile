import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60, // Sesuaikan dengan notch HP
    paddingBottom: 20,
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  // List Wallet Styles
  walletCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F1F1",
  },
  iconBox: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    // Shadow halus untuk icon box
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  walletName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  walletBalance: {
    fontSize: 14,
    color: "#2ecc71",
    fontWeight: "700",
    marginTop: 2,
  },

  // Modal Styles (Bottom Sheet Look)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  // Form Styles
  input: {
    backgroundColor: "#F5F7F8",
    padding: 16,
    borderRadius: 15,
    fontSize: 15,
    color: "#1A1A1A",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  saveBtn: {
    backgroundColor: "#1A1A1A",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  // Optional: Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    color: "#999",
    marginTop: 10,
    fontSize: 14,
  },
});
