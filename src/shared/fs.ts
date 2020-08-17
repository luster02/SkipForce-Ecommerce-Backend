import { unlink } from 'fs-extra'

export async function removeFile(filePath: any): Promise<any> {
    return unlink(filePath)
        .then(() => true)
        .catch(error => {
            console.log(error)
            return false
        })
}