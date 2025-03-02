import { COLORS } from "@/constants/COLORS";
import { handleTheme } from "@/hooks/useContextTheme";
import { StyleSheet, Text, TextProps } from "react-native";

type Props = TextProps & {
	variant?: keyof typeof styles,
	color?: keyof typeof COLORS['light']
}
export function CustomText({ style, variant, color, ...rest }: Props) {
	const { colors } = handleTheme()
	return <Text style={[style, styles[variant ?? 'body1'], { color: colors[color ?? 'grayWhite'] }]} {...rest} />
}
const styles = StyleSheet.create({
	title1: {
		fontSize: 24,
		fontFamily: 'audiowide',
	},
	title2: {
		fontSize: 24,
		fontFamily: 'bakbakone'
	},
	subtitle1: {
		fontSize: 14,
		fontFamily: 'bakbakone'
	},
	subtitle2: {
		fontSize: 12,
		fontFamily: 'bakbakone'
	},
	subtitle3: {
		fontSize: 10,
		fontFamily: 'bakbakone'
	},
	body1: {
		fontSize: 12,
	},
	body2: {
		fontSize: 10,
	},
	caption: {
		fontSize: 8,
	}
})