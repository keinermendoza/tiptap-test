import Image from "@editorjs/image"
import axiosInstance from "../services/axios"

export default class CustomImage extends Image {
      removed() {
        // access the image block's file data
        const { file } = this._data
        console.log(file)
        axiosInstance.delete(`post/image/delete/${file.id}/`)
        .then(resp => console.log(resp))
        
        // do something with the file data
        // i.e. delete from server or s3 bucket
        }
   }