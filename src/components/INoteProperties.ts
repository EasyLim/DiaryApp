export interface INoteProperties {
    index: number
    date: string,
    note: {
        isEmpty: boolean
        mood: number | undefined,
        text: string | undefined
    },
    position: string
}