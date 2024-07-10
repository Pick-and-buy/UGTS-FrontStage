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
  popularContainer: {
    width: "100%",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    marginTop: 20,
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 20
  },
  popularKeywords: {
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'flex-start',
    marginLeft: 20,
    gap: 15,
    marginTop: 15,
    marginBottom: 20
  },
  popularKeyword: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#ddd",
    borderRadius: 2
  },
  topSearchContainer: {
    width: "100%",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    marginTop: 20,
  },
  topSearchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 20
  },
  topSearchKeywords: {
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'flex-start',
    marginLeft: 20,
    gap: 15,
    marginTop: 15,
    marginBottom: 20
  },
  topSearchKeyword: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#ddd",
    borderRadius: 2
  },

  historyContainer: {
    // paddingHorizontal: 16,
    paddingTop: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 20
  },
  historyItemContainer: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    backgroundColor: COLORS.white
  },
  historyIcon: {
    marginRight: 10,
    marginLeft: 20
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    width: "50%",
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginHorizontal: "auto"
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
