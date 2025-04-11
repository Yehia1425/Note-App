import { NoteService } from './../../core/services/note/note.service';
import { Component, inject, OnInit } from '@angular/core';
import { Inote } from '../../core/interfaces/inote';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { title } from 'process';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, DatePipe, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private readonly noteService = inject (NoteService)


  noteList:Inote[]= [ ]


  addNoteForm:FormGroup = new FormGroup({
    title :new FormControl (null , Validators.required),
    content :new FormControl (null , Validators.required)
  })
  UpdateForm :FormGroup = new FormGroup({
    _id : new FormControl (null,),
    title :new FormControl (null , Validators.required),
    content :new FormControl (null , Validators.required)
  })

ngOnInit(): void {
    this.getUserNote()
}


  getUserNote(){
    this.noteService.getUser().subscribe({
      next:(res)=>{
        console.log(res)
        this.noteList= res.notes
        console.log(this.noteList)
      },
      error:(err)=>{

        this.noteList= [ ]

        
      }
    })
  }


  addnote(){
   this.noteService.Add(this.addNoteForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.getUserNote()
      
    },
    error:(err)=>{
      console.log(err);
      
    }
   })
    
  }

  delete(id:any){
    this.noteService.deleteNote(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.getUserNote()
        
      },
      error:(err)=>{
        console.log(err);
        
      }
     })
    }


    patchValue(note:any){
      this.UpdateForm.patchValue(note)
    }

    UpdateNote(){


      const {_id ,title , content} = this.UpdateForm.value


    this.noteService.updateNote(_id , {title , content}).subscribe({
      next:(res)=>{
        this.getUserNote()
      },
      error:(err)=>{
        
      }
    })
    }
  }

