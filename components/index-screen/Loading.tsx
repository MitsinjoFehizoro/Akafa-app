import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native"
import { CustomSafeAreaView } from "../CustomSafeAreaView"
import { handleTheme } from "@/hooks/useContextTheme"
import { ThirdLogo } from "./Logo"
import { CustomText } from "../CustomText"

type Props = {
	percentage: number
}
export function Loading({ percentage }: Props) {
	const { colors } = handleTheme()
	return (
		<View style={{flex : 1}}>
			<StatusBar barStyle='light-content' backgroundColor={colors.secondary} />
			<View style={[styles.container, { backgroundColor: colors.secondary }]}>
				<ThirdLogo />
				<View style={styles.loading}>
					<ActivityIndicator style={{ marginBottom: 16 }} size='large' color={colors.grayWhite} />
					<CustomText variant='body2' color='grayWhite' >Mahandrasa kely...</CustomText>
					<CustomText variant='subtitle1' color='grayWhite'>{percentage}%</CustomText>
				</View>
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loading: {
		position: 'absolute',
		left: 0, right: 0, bottom: 36,
		gap: 4,
		alignItems: 'center',
	}
})

