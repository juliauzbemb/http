export default class ManageTickets {
  constructor() {
    this.addButton = document.querySelector('.add-ticket-btn');
    this.addTicketForm = document.querySelector('.add-section');

    this.ticketsItems = document.querySelector('.tickets-items');

    console.log(this.ticketsItems);

    // this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.onFormClick = this.onFormClick.bind(this);
    // this.onTicketsItemsClick = this.onTicketsItemsClick.bind(this);

    // this.addButton.addEventListener('click', this.onAddButtonClick);
    this.addTicketForm.addEventListener('click', this.onFormClick);
    // this.ticketsItems.addEventListener('click', this.onTicketsItemsClick);
  }

  onAddButtonClick(e) {
    console.log('click add button');
    console.log(e.currentTarget);
    this.addTicketForm.classList.remove('hidden');
  }

  onFormClick(e) {
    console.log('form clicked');
    this.cancelBtn = document.querySelector('.add-cancel');
    console.log(this.cancelBtn);
    if (e.target === this.cancelBtn) {
      console.log('here');
      this.addTicketForm.querySelector('.name').value = '';
      this.addTicketForm.querySelector('.description').value = '';
      this.addTicketForm.classList.add('hidden');
    };
  }

  onTicketsItemsClick(e) {
    console.log('tickets items click');
    // переключаем галочку статуса (пока без изменения в бэкенде)
    if (e.target.classList.contains('tickets-item-status')) {
      console.log('status');
      if (e.target.textContent !== '') {
        e.target.textContent = '';
      } else {
        e.target.innerHTML = '&#10003;';
      }
    } else if (e.target.classList.contains('tickets-item-change')) {
      console.log('change');
    } else if (e.target.classList.contains('tickets-item-delete')) {
      console.log('delete');
    } else {
      console.log('item body');
      let currentItem = e.target.closest('.tickets-item');
      let currentItemDescription = currentItem.querySelector('.tickets-item-details');
      currentItemDescription.classList.toggle('hidden');
    }
  }
}