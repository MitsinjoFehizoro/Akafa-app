import { Pressable, StyleSheet, View } from "react-native";
import { RowView } from "./RowView";
import { Entypo } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CustomText } from "./CustomText";
import { router } from "expo-router";
import { rgbaColor } from "@/tools/rgbaColor";
import { PADDING } from "@/constants/PADDING";

type Props = {
	title: string
}
export function HeaderSimple({ title }: Props) {
	const colors = useThemeColor()
	return (
		<RowView gap={2} style={[styles.container, { backgroundColor: colors.primary }]}>
			<Pressable
				style={styles.back}
				onPress={router.back}
				android_ripple={{ color: rgbaColor(colors.secondary, 0.3), foreground: true }}
			>
				<Entypo name='chevron-left' size={24} color={colors.grayWhite} />
			</Pressable>
			<CustomText style={{ textTransform: 'capitalize', marginTop: 3 }} variant='title2' color='grayWhite' >{title}</CustomText>
		</RowView>
	)
}
const styles = StyleSheet.create({
	container: {
		// height: 72,
		alignItems: 'center',
		paddingRight: PADDING.base,
		paddingLeft : 8,
	},
	back: {
		width: 32, height: 32,
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: "center",
		overflow: 'hidden'
	}
})