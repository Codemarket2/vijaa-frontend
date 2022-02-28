import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';

import { getCreatedAtDate } from '@frontend/shared/utils/date';
import { useGetAllContact, useContactForm } from '@frontend/shared/hooks/contact';
import Backdrop from '../common/Backdrop';
import ListHeader2 from '../common/ListHeader2';
import { onAlert } from '../../utils/alert';
import ErrorLoading from '../common/ErrorLoading';
import { FormView } from '../form2/FormView';

export default function ContactList() {
  // const { data, error, loading } = useGetAllContact();
  // const { data: createData, loading: createLoading, showForm, setShowForm } = useContactForm();
  // const [showBackdrop, setShowBackdrop] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const formFields = [
    {
      __typename: 'Field2',
      _id: '61f3adf33c68826a77f856ac',
      label: 'First Name',
      fieldType: 'text',
      options: { multipleValues: false, required: true, formField: '', grid: { sm: '6' } },
      typeId: null,
      form: null,
    },
    {
      __typename: 'Field2',
      _id: '61f3ae3a0885a8371c23be83',
      label: 'Last Name',
      fieldType: 'text',
      options: { multipleValues: false, required: true, formField: '', grid: { sm: '6' } },
      typeId: null,
      form: null,
    },
    {
      __typename: 'Field2',
      _id: '61f3ae925c3112e9f374d9ee',
      label: 'Title',
      fieldType: 'text',
      options: { multipleValues: false, required: false, formField: '', grid: { sm: '6' } },
      typeId: null,
      form: null,
    },
    {
      __typename: 'Field2',
      _id: '61f3aedef6eaf1b4f10c5800',
      label: 'Business Name',
      fieldType: 'text',
      options: { multipleValues: false, required: false, formField: '', grid: { sm: '6' } },
      typeId: null,
      form: null,
    },
    {
      __typename: 'Field2',
      _id: '61f3af09de0f394fc146c892',
      label: 'Email',
      fieldType: 'email',
      options: { multipleValues: false, required: true, formField: '', grid: { sm: '6' } },
      typeId: null,
      form: null,
    },
    {
      __typename: 'Field2',
      _id: '61f3af29fc92511311078146',
      label: 'Phone',
      fieldType: 'number',
      options: { multipleValues: false, required: false, formField: '', grid: { sm: '6' } },
      typeId: null,
      form: null,
    },
    {
      __typename: 'Field2',
      _id: '61f3afc4027e11c57763de12',
      label: 'Field Name',
      fieldType: 'text',
      options: { multipleValues: true, required: false, formField: '', grid: { sm: '6' } },
      typeId: null,
      form: null,
    },
    {
      __typename: 'Field2',
      _id: '61f3afdb1e1fcaa4360006ae',
      label: 'Field Value',
      fieldType: 'text',
      options: { multipleValues: true, required: false, formField: '', grid: { sm: '6' } },
      typeId: null,
      form: null,
    },
  ];
  const handleNewContact = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      {/* <ListHeader2
        search={''}
        onSearchChange={(newSearch) => {
          console.log('first');
        }}
        searchLoading={loading}
        handleAddNew={handleNewContact}
        addNewLoading={createLoading}
      >
        <Typography color="textPrimary">Contact</Typography>
        <Backdrop open={createLoading || showBackdrop} />
      </ListHeader2> */}
      {showForm && (
        <FormView
          fields={formFields}
          handleSubmit={() => {
            console.log('test');
          }}
        />
      )}
      {/* <Paper variant="outlined">
        {error || !data || !data.getAllContacts ? (
          <ErrorLoading error={error} />
        ) : (
          <List dense>
            {data.getAllContacts.data.map((contact, i) => (
              <Fragment key={contact._id}>
                {i > 0 && <Divider />}
                <Link href={`/contact/${contact._id}`}>
                  <ListItem button style={{ height: 50 }}>
                    <ListItemText
                      primary={`${contact.firstName ? contact.firstName : 'FirstName'} ${
                        contact.lastName ? contact.lastName : 'LastName'
                      }`}
                      //   secondary={`${contact.createdBy?.name} ${getCreatedAtDate(contact.createdAt)}`}
                    />
                  </ListItem>
                </Link>
              </Fragment>
            ))}
          </List>
        )}
      </Paper> */}
    </>
  );
}