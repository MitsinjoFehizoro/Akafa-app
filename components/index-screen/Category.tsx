import { useThemeColor } from "@/hooks/useThemeColor"
import { Entypo, FontAwesome5 } from "@expo/vector-icons"
import { Pressable, StyleSheet, View } from "react-native"
import { CustomText } from "../CustomText"
import { SHADOW } from "@/constants/SHADOW"
import { SONG_CATEGORY } from "@/constants/SONG_CATEGORY"
import { Link } from "expo-router"
import { useAndroidRipple } from "@/hooks/useAndroidRipple"

type Props = {
	categoryKey: number
}

export function Category({ categoryKey }: Props) {
	const colors = useThemeColor()
	const newKey = categoryKey as keyof typeof SONG_CATEGORY
	return (
		<Link href={{ pathname: '/list', params: { categoryKey: categoryKey, type: 'tononkira' } }} asChild>
			<Pressable>
			<View
				style={styles.container}>
				<View style={[styles.wrapper, { backgroundColor: colors.grayWhite }]}>
					<Entypo name={SONG_CATEGORY[newKey].icon as keyof typeof Entypo.glyphMap} size={16} color={colors.primary} />
				</View>
				<CustomText style={styles.title} variant='body2' color='secondary' >{SONG_CATEGORY[newKey].title}</CustomText>
			</View>
			</Pressable>
		</Link>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 8,
		width: 72,
	},
	wrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 60, height: 60,
		borderRadius: 16,
		overflow: 'hidden',
		...SHADOW.base2
	},
	title: {
		textAlign: 'center'
	}
})