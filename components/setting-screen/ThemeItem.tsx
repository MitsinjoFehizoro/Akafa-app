import { useThemeColor } from "@/hooks/useThemeColor";
import { rgbaColor } from "@/tools/rgbaColor";
import { StyleSheet, View } from "react-native";
import { RowView } from "../RowView";
import { Entypo } from "@expo/vector-icons";

type Props = {
	isWithBorder?: boolean
	// icon : 'light-up' | 'adjust' | 'moon',
}
export function ThemeItem({ isWithBorder }: Props) {
	const colors = useThemeColor()
	return (
		<RowView gap={16} style={[styles.container, { borderColor: isWithBorder ? rgbaColor(colors.grayLight, 0.3) : undefined }]}>

		</RowView>
	)
}
const styles = StyleSheet.create({
	container: {
		width: 48,
		alignItems: 'center',
		borderTopWidth: 1,
		borderBottomWidth: 1
	}
})