import { Song } from "@/tools/type"
import { useState } from "react"
import { useContextGetAllSongs } from "./useContextGetAllSongs";
export const useGetSongs = () => {
	const { allDataSongs } = useContextGetAllSongs()

	const [songByTitle, setSongByTitle] = useState<Song>()
	const [songsWithPartition, setSongsWithPartition] = useState<Song[]>([])

	const getSongByTitle = async (songTitle: string) => {
		setSongByTitle(allDataSongs.find(s => s.title === songTitle))
	}

	const getSongsWithPartition = async () => {
		setSongsWithPartition(allDataSongs.filter(s => s.isPartition))
	}

	return {
		songByTitle,
		songsWithPartition,
		getSongByTitle,
		getSongsWithPartition
	}
}