import { Component, OnInit } from '@angular/core';
import {FileItem} from "../../models/file-item"
import { LoadImagesService } from 'src/app/services/load-images.service';
@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: [
  ]
})
export class LoadComponent implements OnInit {
  files: FileItem[]=[]
  isOnElement = false
  constructor(private loadImagesService: LoadImagesService) { }

  ngOnInit(): void {
  }
  loadImages(){
    this.loadImagesService.loadImagesFirebase(this.files)
  }
  prueba(event){
    console.log(event)
  }
  cleanFiles(){
    this.files = []
  }
}
