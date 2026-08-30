import fs from 'fs/promises'

export const readMenuFile = async (filePath) => {
    const fileContent = await fs.readFile(filePath, 'utf-8')

    return JSON.parse(fileContent)
}

export const deleteFile = async (filePath) => {
    await fs.unlink(filePath)
}