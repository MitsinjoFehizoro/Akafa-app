
import { useEffect, useState } from "react"
import * as FileSystem from "expo-file-system";
import { Song } from "@/tools/type";
import axios from 'axios';
import JSZip from "jszip";
import { Buffer } from 'buffer';

export const useUpdateData = () => {
	const [dataUpdated, setDataUpdated] = useState({
		song: false, partition: false
	})

	const gitSongJson = "https://raw.githubusercontent.com/MitsinjoFehizoro/Data-Akafa/main/git_songs.json"
	const localSongJson = FileSystem.documentDirectory + 'songs/songs.json'

	const [localSong, setLocalSong] = useState<Song[]>([])

	const updateSongJson = async () => {
		console.log('Update song json.')
		try {
			const response = await axios.get(gitSongJson)
			const gitSongDataRemote = response.data as Song[]

			const localDataSong = await FileSystem.readAsStringAsync(localSongJson)
			setLocalSong(JSON.parse(localDataSong))

			gitSongDataRemote.forEach(remote => {
				const searchSong = localSong.filter(local => local.title === remote.title)
				if (searchSong.length !== 0) {
					localSong.filter(local => local.title != remote.title)
				}
				setLocalSong([...localSong, remote])
			})
			setLocalSong(localSong.sort((a, b) => a.title.localeCompare(b.title)))
			console.log('Song json updated with success.')
		} catch (error) {
			console.log('Error of updated song json : ', error)
		} finally {
			setDataUpdated({ ...dataUpdated, song: true })
		}
	}


	const gitPartitions = "https://raw.githubusercontent.com/MitsinjoFehizoro/Data-Akafa/main/git_partitions.zip"
	const remotePartitionsZip = FileSystem.documentDirectory + '/partitions_remote.zip'

	const updatePartitions = async () => {
		console.log('Update partitions.')
		try {
			const response = await axios.get(gitPartitions, { responseType: 'arraybuffer' })
			const gitPartitionsData = Buffer.from(response.data, 'binary').toString('base64')

			await FileSystem.writeAsStringAsync(remotePartitionsZip, gitPartitionsData, {
				encoding: FileSystem.EncodingType.Base64
			})
			const partitionsZipData = await FileSystem.readAsStringAsync(remotePartitionsZip, { encoding: FileSystem.EncodingType.Base64 })
			const paritionJsZip = await JSZip.loadAsync(partitionsZipData, { base64: true })
			for (const [relativePath, file] of Object.entries(paritionJsZip.files)) {
				const dataPdf = await file.async('base64')
				const partitionPath = FileSystem.documentDirectory + `partitions/${relativePath}`
				const infoPartition = await FileSystem.getInfoAsync(partitionPath)
				if (infoPartition.exists) {
					await FileSystem.deleteAsync(partitionPath, { idempotent: true })
				}
				await FileSystem.writeAsStringAsync(partitionPath, dataPdf, { encoding: FileSystem.EncodingType.Base64 })
			}
			await FileSystem.deleteAsync(remotePartitionsZip)
			const partitionDirectoryContent = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + `partitions/`)
			console.log(`${partitionDirectoryContent.length} partitions loaded with success.`, partitionDirectoryContent)
		} catch (error) {
			console.error('Error of updated partitions : ', error)
		} finally {
			setDataUpdated({ ...dataUpdated, partition: true })
		}
	}

	return {
		dataUpdated,
		updateSongJson,
		updatePartitions
	}
}