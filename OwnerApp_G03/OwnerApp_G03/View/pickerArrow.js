import { View } from "react-native";

export const pickerArrow = () => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        borderTopWidth: 5,
        borderTopColor: "#000",
        borderRightWidth: 5,
        borderRightColor: "transparent",
        borderLeftWidth: 5,
        borderLeftColor: "transparent",
        width: 0,
        height: 0,
      }}
    />
  );
}