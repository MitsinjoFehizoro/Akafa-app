import { Entypo } from "@expo/vector-icons"
import { Pressable, StyleSheet, View } from "react-native"
import { CustomText } from "../CustomText"
import { SONG_CATEGORY } from "@/constants/SONG_CATEGORY"
import { Link } from "expo-router"
import { handleTheme } from "@/hooks/useContextTheme"

type Props = {
	categoryKey: number
}

export function Category({ categoryKey }: Props) {
	const { colors, isDark } = handleTheme()
	const newKey = categoryKey as keyof typeof SONG_CATEGORY
	return (
		<Link href={{ pathname: '/list', params: { categoryKey: categoryKey, type: 'tononkira' } }} asChild>
			<Pressable>
				<View
					style={styles.container}>
					<View style={[styles.wrapper, { backgroundColor: colors.onSecondary, elevation: isDark ? 0 : 4 }]}>
						<Entypo name={SONG_CATEGORY[newKey].icon as keyof typeof Entypo.glyphMap} size={16} color={colors.primary} />
					</View>
					<CustomText style={styles.title} variant='body2' color={isDark ? 'grayLight' : 'secondary'} >{SONG_CATEGORY[newKey].title}</CustomText>
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
		shadowColor: '#BABABA',
	},
	title: {
		textAlign: 'center'
	}
})