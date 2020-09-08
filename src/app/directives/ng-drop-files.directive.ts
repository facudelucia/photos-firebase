import { Directive, EventEmitter, ElementRef, Output, Input, HostListener } from '@angular/core';
import {FileItem} from "../models/file-item"
@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() files: FileItem[]=[]
  @Output() mouseOnElement: EventEmitter<boolean> = new EventEmitter()
  constructor() { }
  

  @HostListener("dragover", ["$event"])
  public onDragEnter(event:any){
    this.mouseOnElement.emit(true)
    this.preventStop(event)
  }
  @HostListener("dragleave", ["$event"])
  public onDragLeave(event:any){
    this.mouseOnElement.emit(false)
  }
  @HostListener("drop", ["$event"])
  public onDrop(event:any){
    
    const transference = this.getTransfer(event)
    if(!transference){
      return
    }
    this.extractFiles(transference.files)
    this.preventStop(event)
    this.mouseOnElement.emit(false)
  }
  private getTransfer(event:any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer
  }
  private extractFiles(fileList: FileList){
    for (const property in Object.getOwnPropertyNames(fileList)){
      const fileTemporary = fileList[property]
      if(this.fileCanLoaded(fileTemporary)){
        const newFile = new FileItem(fileTemporary)
        this.files.push(newFile)
      }
    }
    console.log(this.files)
  }
  private fileCanLoaded(file:File):boolean{
    if(!this.fileWasDropped(file.name) && (this.isImage(file.type))){
      return true
    }else{
      return false
    }
  }
  private preventStop(event){
    event.preventDefault()
    event.stopPropagation()
  }
  private fileWasDropped(fileName: string):boolean{
    for(const file of this.files){
      if(file.fileName === fileName){
        console.log("file" + fileName + "already exists")
        return true
      }
    }
    return false
  }
  private isImage(fileType:string):boolean{
    return (fileType === "" || fileType === undefined) ? false : fileType.startsWith("image")
  }
}
