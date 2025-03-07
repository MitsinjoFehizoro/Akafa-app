import { Asset } from 'expo-asset'
import * as FileSystem from "expo-file-system";
import JSZip from 'jszip';
import { useCallback, useEffect, useState } from 'react';
import songJson from '../assets/data/songs.json'
import { Song } from '@/tools/type';

export const useLoadData = () => {
	const [isDataLoading, setIsDataLoading] = useState(false)
	const [percentage, setPercentage] = useState<string>('0.00')
	const songDirectory = FileSystem.documentDirectory + 'songs/'
	const partitionDirectory = FileSystem.documentDirectory + 'partitions/'
	let dataLength = 0
	const loadSongJson = async () => {
		console.log('Load song json.')
		try {
			await FileSystem.makeDirectoryAsync(songDirectory)
			await FileSystem.writeAsStringAsync(songDirectory + 'songs.json', JSON.stringify(songJson))
			dataLength = (JSON.parse(await FileSystem.readAsStringAsync(songDirectory + 'songs.json')) as Song[]).filter(s => s.isPartition === true).length
			console.log('Song json loaded with success.')
		} catch (error) {
			console.error('Error of loaded song json : ', error)
		}
	}

	const loadPartitions = async () => {
		console.log('Load partitions.')
		try {
			setIsDataLoading(true)
			const partitionArchive = Asset.fromModule(require('@/assets/data/partitions.zip'))
			setPercentage(0.1.toFixed(2))
			await partitionArchive.downloadAsync()
			setPercentage(0.2.toFixed(2))
			await FileSystem.makeDirectoryAsync(partitionDirectory)
			setPercentage(0.3.toFixed(2))
			const partitionArchiveSystem = FileSystem.documentDirectory + 'partitions.zip'
			await FileSystem.copyAsync({
				from: partitionArchive.localUri!,
				to: partitionArchiveSystem
			})
			setPercentage(0.5.toFixed(2))
			const partitionZipData = await FileSystem.readAsStringAsync(partitionArchiveSystem, { encoding: FileSystem.EncodingType.Base64 })
			setPercentage(0.7.toFixed(2))
			const partitionJsZip = await JSZip.loadAsync(partitionZipData, { base64: true })
			setPercentage(1.0.toFixed(2))
			let count = 0
			for (const [relativePath, file] of Object.entries(partitionJsZip.files)) {
				count++
				const dataPdf = await file.async('base64')
				const path = partitionDirectory + relativePath
				await FileSystem.writeAsStringAsync(path, dataPdf, { encoding: FileSystem.EncodingType.Base64 })
				setPercentage(((count * 100) / 112).toFixed(2))
			}
			await FileSystem.deleteAsync(partitionArchiveSystem)

			const partitionDirectoryContent = await FileSystem.readDirectoryAsync(partitionDirectory)
			console.log(`${partitionDirectoryContent.length} partitions loaded with success.`)
			setIsDataLoading(false)
		} catch (error) {
			console.error('Error of loaded partitions : ', error)
		}
	}

	const loadData = async () => {
		const infoSongDirectory = await FileSystem.getInfoAsync(songDirectory)
		const infoPartitionDirectory = await FileSystem.getInfoAsync(partitionDirectory)
		if (infoSongDirectory.exists && infoPartitionDirectory.exists) {
			setIsDataLoading(false)
			return console.log('Songs and partitions already loaded.')
		}
		loadSongJson()
		loadPartitions()
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
		loadData()
	}, [])

	return {
		isDataLoading,
		percentage
	}
}