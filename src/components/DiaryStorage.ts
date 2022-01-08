import { INoteJson, INoteProperties } from "./INoteProperties"

const { app, dialog } = window.require('@electron/remote')
const fs = window.require('fs')
const path = window.require('path')

export function getDiaryArray(): INoteProperties[] {
    return formatDiaryArray(parseDiaryJson())
}

export function addNote(note: INoteJson) {
    let data = parseDiaryJson()
    
    // Prevent adding note with the same date
    if (data.map((entry, index) => { return entry.date }).includes(note.date)) {
        dialog.showErrorBox("UwU", "Извините, на один день можно добавить только одну запись.")
        return 
    }

    data.push(note)
    writeData(data)
}

export function deleteNote(date: string) {
    let data = parseDiaryJson()
    writeData(data.filter(note => note.date != date))
}

export function parseDiaryJson(): INoteJson[] {
    if (!fs.existsSync(path.join(app.getPath("userData"), 'notes.json'))) {
        fs.writeFileSync(path.join(app.getPath("userData"), 'notes.json'), JSON.stringify([]))
    }
    return JSON.parse(fs.readFileSync(path.join(app.getPath("userData"), 'notes.json'), 'utf-8' ))
}

function writeData(data: INoteJson[]) {
    fs.writeFileSync(path.join(app.getPath("userData"), 'notes.json'), JSON.stringify(data))
}

function formatDiaryArray(data: INoteJson[]): INoteProperties[] {
    if (data.length == 0) return []
    // Sort parsed days for counting skipped days later
    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Map parsed data
    let propNotes = data.map((note, index) => {
        let result = {
            date: note.date,
            note: {
                isEmpty: false,
                mood: note.mood,
                text: note.text
            },
            position: 'righter'
        }
        return result
    })

    // Calculate skipped days
    let skippedDays: INoteProperties[] = []
    for (let i = 0; i < propNotes.length - 1; i++) {
        let daysSkippedCount = Math.floor((new Date(propNotes[i].date).getTime() - new Date(propNotes[i + 1].date).getTime()) / 86400000) - 1
        if (daysSkippedCount > 0) {
            for (let j = 1; j <= daysSkippedCount; j++) {
                let date = new Date(new Date(propNotes[i].date).getTime() - 86400000 * j)
                let dateText = `${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}`
                skippedDays.push({index: undefined, date: dateText, note: {mood: undefined, text: undefined, isEmpty: true}, position: 'righter'})
            }
        }
    }

    // Add skipped days to general array
    propNotes = propNotes.concat(skippedDays)

    // Sort general array and change date to human format
    propNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Add skipped days before today
    let skippedDaysCount = Math.floor((Date.now() - new Date(propNotes[0].date).getTime()) / 86400000) - 1
    for (let i = skippedDaysCount; i > 0; i--) {
        let date = new Date(Date.now() - 86400000 * i)
        let dateText = `${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}`
        propNotes.unshift({date: dateText, note: {mood: undefined, text: undefined, isEmpty: true}, position: 'righter'})
    }
    
    let final = propNotes.map((note, index) => {
        let formatNote = {...note, index: index}
        formatNote.date = note.date
        return formatNote
    })
    if (final[0]) final[0].position = 'focus'
    if (final[1]) final[1].position = 'right'

    return final
}