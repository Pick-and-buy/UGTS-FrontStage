import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.white,
    // padding: 16,
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
    marginHorizontal: 10
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
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
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
  },
  row: {
    width: "98%",
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 5,
    marginHorizontal: "auto",
    marginTop: "-4%",
  }

});

export default styles;
