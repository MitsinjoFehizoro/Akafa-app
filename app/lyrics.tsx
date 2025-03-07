import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { HeaderSimple } from "@/components/HeaderSimple";
import { useLocalSearchParams } from "expo-router";
import Slider from '@react-native-community/slider';
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { rgbaColor } from "@/tools/rgbaColor";
import { Entypo } from "@expo/vector-icons";
import { RowView } from "@/components/RowView";
import { useAndroidRipple } from "@/hooks/useAndroidRipple";
import { useGetSongs } from "@/hooks/useGetSongs";
import { handleTheme } from "@/hooks/useContextTheme";

export default function Lyrics() {
	const { colors, isDark } = handleTheme()
	const params = useLocalSearchParams()
	const [zoom, setZoom] = useState(1)

	const { songByTitle, getSongByTitle } = useGetSongs()

	useEffect(() => {
		getSongByTitle(params.songTitle.toString())
	}, [])

	return (
		<CustomSafeAreaView style={{ position: 'relative' }}>
			<HeaderSimple title={params.type.toString()} />
			{
				songByTitle && (
					<FlatList
						style={{ backgroundColor: 'transparent' }}
						data={songByTitle.lyrics}
						keyExtractor={(_, index) => index.toString()}
						renderItem={({ item }) =>
							<FlatLyrics keyValue={item.key} value={item.value} zoom={zoom} />
						}
						ListHeaderComponent={<Text style={[styles.textHeader, { fontSize: 18 * zoom, color: isDark ? colors.grayWhite : colors.secondary }]}>{songByTitle!.title}</Text>}
						ListFooterComponent={<Text style={[styles.textFooter, { fontSize: 10 * zoom, color: colors.grayDark }]}>{songByTitle!.author}</Text>}
						contentContainerStyle={styles.containerStyle}
					/>
				)
			}

			<View style={styles.wrapperSlide}>
				<RowView style={[styles.slide, { backgroundColor: isDark ? rgbaColor(colors.secondary, 0.8) : rgbaColor(colors.grayLight, 0.6)}]}>
					<Slider
						style={{ width: '80%' }}
						minimumValue={0.5}
						maximumValue={3}
						value={zoom}
						onSlidingComplete={setZoom}
						thumbImage={isDark ? require('@/assets/images/item-dark.png'):require('@/assets/images/item.png')}
						minimumTrackTintColor={colors.primary}
						maximumTrackTintColor={colors.grayDark}
					/>
					<Pressable
						onPress={() => setZoom(1)}
						android_ripple={{ ...useAndroidRipple() }}
						style={[styles.button, { backgroundColor: colors.primary }]}
					>
						<Entypo name='cw' size={14} color={colors.grayWhite} />
					</Pressable>
				</RowView>
			</View>
		</CustomSafeAreaView>
	)
}

type PropsFlatLyrics = {
	keyValue: string,
	value: string[],
	zoom: number
}
function FlatLyrics({ keyValue, value, zoom }: PropsFlatLyrics) {
	const { colors, isDark } = handleTheme()
	return (
		<View>
			{
				keyValue !== 'break' && (
					<Text style={{ fontSize: 14 * zoom, color: isDark ? colors.grayWhite : colors.secondary, fontFamily: 'bakbakone', textTransform: 'capitalize' }}>{keyValue}</Text>
				)
			}
			{
				value.map((v, index) => <Text key={index} style={{ fontSize: 14 * zoom, color: colors.grayDark }}>{v}</Text>)
			}
		</View>
	)
}

const styles = StyleSheet.create({
	containerStyle: {
		gap: 16,
		paddingHorizontal: 16,
		paddingTop: 24,
		paddingBottom: 96
	},
	textHeader: {
		textAlign: 'center',
		textTransform: 'uppercase',
		fontFamily: 'bakbakone'
	},
	textFooter: {
		textAlign: 'right',
		marginTop: 16
	},
	wrapperSlide: {
		position: 'absolute',
		bottom: 0, left: 0,
		width: '100%',
		padding: 16
	},
	slide: {
		borderRadius: 8,
		paddingVertical: 12,
		justifyContent: 'space-between'
	},
	button: {
		width: 28, height: 28,
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 16,
		overflow : 'hidden'
	}
})