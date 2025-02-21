import { Song } from "@/tools/type"
import { createContext, ReactNode, useContext, useState } from "react"
import * as FileSystem from "expo-file-system";

type dataContext = {
	allDataSongs: Song[],
	setAllDataSongs: (s: Song[]) => void
}
const DataContext = createContext<dataContext>({
	allDataSongs: [],
	setAllDataSongs: () => { }
})

export const useContextGetAllSongs = () => {
	const { allDataSongs, setAllDataSongs } = useContext(DataContext)
	const songsUrl = FileSystem.documentDirectory + 'songs/songs.json'

	const getAllDataSongs = async () => {
		try {
			const data = await FileSystem.readAsStringAsync(songsUrl)
			const localDataSong: Song[] = JSON.parse(data)
			setAllDataSongs(localDataSong)
		} catch (error) {
			console.log('Error during getAllDataSongs.')
		}
	}

	return {
		allDataSongs,
		getAllDataSongs
	}
}


type Props = {
	children: ReactNode
}
export function DataContextProvider({ children }: Props) {
	const [allDataSongs, setAllDataSongs] = useState<Song[]>([])

	return (
		<DataContext.Provider value={{ allDataSongs, setAllDataSongs }}>
			{children}
		</DataContext.Provider>
	)
}