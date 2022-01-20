import React from 'react';
import UserLayout from '../components/common/UserLayout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ContactForm from '../components/contact/ContactForm';

export default function ContactScreen() {
  return (
    <UserLayout authRequired>
      <ContactForm />
    </UserLayout>
  );
}
