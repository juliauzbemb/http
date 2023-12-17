import { TicketFull } from './ticket.js';
import { getTickets, getTicketsFull, addTicketFull, changeById, deleteById, changeStatusById, getTicketById } from './ticketsfunctions.js';
import Koa from 'koa';
import http from 'http';
import { koaBody } from 'koa-body';
import cors from '@koa/cors';

const app = new Koa();

app.use(cors());

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));

app.use(async(ctx) => {
  // ctx.response.set('Access-Control-Allow-Origin', '*');
  // ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST');
  // ctx.response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { method } = ctx.request.query;
  console.log(method);
  
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
      };
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
        changeById(id, ctx.request.body.name, ctx.request.body.description);
        ctx.response.status = 200;
        ticketTarget = getTicketById(id);
        ctx.response.body = ticketTarget;
        return;
      };

      if (ctx.request.query.delete === 'true') {
        deleteById(id);
        ctx.response.status = 200;
        return;
      };

      if (ctx.request.query.status === 'true') {
        changeStatusById(id);
        ctx.response.status = 200;
        return;
      };

      ticketTarget = getTicketById(id);
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
