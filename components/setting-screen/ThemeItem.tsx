import { useThemeColor } from "@/hooks/useThemeColor";
import { rgbaColor } from "@/tools/rgbaColor";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";
import { RowView } from "../RowView";
import { Entypo } from "@expo/vector-icons";
import { handleTheme } from "@/hooks/useContextTheme";
import { CustomText } from "../CustomText";
import { useEffect, useState } from "react";
import { useAndroidRipple } from "@/hooks/useAndroidRipple";

type Props = ViewProps & {
	icon: keyof typeof Entypo.glyphMap,
	currentTheme: 'light' | 'dark' | 'auto'
}
export function ThemeItem({ icon, currentTheme, style, ...rest }: Props) {
	const { colors, theme, toggleTheme } = handleTheme()
	const [isCurrentTheme, setIsCurrentTheme] = useState(false)
	useEffect(() => {
		setIsCurrentTheme(currentTheme === theme ? true : false)
	}, [theme])
	return (
		<Pressable
			android_ripple={{ ...useAndroidRipple() }}
			onPress={() => toggleTheme(currentTheme)}
		>
			<RowView gap={16} style={[style, styles.container]} {...rest}>
				<Entypo name={icon} size={18} color={colors.grayDark} />
				<CustomText style={{ textTransform: 'capitalize', flex: 1 }} variant='body1' color='grayDark'>{currentTheme === 'auto' ? 'Automatique' : currentTheme}</CustomText>
				<View style={[styles.radio, { borderColor: colors.grayDark }]}>
					{isCurrentTheme && <View style={[styles.innerRadio, { backgroundColor: colors.grayDark }]} />}
				</View>
			</RowView>
		</Pressable>
	)
}
const styles = StyleSheet.create({
	container: {
		height: 52,
		paddingHorizontal: 12,
		alignItems: 'center'
	},
	radio: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 16, height: 16,
		borderRadius: 16,
		borderStyle: 'solid',
		borderWidth: 1
	},
	innerRadio: {
		width: 10, height: 10,
		borderRadius: 10,
	}
})