import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpClient:HttpClient) { }


  Add(data:any):Observable<any>{
    return this.httpClient.post(`https://note-sigma-black.vercel.app/api/v1/notes`,data)
  }

  getAll():Observable<any>{
    return this.httpClient.get(`https://note-sigma-black.vercel.app/api/v1/notes/allNotes`)
  }
  
  getUser():Observable<any>{
    return this.httpClient.get(`https://note-sigma-black.vercel.app/api/v1/notes`)
  }

  updateNote(id:any, data:any):Observable<any>{
    return this.httpClient.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,data)
  }

  deleteNote(id:any):Observable<any>{
    return this.httpClient.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`)
  }


}

