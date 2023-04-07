import { ContactItem } from '../ContactItem/ContactItem';
import { List, Button, Item } from './ContactList.styled';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <>
      <List>
        {contacts.map(contact => (
          <Item key={contact.id}>
            <ContactItem contact={contact} />
            <Button onClick={() => onDeleteContact(contact.id)}>Delete</Button>
          </Item>
        ))}
      </List>
    </>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
