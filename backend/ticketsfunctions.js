import fs from 'fs';

import { Ticket, TicketFull } from './ticket.js';


export function getTicketsFull() {
    let readFile = fs.readFileSync('./content.json', 'utf8');
    let ticketsAll = JSON.parse(readFile);
    return ticketsAll;
};

export function getTicketByName(name) {
    let readFile = fs.readFileSync('./content.json', 'utf-8');
    let ticketsAll = JSON.parse(readFile);
    let targetTicket = ticketsAll.find((item) => item.name === name);
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

export function getTicketsWithDescription() {
    let ticketsFull = [];
    for (let item of getTicketsFull()) {
        ticketsFull.push(new TicketFull(item.name, item.description));
    };
    return ticketsFull;
}


// нужна функция для поиска по id и изменения карточки

export function changeTicketById(id, name, description) {
    let data = getTicketsFull();
    console.log(data);
    for (let item of data) {
        if (item.id === Number(id)) {
            item.name = name;
            item.description = description;
            break;
        } else {
            console.log('not found');
        };
    };
    let jsonContent = JSON.stringify(data);
    fs.writeFileSync('./content.json', jsonContent, 'utf8');
    console.log('written');
}


export function deleteById(id) {
    let data = getTicketsFull();
    let index = data.findIndex((element) => element.id === Number(id));
    data.splice(index, 1);
    console.log(index);
    console.log(data);
    console.log('deleted');
    let jsonContent = JSON.stringify(data);
    fs.writeFileSync('./content.json', jsonContent, 'utf8');
    console.log('written');
}

export function changeStatusById(id) {
    let data = getTicketsFull();
    let element = data.find((el) => el.id === Number(id));
    element.status = true;
    console.log(data);
    let jsonContent = JSON.stringify(data);
    fs.writeFileSync('./content.json', jsonContent, 'utf8');
    console.log('written');
}