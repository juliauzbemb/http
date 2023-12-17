import fs from 'fs';

export class Ticket {
  constructor(id, name, status, created) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.created = created;
  }
}

export class TicketFull {
  constructor(name, description) {
    this.id = Date.now();
    this.name = name;
    this.description = description;
    this.status = false;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
      day = '0' + day;
    };
    if (month < 10) {
      month = '0' + month;
    };
    let hours = date.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    };
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    this.created = day + '.' + month + '.' + year + ' ' + hours + '.' + minutes;
  }
}









