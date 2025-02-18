import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { HeaderSimple } from "@/components/HeaderSimple";
import { useLocalSearchParams } from "expo-router";
import Slider from '@react-native-community/slider';
import { useThemeColor } from "@/hooks/useThemeColor";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextProps, View } from "react-native";
import { DATASONGS } from "@/constants/DATASONGS";
import { CustomText } from "@/components/CustomText";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { BigLogo } from "@/components/index-screen/Logo";
import { rgbaColor } from "@/tools/rgbaColor";
import { Entypo } from "@expo/vector-icons";
import { RowView } from "@/components/RowView";

export default function Lyrics() {
	const colors = useThemeColor()
	const params = useLocalSearchParams()
	const [zoom, setZoom] = useState(1)

	const song = DATASONGS.find(s => s.title === params.songTitle.toString())!
	return (
		<CustomSafeAreaView style={{ position: 'relative' }}>
			<HeaderSimple title={params.type.toString()} />
			<FlatList
				style={{ backgroundColor: 'transparent' }}
				data={song.lyrics}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) =>
					<FlatLyrics keyValue={item.key} value={item.value} zoom={zoom} />
				}
				ListHeaderComponent={<Text style={[styles.textHeader, { fontSize: 18 * zoom, color: colors.secondary }]}>{song.title}</Text>}
				ListFooterComponent={<Text style={[styles.textFooter, { fontSize: 10 * zoom, color: colors.grayDark }]}>{song.author}</Text>}
				contentContainerStyle={styles.containerStyle}
			/>
			<View style={styles.wrapperSlide}>
				<RowView style={[styles.slide, { backgroundColor: rgbaColor(colors.grayLight, 0.6) }]}>
					<Slider
						style={{ width: '80%' }}
						minimumValue={0.5}
						maximumValue={3}
						value={zoom}
						onSlidingComplete={setZoom}
						thumbImage={require('@/assets/images/item.png')}
						minimumTrackTintColor={colors.primary}
						maximumTrackTintColor={colors.grayDark}
					/>
					<Pressable
						onPress={() => setZoom(1)}
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
	const colors = useThemeColor()
	return (
		<View>
			{
				keyValue !== 'break' && (
					<Text style={{ fontSize: 14 * zoom, color: colors.secondary, fontFamily: 'bakbakone', textTransform: 'capitalize' }}>{keyValue}</Text>
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
		marginHorizontal: 16
	}
})