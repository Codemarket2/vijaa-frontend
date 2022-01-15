import UserLayout from '../../src/components/common/UserLayout';
import EmailForm from '../../src/components/email/EmailForm';

export default function Form(): any {
  return (
    <UserLayout authRequired>
      <EmailForm />
    </UserLayout>
  );
}
