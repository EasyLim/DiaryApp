import { IParser } from "./IParser";

const fs = window.require('fs')
const path = window.require('path')
const { app } = window.require('@electron/remote')

export class daylioCSV implements IParser{
    public parse (file: string) : Object[]
    {
        file = file.toString()
        let ok = file.split('\n')
                    .slice(1)
                    .map(e => e.split('\"'))
                    .map(e => [...e[0].split(','), e.slice(5, e.length - 1).join("\"")])
                    .map(e => [e[0], e[4], e[6]])
                    .map(e => [...e.slice(0, 2), e[2].split('""').join('"')])
        console.log(ok)
        let notes = []
        for (let data of ok) {
            let date = new Date(data[0])
            let moodList = {
                "ужасно": 1,
                "плохо": 2,
                "так себе": 3,
                "хорошо": 4,
                "супер": 5
            }
            let note = {
                date: `${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}`,
                mood: moodList[data[1]],
                text: data[2]
            }
            notes.push(note)
        }
        console.log(JSON.stringify(notes))
        return notes
    }
}