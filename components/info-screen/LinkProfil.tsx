import {  FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, ViewProps } from "react-native";
import { CustomText } from "../CustomText";
import { handleTheme } from "@/hooks/useContextTheme";

type Props = ViewProps & {
	icon: keyof typeof FontAwesome.glyphMap
	title: string
}
export function LinkProfil({ style, icon, title, ...rest }: Props) {
const { colors } = handleTheme()
	const customTitle = title.split('/')
	return (
		<View style={[style, styles.container]} {...rest}>
			<FontAwesome style={{ paddingBottom: 8 }} name={icon} size={16} color={colors.primary} />
			{
				customTitle.map(title =>
					<CustomText key={title} variant='caption' color='grayDark'>{title}</CustomText>
				)
			}
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1 / 3,
		paddingHorizontal: 12,
		paddingVertical: 12,
	}
})