import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { GlobalStyle } from 'components/GlobalStyle';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getError, getIsLoading } from 'redux/contactsSlice';
import { fetchContacts } from 'redux/operations';

export const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    const fetchPhoneBook = async () => {
      try {
        dispatch(fetchContacts());
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPhoneBook();
  }, [dispatch]);

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm />
      <h2>Contacts</h2>
      <SearchBar />

      {isLoading && !error && <b>Request in progress...</b>}

      <ContactList />
      <GlobalStyle />
    </div>
  );
};
