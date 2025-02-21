import { useThemeColor } from "@/hooks/useThemeColor"
import { RowView } from "../RowView"
import { Entypo } from "@expo/vector-icons"
import { CustomText } from "../CustomText"
import { Pressable, StyleSheet, View } from "react-native"
import { Link } from "expo-router"
import { rgbaColor } from "@/tools/rgbaColor"
import { useAndroidRipple } from "@/hooks/useAndroidRipple"

type Props = {
	type: string,
	count?: number,
	songTitle?: string,
	pathname: '/list' | '/lyrics' | '/partition',
	icon: keyof typeof Entypo.glyphMap
}
export function ItemAllSong({ type, count, icon, pathname, songTitle }: Props) {
	const colors = useThemeColor()
	return (
		<Link href={{ pathname: pathname, params: { type: type, songTitle: songTitle } }} asChild>
			<Pressable
				android_ripple={{ ...useAndroidRipple() }}
			>
				<RowView style={[styles.item, { borderColor: rgbaColor(colors.grayLight, 0.4) }]}>
					<RowView gap={8}>
						<Entypo name={icon} size={16} color={colors.secondary} />
						<CustomText variant='subtitle2' color='secondary' style={{ marginTop: 3, textTransform: 'capitalize' }} >{type}</CustomText>
					</RowView>
					{
						count ? (
							<RowView gap={8}>
								<View style={[styles.count, { backgroundColor: colors.primary }]}>
									<CustomText style={{ marginTop: 1 }} variant='subtitle3'>{count}</CustomText>
								</View>
								<Entypo name='chevron-right' size={16} color={colors.grayLight} />
							</RowView>
						) : (
							<Entypo name='chevron-right' size={16} color={colors.grayLight} />
						)
					}

				</RowView>
			</Pressable>
		</Link >
	)
}
const styles = StyleSheet.create({
	item: {
		height: 48,
		justifyContent: 'space-between',
		borderStyle: 'solid',
		borderTopWidth: .5,
		borderBottomWidth: .5,
		paddingHorizontal: 16
	},
	count: {
		height: 16, width: 26,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center'
	}
})