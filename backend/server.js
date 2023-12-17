import { TicketFull } from './ticket.js';
import { getTickets, getTicketsFull, addTicketFull, changeTicketById, getTicketByName, deleteById, changeStatusById } from './ticketsfunctions.js';
import Koa from 'koa';

import fs from 'fs';
import path from 'path';
import http from 'http';

import { koaBody } from 'koa-body';

import koaStatic from 'koa-static';

import cors from '@koa/cors';


const app = new Koa();

app.use(cors());

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));

app.use(async(ctx) => {
  // console.log(ctx.request.body);
  // ctx.response.set('Access-Control-Allow-Origin', '*');
  // ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST');
  // ctx.response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { method } = ctx.request.query;
  
  switch (method) {
    case 'createTicket':
      const { name, description } = ctx.request.body;
      let new_ticket = new TicketFull(name, description);

      if (getTicketsFull().some((item) => item.name === new_ticket.name)) {
        console.log('in the list');
        ctx.response.body = 'задача уже в списке';
      } else {
          addTicketFull(new_ticket);
          ctx.response.body = new_ticket;
        }
      return;
    case 'allTickets':
      try {
          ctx.response.body = getTickets().filter((el) => el.status === false);
          } catch (err) {
          console.log(err);
          };
      return;
    case 'ticketById':
      let { id } = ctx.request.query;
      let ticketTarget;
      if (ctx.request.query.change === 'true') {
        console.log('change from server');
        console.log(ctx.request.body);
        changeTicketById(id, ctx.request.body.name, ctx.request.body.description);
        console.log('end');
        let targetTicket = getTicketByName(ctx.request.body.name);
        ctx.response.status = 201;
        ctx.response.body = targetTicket;
        return;
      };
      if (ctx.request.query.delete === 'true') {
        console.log('delete from server');
        deleteById(id);
        ctx.response.status = 200;
        return;
      };
      if (ctx.request.query.status === 'true') {
        console.log('status change');
        changeStatusById(id);
        ctx.response.status = 200;
        return;
      };
      console.log('without change');
      ticketTarget = getTicketsFull().find((item) => item.id.toString() === id);
      ctx.response.body = ticketTarget;
      return;
    default: 
      ctx.response.status = 404;
      return;
}});


const server = http.createServer(app.callback());

const port = 7070;
 
server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  };
  console.log('Server is listening to ' + port);
});
