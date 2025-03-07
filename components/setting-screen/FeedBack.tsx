import { rgbaColor } from "@/tools/rgbaColor";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { CustomText } from "../CustomText";
import { StateAxios } from "@/tools/type";
import { useEffect, useState } from "react";
import { handleTheme } from "@/hooks/useContextTheme";

type Props = {
	stateUpdateSong: StateAxios,
	stateUpdatePartitions: StateAxios
}
export function FeedBack({ stateUpdateSong, stateUpdatePartitions }: Props) {
	const { colors } = handleTheme()
	const [feedBack, setFeedBack] = useState({
		isError: false,
		message: '',
		icon: ''
	})
	useEffect(() => {
		if (stateUpdateSong.isError || stateUpdatePartitions.isError) {
			return setFeedBack({
				isError: true,
				message: 'Hamarino ny connexion internet-nao.',
				icon: require('@/assets/images/error.png')
			})
		}
		if (stateUpdatePartitions.message == '0' && stateUpdateSong.message == '0') {
			return setFeedBack({
				isError: false,
				message: 'Tsy mbola misy hira sy solfa vaovao.',
				icon: require('@/assets/images/verifier.png')
			})
		}
		setFeedBack({
			isError: false,
			message: `Niampy hira ${stateUpdateSong.message} sy solfa ${stateUpdatePartitions.message} ny application-nao.`,
			icon: require('@/assets/images/congra.png')
		})
	}, [stateUpdatePartitions, stateUpdateSong])

	return (
		<View>
			{
				stateUpdateSong.isFinish && stateUpdatePartitions.isFinish && (
					<View style={[styles.container, { borderColor: rgbaColor(colors.grayLight, 0.3) }]}>
						<Image style={styles.image} source={feedBack.icon as ImageSourcePropType} />
						<CustomText variant='body1' color='grayDark'>{feedBack.message}</CustomText>
					</View>
				)
			}
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 16,
		gap: 16,
		justifyContent: 'center',
		alignItems: 'center',
		height: 136,
		marginBottom: 86
	},
	image: {
		width: 36,
		height: 36,
	}
})