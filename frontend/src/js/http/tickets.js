export default class ManageTicketsFront {
  constructor() {
    this.addButton = document.querySelector('.add-ticket-btn');
    this.addTicketForm = document.querySelector('.add-section');
    this.addForm = document.querySelector('.add-form');

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.onFormClick = this.onFormClick.bind(this);

    this.addButton.addEventListener('click', this.onAddButtonClick);
    this.addTicketForm.addEventListener('click', this.onFormClick);
  }

  onAddButtonClick() {
    this.addTicketForm.classList.remove('hidden');
    this.addForm.action = 'http://localhost:7070/?method=createTicket';
  }

  onFormClick(e) {
    this.cancelBtn = document.querySelector('.add-cancel');
    if (e.target === this.cancelBtn) {
      this.addTicketForm.querySelector('.name').value = '';
      this.addTicketForm.querySelector('.description').value = '';
      this.addTicketForm.classList.add('hidden');
    };
  }
}
