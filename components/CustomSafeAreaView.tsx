import { handleTheme } from "@/hooks/useContextTheme";
import { ReactNode } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaViewProps, SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = SafeAreaViewProps
export function CustomSafeAreaView({ style, ...rest }: Props) {
	const { colors } = handleTheme()
	const insets = useSafeAreaInsets();
	return <SafeAreaView style={[style, styles.container, { backgroundColor: colors.background, paddingTop :insets.top }]} {...rest} />
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})