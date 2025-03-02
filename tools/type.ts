export type Song = {
	title: string,
	lyrics: { key: string, value: string[] }[],
	isPartition: boolean,
	author: string,
	type: number[]
}
export type PopupAndSong = {
	isShowPopup: boolean,
	selectedSong: string
}
export type StateAxios = {
	isLoading: boolean,
	isError: boolean,
	isFinish: boolean,
	message?: string
}

