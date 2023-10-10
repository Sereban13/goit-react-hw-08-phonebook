import { GlobalStyle } from './GlobalStyle';
import { Section, Title } from './App.Styled';
import { SearchBar } from './Searchbar/Searchbar';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { getError, getIsLoading } from 'redux/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';

export const App = () => {
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
    <Section>
      <Title>Phonebook</Title>
      <ContactForm />
      <Title>Contacts</Title>
      <SearchBar />

      {isLoading && !error && <b>Request in progress...</b>}

      <ContactList />
      <GlobalStyle />
    </Section>
  );
};
