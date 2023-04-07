import { Container, Title } from './App.styled';
import { Component } from 'react';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { nanoid } from 'nanoid';

const LS_CONTACT_KEY = 'contacts'; 

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(LS_CONTACT_KEY)

    if(savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts)
      this.setState({contacts: parsedContacts})
      return; 
    }
    this.setState({contacts: this.state.contacts})
  }

componentDidUpdate(prevProps, prevState) { 
  console.log(this.state.contacts); 
  if(prevProps.contacts !== this.state.contacts) {
localStorage.setItem(LS_CONTACT_KEY, JSON.stringify(this.state.contacts))
  }
}

  formSubmitHandler = data => {
    console.log(data);
    const newContact = {
      ...data,
      id: nanoid(),
    };

    this.state.contacts.filter(contact => contact.name === data.name).length
      ? alert(`${newContact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  handleFilterInput = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();

    const filterContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <div>
          <h2>Contacts</h2>
          <Filter
            filter={this.state.filter}
            onChange={this.handleFilterInput}
          />
          <ContactList
            contacts={filterContacts}
            onDeleteContact={this.onDeleteContact}
          />
        </div>
      </Container>
    );
  }
}

export default App;
