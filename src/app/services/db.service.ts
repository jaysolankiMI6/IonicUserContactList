// db.service.ts

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Song } from './song';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Contact } from './contact';


@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  songsList = new BehaviorSubject([]);
  userList = new BehaviorSubject([]);
  contactList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private webview: WebView,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchSongs(): Observable<Song[]> {
    return this.songsList.asObservable();
  }
  fetchUsers(): Observable<User[]> {
    return this.userList.asObservable();
  }
  fetchContacts(): Observable<Contact[]> {
    return this.contactList.asObservable();
  }
  // Render fake data
  getFakeData() {
    this.httpClient.get(
      'assets/dump.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getSongs();
          this.getUsers();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  // Get list
  getSongs() {
    return this.storage.executeSql('SELECT * FROM songtable', []).then(res => {
      let items: Song[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            artist_name: res.rows.item(i).artist_name,
            song_name: res.rows.item(i).song_name
          });
        }
      }
      this.songsList.next(items);
    });
  }

  // Get list
  getUsers() {
    return this.storage.executeSql('SELECT * FROM usertable', []).then(res => {
      let items: User[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            u_name: res.rows.item(i).u_name,
            u_email: res.rows.item(i).u_email,
            u_password: res.rows.item(i).u_password,
            u_birthday: res.rows.item(i).u_birthday,
            u_gender: res.rows.item(i).u_gender,
            u_profilelink: res.rows.item(i).u_profilelink
          });
        }
      }
      this.userList.next(items);
    });
  }

  // Get list
  getContacts() {
    return this.storage.executeSql('SELECT * FROM contacttable', []).then(res => {
      let items: Contact[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            u_id: res.rows.item(i).u_id,
            u_name: res.rows.item(i).u_name,
            u_img: res.rows.item(i).u_img,
            u_email: res.rows.item(i).u_email,
            u_phonenumber: res.rows.item(i).u_phonenumber,
          });
        }
      }
      this.contactList.next(items);
    });
  }


  // Add
  addSong(artist_name, song_name) {
    let data = [artist_name, song_name];
    return this.storage.executeSql('INSERT INTO songtable (artist_name, song_name) VALUES (?, ?)', data)
      .then(res => {
        this.getSongs();
      });
  }

  // Add
  addUser(name, email, password, birthday, gender, profilelink) {
    let data = [name, email, password, birthday, gender, profilelink];
    return this.storage.executeSql('INSERT INTO usertable (u_name, u_email, u_password, u_birthday, u_gender, u_profilelink) VALUES (?, ?, ?, ? , ?, ?)', data)
      .then(res => {
        this.getUsers();
      });
  }


  addContact(uid, name, image, email, phonenumber) {
    let data = [uid, name, image, email, phonenumber];
    return this.storage.executeSql('INSERT INTO contacttable (u_id, u_name, u_img, u_email, u_phonenumber) VALUES (?, ?, ?, ?, ?)', data)
      .then(res => {
        this.getContacts();
      });
  }

  // Get single object
  getSong(id): Promise<Song> {
    return this.storage.executeSql('SELECT * FROM songtable WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        artist_name: res.rows.item(0).artist_name,
        song_name: res.rows.item(0).song_name
      }
    });
  }

  // Get single object
  //  getUser(username): Promise<User> {
  //   return this.storage.executeSql('SELECT * FROM usertable WHERE usr_name = ?', [username]).then(res => {
  //     return {
  //       id: res.rows.item(0).id,
  //       u_email: res.rows.item(0).u_name, 
  //       // usr_name: res.rows.item(0).usr_name,
  //       u_password: res.rows.item(0).u_password
  //     }
  //   });
  // }

  // Get single object
  getUser(username): Promise<User> {
    return this.storage.executeSql('SELECT * FROM usertable WHERE u_email = ?', [username]).then(res => {
      return {
        id: res.rows.item(0).id,
        u_name: res.rows.item(0).u_name,
        u_email: res.rows.item(0).u_email,
        u_password: res.rows.item(0).u_password,
        u_birthday: res.rows.item(0).u_birthday,
        u_gender: res.rows.item(0).u_gender,
        u_profilelink: res.rows.item(0).u_profilelink
      }
    });
  }

  // Get single object
  //  getContactsOfUser(uid): Promise<User> {
  //   return this.storage.executeSql('SELECT * FROM contacttable WHERE u_id = ?', [uid]).then(res => {
  //     return {
  //       id: res.rows.item(0).id,
  //       u_email: res.rows.item(0).u_email, 
  //       // usr_name: res.rows.item(0).usr_name,
  //       u_password: res.rows.item(0).u_password
  //     }
  //   });
  // }

  // Get single object
  // getContactsOfUser(uid): Promise<Contact> {
  //   return this.storage.executeSql('SELECT * FROM contacttable WHERE u_id = ?', [uid]).then(res => {
  //     return {
  //       id: res.rows.item(i).id,
  //       u_id: res.rows.item(i).u_id, 
  //       u_name: res.rows.item(i).u_name,
  //       u_img: res.rows.item(i).u_img,
  //       u_email: res.rows.item(i).u_email,
  //       u_phonenumber: res.rows.item(i).u_phonenumber
  //     }
  //   });
  // }

  getContactsOfUser(uid): Promise<any> {
    return this.storage.executeSql('SELECT * FROM contacttable WHERE u_id = ?', [uid]).then(res => {
      let items: Contact[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            u_id: res.rows.item(i).u_id,
            u_name: res.rows.item(i).u_name,
            u_img: res.rows.item(i).u_img,
            u_email: res.rows.item(i).u_email,
            u_phonenumber: res.rows.item(i).u_phonenumber,
          });
        }
      }
      this.contactList.next(items);
    });
  }

  // Update
  updateSong(id, song: Song) {
    let data = [song.artist_name, song.song_name];
    return this.storage.executeSql(`UPDATE songtable SET artist_name = ?, song_name = ? WHERE id = ${id}`, data)
      .then(data => {
        this.getSongs();
      })
  }

  // Update
  updateContact(id, contactdata: any) {
    let data = [contactdata.name, contactdata.email, contactdata.number];
    return this.storage.executeSql(`UPDATE contacttable SET u_name = ?, u_email = ? , u_phonenumber = ? WHERE id = ${id}`, data)
      .then(data => {
        this.getContacts();
      })
  }

  // Delete
  deleteSong(id) {
    return this.storage.executeSql('DELETE FROM songtable WHERE id = ?', [id])
      .then(_ => {
        this.getSongs();
      });
  }

   // Delete
   deleteContact(id) {
    return this.storage.executeSql('DELETE FROM contacttable WHERE id = ?', [id])
      .then(_ => {
        this.getContacts();
      });
  }
}