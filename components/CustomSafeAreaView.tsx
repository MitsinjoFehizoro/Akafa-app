import { handleTheme } from "@/hooks/useContextTheme";
import { ReactNode } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = SafeAreaViewProps & {
	children: ReactNode
}
export function CustomSafeAreaView({ children, style, ...rest }: Props) {
	const { colors } = handleTheme()
	const insets = useSafeAreaInsets();
	return <SafeAreaView style={[style, styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]} {...rest} >
		<StatusBar barStyle='light-content' backgroundColor={colors.primary} />
		{children}
	</SafeAreaView>
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})