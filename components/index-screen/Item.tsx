import { useThemeColor } from "@/hooks/useThemeColor"
import { RowView } from "../RowView"
import { Entypo } from "@expo/vector-icons"
import { CustomText } from "../CustomText"
import { StyleSheet, View } from "react-native"

type Props = {
	title: string,
	count: number,
	icon: keyof typeof Entypo.glyphMap
}
export function Item({ title, count, icon }: Props) {
	const colors = useThemeColor()
	return (
		<RowView style={[styles.item, { borderColor: colors.grayLightOpaque }]}>
			<RowView gap={8}>
				<Entypo name={icon} size={16} color={colors.secondary} />
				<CustomText variant='subtitle2' color='secondary' style={{ marginTop: 3 }} >{title}</CustomText>
			</RowView>
			<RowView gap={8}>
				<View style={[styles.count, { backgroundColor: colors.primary }]}>
					<CustomText style={{ marginTop: 1 }} variant='subtitle3'>{count}</CustomText>
				</View>
				<Entypo name='chevron-right' size={16} color={colors.grayLight} />
			</RowView>
		</RowView>

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