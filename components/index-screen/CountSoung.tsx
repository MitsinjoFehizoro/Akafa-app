import { useThemeColor } from "@/hooks/useThemeColor"
import { StyleSheet, View } from "react-native"
import { CustomText } from "../CustomText"
import { Entypo } from "@expo/vector-icons"

type Props = {
	count: number,
	icon: keyof typeof Entypo.glyphMap
}
export function CountSong({ count, icon }: Props) {
	const colors = useThemeColor()
	return (
		<View style={styles.count}>
			<View style={[styles.caption, { backgroundColor: colors.secondary }]}>
				<CustomText variant='subtitle3'>{count}</CustomText>
			</View>
			<Entypo name={icon} size={16} color={colors.grayWhite} />
		</View>
	)
}

const styles = StyleSheet.create({
	count: {
		position: 'relative',
		width: 32,
	},
	caption: {
		position: 'absolute',
		top: -8, right: -2,
		width: 26,
		height: 14,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2
	}
})