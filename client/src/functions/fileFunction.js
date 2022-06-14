import FileResizer from "react-image-file-resizer"

export const resizePhotos = (file, compressRate) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      compressRate || 10, // Lower means more compressed
      0,
      (uri) => {
        resolve(uri)
      },
      "base64"
    )
  })

  export const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = ""
      // Make new FileReader
      let reader = new FileReader()
  
      // Convert the file to base64 text
      reader.readAsDataURL(file)
  
      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result
        resolve(baseURL)
      }
    })
  }