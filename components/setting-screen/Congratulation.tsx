import { useThemeColor } from "@/hooks/useThemeColor";
import { rgbaColor } from "@/tools/rgbaColor";
import { Image, StyleSheet, View } from "react-native";
import { CustomText } from "../CustomText";

export function Congratulation() {
	const colors = useThemeColor()
	return (
		<View style={[styles.container, { borderColor: rgbaColor(colors.grayLight, 0.3) }]}>
			<Image style={{marginBottom :12}} source={require('@/assets/images/congra.png')} />
			<CustomText variant='subtitle3' color='secondary'>Arabaina !!</CustomText>
			<CustomText variant='body2' color='grayDark'>Niampy hira 4 sy solfa 3 ny application.</CustomText>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 16,
		gap: 8,
		justifyContent: 'center',
		alignItems: 'center',
		height: 194
	}
})