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
    this.created = formatDate();
  }
}

function formatDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return correctData(day) + '.' + correctData(month) + '.' + correctData(year) + ' ' + correctData(hours) + '.' + correctData(minutes);
}

function correctData(param) {
  if (param < 10) {
    param = '0' + param;
  };
  return param;
}
