import { Formik } from 'formik';
import * as Yup from 'yup';
// import { nanoid } from 'nanoid';
import { Input, Forma, Label, ButtonSubmit } from './ContactForm.Styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/contactsSlice';
// import { addContact, getContacts } from 'redux/contactsSlice';

const phoneRegExp =
  /^\+?\d{1,4}?[ .-]?(\(\d{1,3}\))?([ .-]?\d{1,4}){1,4}([ .-]?\d{1,9})?$/;

const schema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').required('Required'),
  phone: Yup.string().matches(phoneRegExp).required('Required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, actions) => {
    // const { name } = values;
    const isExistName = contacts.find(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (isExistName) {
      alert(`Contact "${values.name}" is already exist`);
      actions.resetForm();
      return;
    }
    dispatch(addContact({ ...values }));
    actions.resetForm();
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Forma>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter the name..."
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />

        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter the phone number..."
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />

        <ButtonSubmit type="submit">Add contact</ButtonSubmit>
      </Forma>
    </Formik>
  );
};

// export const ContactForm = () => {
//   const dispatch = useDispatch();

//   const handleSubmit = event => {
//     event.preventDefault();
//     const form = event.target;

//     const name = form.elements.name.value;
//     const number = form.elements.number.value;

//     dispatch(addContact(name, number));
//     form.reset();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="name">Name</label>
//       <input id="name" name="name" placeholder="Enter your name..." />

//       <label htmlFor="number">Name</label>
//       <input id="number" name="number" placeholder="Enter your number..." />

//       <button type="submit">Add task</button>
//     </form>
//   );
// };
