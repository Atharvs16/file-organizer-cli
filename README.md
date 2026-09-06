# File Organizer CLI 📁

A simple command-line file organizer built with Node.js.

This tool scans a folder and automatically organizes files into different folders based on their file extensions.

## Features

* Organizes files into categories:

  * 🖼️ Images
  * 🎵 Music
  * 📄 Documents
  * 🎬 Videos
  * 💻 Applications
  * 📦 Other
* Supports asynchronous file operations using `fs/promises`
* Creates category folders automatically
* Accepts a folder path through command-line arguments
* Handles invalid folder paths
* Supports a `--dry-run` mode to preview changes without moving any files
* Handles uppercase and lowercase file extensions

## Supported File Types

| Category     | File Extensions                          |
| ------------ | ---------------------------------------- |
| Images       | `.gif`, `.webp`, `.jpeg`, `.png`, `.jpg` |
| Music        | `.mp3`, `.m4a`, `.wav`                   |
| Documents    | `.docx`, `.pptx`, `.xlsx`, `.pdf`        |
| Videos       | `.mp4`, `.hevc`                          |
| Applications | `.exe`                                   |
| Other        | All other file types                     |

## Installation

Clone the repository:

```bash
git clone https://github.com/Atharvs16/file-organizer-cli.git
```

Navigate into the project folder:

```bash
cd file-organizer-cli
```

## Usage

Run the program by providing the path of the folder you want to organize:

```bash
node organize.js <folder-path>
```

### Example

```bash
node organize.js c:/downloads
```

The program will scan the `downloads` folder and organize files into appropriate subfolders.

For example:

### Before

```text
downloads/
├── photo.jpg
├── cat.png
├── resume.pdf
├── presentation.pptx
├── song.mp3
├── video.mp4
└── app.exe
```

### After

```text
downloads/
├── Images/
│   ├── photo.jpg
│   └── cat.png
│
├── Documents/
│   ├── resume.pdf
│   └── presentation.pptx
│
├── Music/
│   └── song.mp3
│
├── Videos/
│   └── video.mp4
│
└── Applications/
    └── app.exe
```

## Dry Run

The CLI also supports a `--dry-run` option.

This allows you to preview which files would be moved without actually changing anything.

```bash
node organize.js <folder-path> --dry-run
```

### Example

```bash
node organize.js c:/downloads --dry-run
```

Example output:

```text
photo.jpg -> Images
resume.pdf -> Documents
song.mp3 -> Music
video.mp4 -> Videos
app.exe -> Applications

Dry run complete. No files were moved.
```

## Error Handling

The program handles common errors such as:

* Missing folder path
* Invalid folder paths
* Missing files or directories
* Other unexpected file system errors

If no folder path is provided:

```text
Please provide a folder path.
Usage: node organize.js <folder-path>
```

## Technologies Used

* Node.js
* JavaScript
* `fs/promises`
* `path`
* Command-line arguments using `process.argv`

## What I Learned

While building this project, I learned about:

* Node.js fundamentals
* Asynchronous programming with `async/await`
* File system operations
* Reading directory contents
* Creating directories
* Moving files
* Working with file paths and extensions
* Command-line arguments
* Error handling
* Building a simple CLI application

## Future Improvements

Possible improvements for the project:

* Add more supported file extensions
* Allow users to create custom categories
* Add additional command-line options
* Display a summary of organized files
* Add support for recursive folder organization

---

Built with Node.js as a learning project.
