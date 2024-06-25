import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    width: "100%",
    height: "14%",
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 16,
  },
  search: {
    width: "96%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#F3F3F3",
    borderRadius: 4,
    padding: 6,
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
  },
  clearInputButton: {
    padding: 8,
  },
  content: {
    width: '100%',
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  resultText: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Adjust this margin as per your design
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
  },
  row: {
    width: "96%",
    justifyContent: "flex-start",
    gap: 5,
    marginHorizontal: "auto",
    marginBottom: 5,
  },
  historyContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
  },
  historyIcon: {
    marginRight: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  removeButton: {
    paddingHorizontal: 12,
  },
  noHistoryText: {
    color: COLORS.gray,
    textAlign: 'center',
    paddingVertical: 16,
  },
  clearButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  clearButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  notificationContainer: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 8,
  },
  notificationText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.red,
  },
});

export default styles;
