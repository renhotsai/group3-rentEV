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
});
