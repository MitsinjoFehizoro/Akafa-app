import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { CustomText } from "@/components/CustomText";
import { Footer } from "@/components/Footer";
import { HeaderSimple } from "@/components/HeaderSimple";
import { BigLogo } from "@/components/index-screen/Logo";
import { ListItem } from "@/components/list-screen/ListItem";
import { SearchBar } from "@/components/list-screen/SearchBar";
import { DATASONGS } from "@/constants/DATASONGS";
import { PADDING } from "@/constants/PADDING";
import { useThemeColor } from "@/hooks/useThemeColor";
import { rgbaColor } from "@/tools/rgbaColor";
import { Song } from "@/tools/type";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Keyboard, StyleSheet, Text, View } from "react-native";

export default function List() {
	const colors = useThemeColor()
	const params = useLocalSearchParams()
	const [searchValue, setSearchValue] = useState('')
	const allSong = params.type.toString()==='solfa' ? DATASONGS.filter(data=>data.isPartition) : DATASONGS
	const [songs, setSongs] = useState(allSong)
	useEffect(() => {
		setSongs(allSong.filter(s => s.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())))
	}, [searchValue])
	const [isShowKeyboard, setIsShowKeyboard] = useState(false)
	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setIsShowKeyboard(true);
			}
		);

		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setIsShowKeyboard(false);
			}
		);

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, [])
	return (
		<CustomSafeAreaView>
			<View>
				<HeaderSimple title={params.type.toString()} />
				<View style={[styles.search, { backgroundColor: colors.primary }]}>
					<SearchBar
						value={searchValue}
						onChange={setSearchValue}
					/>
				</View>
			</View>

			{
				songs.length !== 0 ? (
					<FlatList
						data={songs}
						keyExtractor={(_, index) => index.toString()}
						renderItem={({ item }) =>
							<ListItem song={item} type={params.type.toString()} />
						}
						contentContainerStyle={{ padding: 16, gap: 8 }}
					/>
				) : (
					<View style={styles.breakSearch}>
						<FontAwesome5 name='searchengin' size={72} color={rgbaColor(colors.secondary, 0.4)} />
					</View>
				)
			}
			{
				!isShowKeyboard && (
					<Footer />
				)
			}

		</CustomSafeAreaView>

	)

}
const styles = StyleSheet.create({
	search: {
		paddingHorizontal: PADDING.base,
		paddingBottom: 16,
		paddingTop: 8
	},
	breakSearch: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

})