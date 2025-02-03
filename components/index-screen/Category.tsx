import { useThemeColor } from "@/hooks/useThemeColor"
import { Entypo, FontAwesome5 } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"
import { CustomText } from "../CustomText"
import { SHADOW } from "@/constants/SHADOW"

type Props = {
	icon: keyof typeof Entypo.glyphMap,
	title: string
}

export function Category({ icon, title }: Props) {
	const colors = useThemeColor()
	return (
		<View style={styles.container}>
			<View style={[styles.wrapper, { backgroundColor: colors.grayWhite }]}>
				<Entypo name={icon} size={16} color={colors.primary} />
			</View>
			<CustomText style={styles.title} variant='body1' color='secondary' >{title}</CustomText>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 8,
		width : 72
	},
	wrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 60, height: 60,
		borderRadius : 16,
		...SHADOW.base2
	},
	title: {
		textTransform: 'capitalize',
		textAlign: 'center'
	}
})