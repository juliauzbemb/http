
const addForm = document.querySelector('.add-form');
const addFormButton = addForm.querySelector('.add-button');
const ticketsAll = document.querySelector('.tickets-items');
const addSection = document.querySelector('.add-section');
const addButton = document.querySelector('.add-ticket');

let currentItem;
let currentItemId;


document.addEventListener('DOMContentLoaded', () => {
  let data;

  console.log('domcontentloaded');

  let xhr = new XMLHttpRequest(); 

  xhr.open('GET', 'http://localhost:7070/?method=allTickets');

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        data = JSON.parse(xhr.responseText);
        for (let item of data) {
          ticketsAll.insertAdjacentHTML('beforeend', renderTask(item.id, item.name, item.created));
        };
      } catch (err) {
          console.log(err);
        };
      };
    });

  xhr.send();  
});


addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const body = new FormData(addForm);
  const xhr = new XMLHttpRequest();

  if (addForm.action === 'http://localhost:7070/?method=createTicket') {
    console.log('action create ticket');

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      };
      try {
        let info = JSON.parse(xhr.response);
        ticketsAll.insertAdjacentHTML('beforeend', renderTask(info.id, info.name, info.created));
        addForm.reset();
      } catch (err) {
        console.log(err);
      };
    };

    xhr.open('POST', 'http://localhost:7070/?method=createTicket');
    xhr.send(body);
  };

  if (addForm.action === `http://localhost:7070/?method=ticketById&id=${currentItemId}&change=true`){
    console.log('action change ticket by id');

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      };
      try {
        let info = JSON.parse(xhr.response);
        currentItem.querySelector('.tickets-item-name').textContent = info.name;
        currentItem.querySelector('.tickets-item-details').textContent = info.description;
        addForm.reset();
        addSection.classList.add('hidden');
      } catch (err) {
        console.log(err);
      };
    };

    xhr.open('PUT', `http://localhost:7070/?method=ticketById&id=${currentItemId}&change=true`);
    xhr.send(body);
  };
});

function renderTask(id, name, created) {
  return `
    <div class="tickets-item" id=${id}>
        <div class="tickets-item-element tickets-item-name-full">
            <div class="tickets-item-element tickets-item-status"></div>
            <div class="tickets-item-name-block">
                <div class="tickets-item-name">${name}</div>
                <div class="tickets-item-details hidden"></div>
            </div>
        </div>
        <div class="tickets-item-element tickets-item-date">${created}</div>
        <div class="tickets-item-edit">
            <div class="tickets-item-element tickets-item-change">&#9998;</div>
            <div class="tickets-item-element tickets-item-delete">&#x2715;</div>
        </div>
    </div>`
};


ticketsAll.addEventListener('click', (e) => {
  currentItem = e.target.closest('.tickets-item');
  currentItemId = Number(currentItem.id);

  if (e.target.classList.contains('tickets-item-status')) {
    if (e.target.textContent !== '') {
      e.target.textContent = '';
    } else {
      e.target.innerHTML = '&#10003;';
    };
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      };
      try {
        ticketsAll.removeChild(currentItem);
      } catch (err) {
        console.log(err);
      };
    };
    xhr.open('PUT', `http://localhost:7070/?method=ticketById&id=${currentItemId}&status=true`);
    xhr.send();
  } else if (e.target.classList.contains('tickets-item-change')) {
    addSection.classList.remove("hidden");
    addForm.action = `http://localhost:7070/?method=ticketById&id=${currentItemId}&change=true`;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      };
      try {
        let info = JSON.parse(xhr.response);
        addForm.querySelector('.name').value = info.name;
        addForm.querySelector('.description').value = info.description;
      } catch (err) {
        console.log(err);
      };
    };
    xhr.open('GET', `http://localhost:7070/?method=ticketById&id=${currentItemId}`);
    xhr.send();
  } else if (e.target.classList.contains('tickets-item-delete')) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      };
      try {
        ticketsAll.removeChild(currentItem);
      } catch (err) {
        console.log(err);
      };
    };
    xhr.open('DELETE', `http://localhost:7070/?method=ticketById&id=${currentItemId}&delete=true`);
    xhr.send();
  } else {
    console.log('item body details reveal');
    let currentItemDescription = currentItem.querySelector('.tickets-item-details');
    currentItemDescription.classList.toggle('hidden');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:7070/?method=ticketById&id=${currentItemId}`);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      };
      try {
        let info = JSON.parse(xhr.response);
        currentItemDescription.textContent = info.description;
      } catch (err) {
        console.log(err);
      };
    };
  };
});
