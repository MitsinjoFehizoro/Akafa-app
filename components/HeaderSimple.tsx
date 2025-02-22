import { Pressable, StyleSheet, View } from "react-native";
import { RowView } from "./RowView";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CustomText } from "./CustomText";
import { router } from "expo-router";
import { rgbaColor } from "@/tools/rgbaColor";
import { PADDING } from "@/constants/PADDING";

type Props = {
	title?: string,
	subTitle?: string
}
export function HeaderSimple({ title, subTitle }: Props) {
	const colors = useThemeColor()
	return (
		<RowView gap={8} style={[styles.container, { backgroundColor: colors.primary, height: subTitle ? 64 : 56, }]}>
			<Pressable
				style={[styles.back]}
				onPress={router.back}
				android_ripple={{ color: rgbaColor(colors.secondary, 0.3), foreground: true }}
			>
				<FontAwesome6 name='arrow-left' size={18} color={colors.grayWhite} />
			</Pressable>
			{
				title && (
					<View style={{ marginTop: subTitle ? -8 : 0 }}>
						<CustomText style={{ textTransform: 'capitalize', marginTop: 2 }} variant='title2' color='grayWhite' >{title}</CustomText>
						{
							subTitle && (
								<CustomText variant='body1' color='grayWhite' style={{ marginTop: -8, marginLeft: 4 }} >{subTitle}</CustomText>
							)
						}
					</View>
				)
			}
		</RowView>
	)
}
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingRight: PADDING.base,
		paddingLeft: 8,
	},
	back: {
		width: 32, height: 32,
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: "center",
		overflow: 'hidden'
	}
})