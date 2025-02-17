export type Song = {
	title: string,
	lyrics: { key: string, value: string[] }[],
	isPartition: boolean,
	author: string,
	type: number[]
}