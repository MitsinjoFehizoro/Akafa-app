export type Song = {
	title: string,
	lyrics: { key: string, value: string[] }[],
	partition: { isPartition: boolean, url: string },
	author: string,
	type: number[]
}