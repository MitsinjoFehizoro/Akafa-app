
import { Asset } from 'expo-asset'
import * as FileSystem from "expo-file-system";
import JSZip from 'jszip';
import { useEffect, useState } from 'react';
import songJson from '../assets/data/songs.json'

export const useLoadData = () => {
	const [dataLoaded, setDataLoaded] = useState({ song: false, partition: false })

	const loadSongJson = async () => {
		console.log('Load song json.')
		const songDirectory = FileSystem.documentDirectory + 'songs/'
		try {
			const infoSongDirectory = await FileSystem.getInfoAsync(songDirectory)
			if (infoSongDirectory.exists) {
				return console.log('Song json alredy loaded.')
			}
			await FileSystem.makeDirectoryAsync(songDirectory)
			await FileSystem.writeAsStringAsync(songDirectory + 'songs.json', JSON.stringify(songJson))
			console.log('Song json loaded with success.')
		} catch (error) {
			console.error('Error of loaded song json : ', error)
		} finally {
			setDataLoaded({ ...dataLoaded, song: true })
		}
	}
	const loadPartitions = async () => {
		console.log('Load partitions.')
		try {
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
			let count = 0
			for (const [relativePath, file] of Object.entries(partitionJsZip.files)) {
				count++
				const dataPdf = await file.async('base64')
				const path = partitionDirectory + relativePath
				await FileSystem.writeAsStringAsync(path, dataPdf, { encoding: FileSystem.EncodingType.Base64 })
				console.log(count)
			}
			await FileSystem.deleteAsync(partitionArchiveSystem)

			const partitionDirectoryContent = await FileSystem.readDirectoryAsync(partitionDirectory)
			console.log(`${partitionDirectoryContent.length} partitions loaded with success.`)
		} catch (error) {
			console.error('Error of loaded partitions : ', error)
		} finally {
			setDataLoaded({ ...dataLoaded, partition: true })
		}
	}

	const clearFileSystem = async (directoryUri: string) => {
		try {
			const files = await FileSystem.readDirectoryAsync(directoryUri);
			console.log('Suppression totale de FileSytem.documentDirectory', files.length)
			for (const file of files) {
				const fileInfo = await FileSystem.getInfoAsync(file)
				const fileUri = directoryUri + file
				if (fileInfo.isDirectory) {
					await clearFileSystem(fileUri)
				} else {
					await FileSystem.deleteAsync(fileUri, { idempotent: true });
				}
			}
			const newFiles = await FileSystem.readDirectoryAsync(directoryUri);
			console.log('Reussite de la suppression totale de FileSytem.documentDirectory', newFiles.length)
		} catch (error) {
			console.log('Erreur de la suppression totale de FileSytem.documentDirectory', error)
		}
	}

	useEffect(() => {
		// clearFileSystem(FileSystem.documentDirectory!)
		loadSongJson()
		loadPartitions()
	}, [])
	return {
		dataLoaded
	}
}