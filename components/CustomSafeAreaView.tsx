import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = SafeAreaViewProps
export function CustomSafeAreaView({ style, ...rest }: Props) {
	const colors = useThemeColor()
	const insets = useSafeAreaInsets();
	return <SafeAreaView style={[style, styles.container, { backgroundColor: colors.grayWhite, paddingTop: insets.top }]} {...rest} />
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})