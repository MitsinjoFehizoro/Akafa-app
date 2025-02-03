import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

type Props = SafeAreaViewProps
export function CustomSafeAreaView({ style, ...rest }: Props) {
	const colors = useThemeColor()
	return <SafeAreaView style={[style, styles.container, {backgroundColor : colors.grayWhite}]} {...rest} />
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})