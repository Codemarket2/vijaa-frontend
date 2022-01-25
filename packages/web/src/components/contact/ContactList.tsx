import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
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
import ContactForm from './ContactForm';

export default function ContactList() {
  const { data, error, loading } = useGetAllContact();
  const { data: createData, loading: createLoading } = useContactForm();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleNewContact = async () => {
    console.log('log');
    setShowForm(!showForm);
  };
  return (
    <>
      <ListHeader2
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
      </ListHeader2>
      {showForm && <ContactForm />}
      <Paper variant="outlined">
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
      </Paper>
    </>
  );
}
