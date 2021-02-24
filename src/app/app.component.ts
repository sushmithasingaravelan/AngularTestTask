import {Component, EventEmitter} from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  galleryImages = [{
      src: null
    },
    {
      src: null,
    },
    {
      src: null,
    }, 
    {
      src: null,
    },
    {
      src: null,
    },
    {
     src: null,
    }
  ];

  //File Upload

  public uploader: FileUploader = new FileUploader({
    
    disableMultipart: false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf']


  });

  public onFileSelected(event: EventEmitter<File[]>,pos) {
    console.log(pos);
    const file: File = event[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.galleryImages.forEach((elem:any, index) => {
        console.log(pos,index);
        if (pos == index) {
          console.log(elem);
          elem.src = reader.result;
        }
      });
      
    }
  }

  //Delete the image from array

  deleteImage(index){
    this.galleryImages.splice(index, 1); 
    this.galleryImages.push({ 'src': null }); 
  }
}
