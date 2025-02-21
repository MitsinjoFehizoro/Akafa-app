import { Song, StateAxios } from "@/tools/type";
import { useState } from "react";
import * as FileSystem from 'expo-file-system'
import axios from 'axios'
import { Buffer } from 'buffer'
import JSZip from "jszip";
import { useContextGetAllSongs } from "./useContextGetAllSongs";

export function useUpdateData() {
	const { getAllDataSongs } = useContextGetAllSongs()
	const [stateUpdateSong, setStateUpdateSong] = useState<StateAxios>({
		isLoading: false, isError: false
	})
	const [stateUpdatePartitions, setStateUpdatePartitions] = useState<StateAxios>({
		isLoading: false, isError: false
	})
	const gitUrl = 'https://raw.githubusercontent.com/MitsinjoFehizoro/Data-Akafa/main/'

	const updateSongJson = async () => {
		console.log('Update song Json.')
		const localSongJson = FileSystem.documentDirectory + 'songs/songs.json'
		try {
			setStateUpdateSong({ isLoading: true, isError: false })
			const response = await axios.get(gitUrl + 'git_songs.json')
			const remoteDataSong: Song[] = response.data

			const localSong = await FileSystem.readAsStringAsync(localSongJson)
			let localDataSong: Song[] = JSON.parse(localSong)

			let countNewSong = 0
			remoteDataSong.forEach(remoteSong => {
				const searchSong = localDataSong.filter(local => local.title === remoteSong.title)
				if (searchSong.length !== 0)
					localDataSong = localDataSong.filter(local => local.title !== remoteSong.title)
				else countNewSong++
				localDataSong.push(remoteSong)
			})

			await FileSystem.deleteAsync(localSongJson, { idempotent: true })
			await FileSystem.writeAsStringAsync(localSongJson, JSON.stringify(localDataSong.sort((a, b) => a.title.localeCompare(b.title))))
			getAllDataSongs() //Rechargement des chansons
			setStateUpdateSong({ ...stateUpdateSong, isError: false, message: countNewSong.toString() })
			console.log('Song json updated with success : ', countNewSong)
		} catch (error) {
			const message = 'Error during updated song json.'
			setStateUpdateSong({ ...stateUpdateSong, isError: true, message: message })
			console.log(message, error)
		} finally {
			setStateUpdateSong({ ...stateUpdateSong, isLoading: false })
		}
	}

	const updateParitions = async () => {
		console.log('Update partitions.')
		const localPartitionsDirectory = FileSystem.documentDirectory + 'partitions/'
		try {
			setStateUpdatePartitions({ isLoading: true, isError: false })
			const response = await axios.get(gitUrl + 'git_partitions.zip', { responseType: 'arraybuffer' })
			const partitionsZipData = Buffer.from(response.data, 'binary').toString('base64')
			const partitionsJsZipData = await JSZip.loadAsync(partitionsZipData, { base64: true })
			let countNewPartitions = 0
			for (const [relativePath, file] of Object.entries(partitionsJsZipData.files)) {
				const dataPdf = await file.async('base64')
				const pathPdf = localPartitionsDirectory + relativePath //relativePath == name of partition
				const infoPathPdf = await FileSystem.getInfoAsync(pathPdf)
				if (infoPathPdf.exists)
					await FileSystem.deleteAsync(pathPdf, { idempotent: true })
				else countNewPartitions++
				await FileSystem.writeAsStringAsync(pathPdf, dataPdf, { encoding: FileSystem.EncodingType.Base64 })
			}
			setStateUpdatePartitions({ ...stateUpdatePartitions, isError: false, message: countNewPartitions.toString() })
			console.log('Partitions updated with success : ', countNewPartitions)
		} catch (error) {
			const message = 'Error during updated partitions.'
			setStateUpdatePartitions({ ...stateUpdatePartitions, isError: true, message: message })
			console.log(message, error)
		} finally {
			setStateUpdatePartitions({ ...stateUpdatePartitions, isLoading: false })
		}
	}
	return {
		stateUpdateSong,
		stateUpdatePartitions,
		updateSongJson,
		updateParitions
	}
}