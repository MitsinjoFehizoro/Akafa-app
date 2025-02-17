
import { Asset } from 'expo-asset'
import * as FileSystem from "expo-file-system";
import JSZip from 'jszip';
import { useEffect, useState } from 'react';

export const useLoadData = () => {
	const [loadDataState, setLoadDataState] = useState({ loadSong: false, loadPartition: false })

	const loadSongJson = async () => {
		console.log('Load song json.')
		try {
			setLoadDataState({ ...loadDataState, loadSong: true })
			const songJson = Asset.fromModule(require('@/assets/data/songs.json'))
			const songDirectory = FileSystem.documentDirectory + 'songs/'
			const infoSongDirectory = await FileSystem.getInfoAsync(songDirectory)
			if (infoSongDirectory.exists) {
				return console.log('Song json alredy loaded.')
			}
			await songJson.downloadAsync()
			await FileSystem.makeDirectoryAsync(songDirectory, { intermediates: true })
			await FileSystem.copyAsync({
				from: songJson.localUri!,
				to: songDirectory + 'songs.json'
			})
			console.log('Song json loaded with success.')
		} catch (error) {
			console.error('Error of loaded song json : ', error)
		} finally {
			setLoadDataState({ ...loadDataState, loadSong: false })
		}
	}
	const loadPartitions = async () => {
		console.log('Load partitions.')
		try {
			setLoadDataState({ ...loadDataState, loadPartition: false })
			const partitionArchive = Asset.fromModule(require('@/assets/data/partitions.zip'))
			const partitionDirectory = FileSystem.documentDirectory + 'partitions/'
			const infoPartitionDirectory = await FileSystem.getInfoAsync(partitionDirectory)
			if (infoPartitionDirectory.exists) {
				return console.log('Partitions alredy loaded.')
			}
			await partitionArchive.downloadAsync()
			await FileSystem.makeDirectoryAsync(partitionDirectory)
			const partitionArchiveSystem = FileSystem.documentDirectory + 'partitions.zip'
			await FileSystem.copyAsync({
				from: partitionArchive.localUri!,
				to: partitionArchiveSystem
			})
			const partitionZipData = await FileSystem.readAsStringAsync(partitionArchiveSystem, { encoding: FileSystem.EncodingType.Base64 })
			const partitionJsZip = await JSZip.loadAsync(partitionZipData, { base64: true })
			for (const [relativePath, file] of Object.entries(partitionJsZip.files)) {
				const dataPdf = await file.async('base64')
				const path = partitionDirectory + relativePath
				await FileSystem.writeAsStringAsync(path, dataPdf, { encoding: FileSystem.EncodingType.Base64 })
			}
			await FileSystem.deleteAsync(partitionArchiveSystem)

			const partitionDirectoryContent = await FileSystem.readDirectoryAsync(partitionDirectory)
			console.log(`${partitionDirectoryContent.length} partitions loaded with success.`)
		} catch (error) {
			console.error('Error of loaded partitions : ', error)
		} finally {
			setLoadDataState({ ...loadDataState, loadPartition: false })
		}
	}
	useEffect(() => {
		loadSongJson()
		loadPartitions()
	}, [])
	return {
		loadDataState
	}
}