import { useThemeColor } from "@/hooks/useThemeColor";
import { rgbaColor } from "@/tools/rgbaColor";
import { StyleSheet, View, ViewProps } from "react-native";
import { CustomText } from "../CustomText";
import { Children, ReactNode } from "react";

type Props = ViewProps & {
	title: string,
	children: ReactNode
}
export function SettingComponent({ style, title, children, ...rest }: Props) {
	const colors = useThemeColor()
	return (
		<View style={[styles.component, { borderColor: rgbaColor(colors.grayLight, 0.3) }]}  >
			<View style={[styles.title, { borderColor: rgbaColor(colors.grayLight, 0.3) }]}>
				<CustomText variant='subtitle2' color='secondary' style={{ textTransform: 'capitalize' }}>{title}</CustomText>
			</View>
			<View style={[style, styles.wrapper]} {...rest}>
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
		paddingBottom : 4
	},
	title: {
		borderStyle: 'solid',
		borderBottomWidth: 1,
		height: 36,
		justifyContent: 'center',
		paddingTop: 4,
		paddingHorizontal : 8
	},
	wrapper: {
		paddingHorizontal: 8,
		paddingVertical: 24
	}
})