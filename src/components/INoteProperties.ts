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

export interface INoteJson {
    date: string,
    mood: number,
    text: string
}