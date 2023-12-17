import fs from 'fs';

import { Ticket } from './ticket.js';


export function getTicketsFull() {
  let readFile = fs.readFileSync('./content.json', 'utf8');
  let ticketsAll = JSON.parse(readFile);
  return ticketsAll;
};

export function getTicketById(id) {
  let targetTicket = getTicketsFull().find((item) => item.id === Number(id));
  return targetTicket;
}

export function addTicketFull(ticketfull) {
  let newData = getTicketsFull()
  newData.push(ticketfull);
  let jsonContent = JSON.stringify(newData);
  fs.writeFileSync('./content.json', jsonContent, 'utf8');
}

export function getTickets() {
  let tickets = [];
  for (let item of getTicketsFull()) {
    tickets.push(new Ticket(item.id, item.name, item.status, item.created));
  }
  return tickets;
}

export function changeById(id, name, description) {
  let data = getTicketsFull();
  for (let item of data) {
    if (item.id === Number(id)) {
      item.name = name;
      item.description = description;
      break;
    };
  };
  let jsonContent = JSON.stringify(data);
  fs.writeFileSync('./content.json', jsonContent, 'utf8');
  console.log('written after change name or/and description');
}

export function deleteById(id) {
  let data = getTicketsFull();
  let index = data.findIndex((element) => element.id === Number(id));
  data.splice(index, 1);
  console.log('deleted');
  let jsonContent = JSON.stringify(data);
  fs.writeFileSync('./content.json', jsonContent, 'utf8');
  console.log('written after deletion');
}

export function changeStatusById(id) {
  let data = getTicketsFull();
  let element = data.find((el) => el.id === Number(id));
  element.status = true;
  let jsonContent = JSON.stringify(data);
  fs.writeFileSync('./content.json', jsonContent, 'utf8');
  console.log('written after change status');
}
