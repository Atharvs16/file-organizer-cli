const fs = require('fs/promises')
const path = require('path')

async function move(folder, newFolder, file) {
    await fs.mkdir(path.join(folder, newFolder), { recursive: true });
    await fs.rename(path.join(folder, file.name), path.join(folder, newFolder, file.name));
}

async function organize(folder, isDryRun) {

    try {
        const files = await fs.readdir(folder, { withFileTypes: true });
        for (const file of files) {
            if (!file.isDirectory()) {
                let newFolder;
                switch (path.extname(file.name).toLowerCase()) {
                    case ".gif":
                    case ".webp":
                    case ".jpeg":
                    case ".png":
                    case ".jpg":
                        newFolder = "Images";
                        break;

                    case ".mp3":
                    case ".m4a":
                    case ".wav":
                        newFolder = "Music";
                        break;

                    case ".docx":
                    case ".pptx":
                    case ".xlsx":
                    case ".pdf":
                        newFolder = "Documents";
                        break;

                    case ".mp4":
                    case ".hevc":
                        newFolder = "Videos";
                        break;

                    case ".exe":
                        newFolder = "Applications";
                        break;

                    default:
                        newFolder = "Other";
                        break;
                }
                if(isDryRun){
                    console.log(file.name, ' -> ', newFolder);
                }
                else{
                    await move(folder, newFolder, file);
                }
            }
        }
        if(isDryRun){
            console.log('Dry run complete. No files were moved.');
        }
        else{
            console.log("Organization complete!");
        }
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

if (process.argv[3] && process.argv[3] !== '--dry-run') {
    console.log("If you want to use dry run:");
    console.log("node organize.js <folder-path> --dry-run");
    process.exit(1);
}

const isDryRun = process.argv[3] === '--dry-run';

const targetPath = path.resolve(process.argv[2]);
organize(targetPath, isDryRun);
