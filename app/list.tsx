import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { Footer } from "@/components/Footer";
import { HeaderSimple } from "@/components/HeaderSimple";
import { ListItem } from "@/components/list-screen/ListItem";
import { Popup } from "@/components/list-screen/Popup";
import { SearchBar } from "@/components/list-screen/SearchBar";
import { PADDING } from "@/constants/PADDING";
import { SONG_CATEGORY } from "@/constants/SONG_CATEGORY";
import { useContextGetAllSongs } from "@/hooks/useContextGetAllSongs";
import { useGetSongs } from "@/hooks/useGetSongs";
import { useThemeColor } from "@/hooks/useThemeColor";
import { rgbaColor } from "@/tools/rgbaColor";
import { PopupAndSong, Song } from "@/tools/type";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Keyboard, StyleSheet, View } from "react-native";

export default function List() {
	const colors = useThemeColor()
	const params = useLocalSearchParams()

	//Song filter
	const [allSong, setAllSong] = useState<Song[]>([])

	const { allDataSongs } = useContextGetAllSongs()
	const { songsWithPartition, getSongsWithPartition } = useGetSongs()
	useEffect(() => {
		getSongsWithPartition()
	}, [allDataSongs])


	useEffect(() => {
		if (params.categoryKey) {
			setAllSong(allDataSongs.filter(s => s.type.toString().includes(params.categoryKey.toString())))
		} else {
			setAllSong(params.type.toString() === 'solfa' ? songsWithPartition : allDataSongs)
		}
	}, [allDataSongs, songsWithPartition])

	//Search
	const [songs, setSongs] = useState<Song[]>([])
	const [searchValue, setSearchValue] = useState('')
	useEffect(() => {
		setSongs(allSong.filter(s => s.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())))
	}, [searchValue, allSong])

	//Keyboard
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

	//Popup
	const [showPopupAndSelectedSong, setShowPopupAndSetSelectedSong] = useState<PopupAndSong>({
		isShowPopup: false, selectedSong: ''
	})
	return (
		<CustomSafeAreaView>
			<View>
				<HeaderSimple title={params.type.toString()} subTitle={params.categoryKey ? SONG_CATEGORY[parseInt(params.categoryKey.toString()) as keyof typeof SONG_CATEGORY].title : undefined} />
				<View style={[styles.search, { backgroundColor: colors.primary }]}>
					<SearchBar
						value={searchValue}
						onChange={setSearchValue}
					/>
				</View>
			</View>

			{
				songs.length === 0 && searchValue ? (
					<View style={styles.breakSearch}>
						<FontAwesome5 name='searchengin' size={72} color={rgbaColor(colors.secondary, 0.4)} />
					</View>
				) : (
					<FlatList
						data={songs}
						keyExtractor={(_, index) => index.toString()}
						renderItem={({ item }) =>
							<ListItem song={item} type={params.type.toString()} setShowPopupAndSetSelectedSong={setShowPopupAndSetSelectedSong} />
						}
						contentContainerStyle={{ padding: 16, gap: 8, paddingBottom: 64 }}
					/>
				)
			}
			{
				!isShowKeyboard && (
					<Footer />
				)
			}
			<Popup showPopupAndSelectedSong={showPopupAndSelectedSong} setShowPopupAndSetSelectedSong={setShowPopupAndSetSelectedSong} />
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