import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    alignSelf: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonStyleTwo: {
    backgroundColor: "white",
    borderColor: "#007bff",
    borderWidth: 1,
  },
  buttonTextStyleTwo: {
    color: "#007bff",
  },
  label: {
    fontSize: 16,
    margin: 5,
    fontWeight: "bold",
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  img: {
    minWidth: 340,
    minHeight: 200,
    alignSelf: "center",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  ListImg: {
    width: 160,
    height: 120,
  },
  marginBottom: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 30,
  },
  pickerStyle: {
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 30,
  },
  pickerContainer: {
    top: "50%",
    right: 12,
    transform: [{ translateY: -8 }],
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  imageContainer: {
    marginHorizontal: 15,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  infoText: {
    marginBottom: 5,
  },
  detailContainer: {
    flexDirection: "colum",
    marginBottom: 10,
    minWidth: "50%",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailValue: {
    fontSize: 16,
  },
  profileImg:{
    width:200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  topMargin: {
    marginTop : 20
  }

});
