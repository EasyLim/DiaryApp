export interface INoteProperties {
    date: string,
    note: {
        isEmpty: boolean
        mood: number | undefined,
        text: string | undefined
    },
    position: string
}