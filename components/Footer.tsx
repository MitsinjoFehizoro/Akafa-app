import { Pressable, StyleSheet, View } from "react-native";
import { RowView } from "./RowView";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { CustomText } from "./CustomText";
import { Link } from "expo-router";
import { handleTheme } from "@/hooks/useContextTheme";
import { useEffect, useState } from "react";
import { useAndroidRipple } from "@/hooks/useAndroidRipple";
import { rgbaColor } from "@/tools/rgbaColor";

type Props = {
	menuActif: string
}
export function Footer({ menuActif }: Props) {
	const { colors, isDark } = handleTheme()
	const [menuState, setMenuState] = useState({
		tononkira: false,
		solfa: false,
		home: false,
		info: false,
		setting: false,
	})
	const key = menuActif as keyof typeof menuState
	useEffect(() => {
		setMenuState({
			tononkira: false,
			solfa: false,
			home: false,
			info: false,
			setting: false,
			[key]: true
		})
	}, [key])

	return (
		<RowView style={[styles.container, { backgroundColor: isDark ? colors.onSecondary : undefined, elevation: isDark ? 0 : .8 }]}>
			<MenuFooter isActif={menuState.tononkira} pathname='/list' icon='mic' title='tononkira' />
			<MenuFooter isActif={menuState.solfa} pathname='/list' icon='note' title='solfa' />
			<MenuHome isActif={menuState.home} />
			<MenuFooter isActif={menuState.info} pathname='/info' icon='info' title='info' />
			<MenuFooter isActif={menuState.setting} pathname='/setting' icon='tools' title='kirakira' />
		</RowView >
	)
}
type MenuProps = {
	icon: keyof typeof Entypo.glyphMap,
	title: string,
	isActif: boolean,
	pathname: '/' | '/list' | '/info' | '/setting'
}
function MenuFooter({ icon, title, isActif, pathname }: MenuProps) {
	const { colors, isDark } = handleTheme()
	return (
		<Link href={{ pathname: pathname, params: { type: title } }} asChild>
			<Pressable>
				<View style={styles.wrapper}>
					<Entypo name={icon} size={16} color={isActif ? isDark ? colors.primary : colors.secondary : colors.grayLight} />
					<CustomText style={styles.text} variant='subtitle3' color={isActif ? isDark ? 'primary' : 'secondary' : 'grayLight'}>{title}</CustomText>
				</View>
			</Pressable>
		</Link>
	)
}

type MenuHomeProps = {
	isActif: boolean
}
function MenuHome({ isActif }: MenuHomeProps) {
	const { colors, isDark } = handleTheme()
	return (
		<View style={styles.homeContainer}>
			<View style={styles.home}>
				<View style={[styles.circle, { backgroundColor: colors.background, elevation: isDark ? 0 : .8 }]}>
					<Link href={{ pathname: '/' }} asChild>
						<Pressable
							style={{ borderRadius: 70, overflow: 'hidden' }}
							android_ripple={{ ...useAndroidRipple() }}
						>
							<View style={[styles.innerCircle, { backgroundColor: isDark ? isActif ? colors.primary : colors.background : colors.primary, borderColor: isDark ? isActif ? colors.background : rgbaColor(colors.grayLight, 0.2) : colors.background }]}>
								<Feather name='home' size={22} color={ isDark ? isActif ? colors.grayWhite : colors.grayLight : colors.grayWhite} />
							</View>
						</Pressable>
					</Link >
				</View>
				<CustomText style={styles.text} variant='subtitle3' color={isActif ? 'primary' : 'grayLight'}>fandraisana</CustomText>
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
		zIndex: 3,
		shadowColor: '#BABABA'
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
		top: -42,
		gap: 12,
		justifyContent: 'center'
	},
	circle: {
		width: 72, height: 72,
		borderRadius: 72,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#BABABA'
	},
	innerCircle: {
		width: 64, height: 64,
		borderRadius: 64,
		justifyContent: 'center',
		alignItems: 'center',
		borderStyle: 'solid',
		borderWidth: 1
	}
})