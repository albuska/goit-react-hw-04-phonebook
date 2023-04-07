import { Container, Title } from './App.styled';
import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { nanoid } from 'nanoid';

const LS_CONTACT_KEY = 'contacts';

const useSavedLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

const App = () => {
  const [contacts, setContacts] = useSavedLocalStorage(LS_CONTACT_KEY, [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    console.log(data);
    const newContact = {
      ...data,
      id: nanoid(),
    };

    contacts.filter(contact => contact.name === data.name).length
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts(prevState => [newContact, ...prevState]);
  };

  const handleFilterInput = event => {
    setFilter(event.currentTarget.value);
  };

  const onDeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const normalizedFilter = filter.toLowerCase();

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={formSubmitHandler} />
      <div>
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={handleFilterInput} />
        <ContactList
          contacts={filterContacts}
          onDeleteContact={onDeleteContact}
        />
      </div>
    </Container>
  );
};

export default App;
