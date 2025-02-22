import { Pressable, StyleSheet, View } from "react-native";
import { RowView } from "./RowView";
import { Entypo } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CustomText } from "./CustomText";
import { SHADOW } from "@/constants/SHADOW";
import { Link } from "expo-router";

export function Footer() {
	return (
		<RowView style={styles.container}>
			<MenuFooter icon='mic' title='tonokira' />
			<MenuFooter icon='note' title='solfa' />
			<MenuHome />
			<MenuFooter icon='info' title='info' />
			<MenuFooter icon='tools' title='kirakira' />
		</RowView >
	)
}
type Props = {
	icon: keyof typeof Entypo.glyphMap,
	title: string
}
function MenuFooter({ icon, title }: Props) {
	const colors = useThemeColor()
	return (
		<Link href={{ pathname: '/setting' }} asChild>
			<Pressable >
			<View style={styles.wrapper}>
				<Entypo name={icon} size={16} color={colors.grayLight} />
				<CustomText style={styles.text} variant='subtitle3' color='grayLight'>{title}</CustomText>
			</View>
			</Pressable>
		</Link>
	)
}
function MenuHome() {
	const colors = useThemeColor()
	return (
		<View style={styles.homeContainer}>
			<View style={styles.home}>
				<View style={[styles.circle, { backgroundColor: colors.grayWhite }]}>
					<View style={[styles.innerCircle, { backgroundColor: colors.primary }]}>
						<Entypo name='home' size={24} color={colors.grayWhite} />
					</View>
				</View>
				<CustomText style={styles.text} variant='subtitle3' color='secondary'>fandraisana</CustomText>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 80,
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
		paddingHorizontal: 8,
		paddingTop: 12,
		zIndex: 2,
		...SHADOW.base1
	},
	wrapper: {
		gap: 8,
		alignItems: 'center'
	},
	text: {
		textTransform: 'uppercase',
		textAlign: 'center'
	},
	homeContainer: {
		height: '100%', width: 90,
		position: 'relative',
	},
	home: {
		position: 'absolute',
		top: -58,
		gap: 12,
		justifyContent: 'center'
	},
	circle: {
		width: 90, height: 90,
		borderRadius: 90,
		justifyContent: 'center',
		alignItems: 'center',
		...SHADOW.base1
	},
	innerCircle: {
		width: 70, height: 70,
		borderRadius: 70,
		justifyContent: 'center',
		alignItems: 'center',
	}
})