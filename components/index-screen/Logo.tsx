
import { RowView } from "../RowView";
import { CustomText } from "../CustomText";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { handleTheme } from "@/hooks/useContextTheme";

export function Logo() {
	const { colors } = handleTheme()
	return (
		<RowView>
			<View style={[styles.wrapper, { backgroundColor: colors.secondary }]}>
				<CustomText style={styles.a} variant='title1' color='primary' >A</CustomText>
			</View>
			<CustomText style={{ alignSelf: 'flex-end' }} variant='title1'>kafa</CustomText>
		</RowView>
	)
}
export function SecondLogo() {
	const { colors } = handleTheme()
	return (
		<RowView>
			<View style={[styles.wrapper, { backgroundColor: colors.primary }]}>
				<CustomText style={styles.a} variant='title1' color='grayWhite' >A</CustomText>
			</View>
			<CustomText style={{ alignSelf: 'flex-end' }} variant='title1' color='primary' >kafa</CustomText>
		</RowView>
	)
}

export function ThirdLogo() {
	const { colors } = handleTheme()
	return (
		<RowView>
			<View style={[styles.wrapper, { backgroundColor: colors.secondary }]}>
				<CustomText style={styles.a} variant='title1' color='primary' >A</CustomText>
			</View>
			<CustomText style={{ alignSelf: 'flex-end' }} variant='title1' color='primary' >kafa</CustomText>
		</RowView>
	)
}

export function BigLogo({ style, ...rest }: ViewProps) {
	const { colors } = handleTheme()
	return (
		<View style={[style, styles.container]} {...rest}>
			<View style={[styles.bigWrapper, { backgroundColor: colors.secondary }]} />
			<Text style={[styles.bigA, { color: colors.primary }]} >A</Text>
		</View>
	)
}
const styles = StyleSheet.create({
	wrapper: {
		width: 28, height: 36,
		borderRadius: 2,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	a: {
		marginLeft: 10
	},
	container: {
		width: 186, height: 222,
	},
	bigWrapper: {
		flex: 1,
		borderTopLeftRadius: 16,
		opacity: 0.1
	},
	bigA: {
		position: 'absolute',
		right: -4,
		top: -8,
		fontSize: 200,
		fontFamily: 'audiowide',
		marginLeft: 44
	}
})
