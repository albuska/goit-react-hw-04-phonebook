import PropTypes from 'prop-types';
import { Input } from './Filter.styled';

const Filter = ({ filter, onChange }) => {
  return (
    <>
      <label>
        Find contacts by name
        <Input
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          name="filter"
          value={filter}
          onChange={onChange}
        />
      </label>
    </>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
