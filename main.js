const fs = require('fs/promises')
const path = require('path')

async function move(folder, newFolder, file) {
    await fs.mkdir(path.join(folder, newFolder), { recursive: true });
    await fs.rename(path.join(folder, file.name), path.join(folder, newFolder, file.name));
}

async function organize(folder) {

    try {
        const files = await fs.readdir(folder, { withFileTypes: true });

        for (const file of files) {
            if (!file.isDirectory()) {
                switch (path.extname(file.name)) {
                    case ".gif":
                    case ".webp":
                    case ".jpeg":
                    case ".png":
                    case ".jpg":
                        await move(folder, 'Images', file);
                        break;

                    case ".mp3":
                    case ".m4a":
                    case ".wav":
                        await move(folder, 'Music', file);
                        break;

                    case ".docx":
                    case ".pptx":
                    case ".xlsx":
                    case ".pdf":
                        await move(folder, 'Documents', file);
                        break;

                    case ".mp4":
                    case ".hevc":
                        await move(folder, 'Videos', file);
                        break

                    case ".exe":
                        await move(folder, 'Applications', file);
                        break;

                    default:
                        await move(folder, 'Other', file);
                        break;
                }
            }
        }
        console.log("Done");
    }

    catch (error) {
        if (error.code == 'ENOENT') {
            console.log("No such file or directory: ", error.path)
        }
        else {
            console.log("Something went wrong:", error.message)
        }
    }

}


if (!process.argv[2]) {
    console.log("Please provide a folder path.");
    console.log("Usage: node organize.js <folder-path>");
    process.exit(1);
}

const targetPath = path.resolve(process.argv[2]);
organize(targetPath);
