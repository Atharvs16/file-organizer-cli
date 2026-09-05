const fs = require('fs/promises')
const path = require('path')

/* async function isDirectoryPresent(folder, name) {
    try {
        const files = await fs.readdir(folder, { withFileTypes: true })
        const folders = entries
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        for(const file in folders){
            if(file === name){
                return true;
            }
        }

        return false;
    } catch (error) {
        console.log(error.message);
    }
} */

async function move(folder, newFolder, file) {
    await fs.mkdir(path.join(folder, newFolder) , { recursive: true });
    await fs.rename(path.join(folder, file.name), path.join(folder, newFolder, file.name));
}

async function organize(folder) {
    
        const files = await fs.readdir(folder, { withFileTypes: true });
    
        for(const file of files){
            if (!file.isDirectory()){
                switch (path.extname(file.name)) {
                    case ".gif":
                    case ".webp":
                    case ".jpeg":
                    case ".png":
                    case ".jpg":
                        move(folder, 'Images', file);
                        break;

                    case ".mp3":
                    case ".m4a":
                    case ".wav":
                        move(folder, 'Music', file);
                        break;
                    
                    case ".docx":
                    case ".pptx":
                    case ".xlsx":
                    case ".pdf":
                        move(folder, 'Documents', file);
                        break;

                    case ".mp4":
                    case ".hevc":
                        move(folder, 'Videos', file);
                        break

                    case ".exe":
                        move(folder, 'Applications', file);
                        break;
                
                    default:
                        move(folder, 'Other', file);
                        break;
                }
            }
        }
        console.log("Done");
    
}



const targetPath = path.resolve(process.argv[2]);
organize(targetPath);