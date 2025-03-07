import { rgbaColor } from "@/tools/rgbaColor";
import { StyleSheet, View, ViewProps } from "react-native";
import { CustomText } from "../CustomText";
import {  ReactNode } from "react";
import { handleTheme } from "@/hooks/useContextTheme";

type Props = ViewProps & {
	title: string,
	children: ReactNode
}
export function SettingComponent({ style, title, children, ...rest }: Props) {
	const { colors, isDark } = handleTheme()
	return (
		<View style={[styles.component, { borderColor: rgbaColor(colors.grayLight, 0.3) }]}  >
			<View style={[styles.title, { borderColor: rgbaColor(colors.grayLight, 0.3) }]}>
				<CustomText variant='subtitle2' color={isDark ? 'primary' : 'secondary'} style={{ textTransform: 'capitalize' }}>{title}</CustomText>
			</View>
			<View style={[style]} {...rest}>
				{children}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	component: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 16,
		paddingHorizontal: 16,
	},
	title: {
		borderStyle: 'solid',
		borderBottomWidth: 1,
		height: 36,
		justifyContent: 'center',
		paddingTop: 4,
		paddingHorizontal: 8
	}
})