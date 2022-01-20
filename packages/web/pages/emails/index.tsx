import UserLayout from '../../src/components/common/UserLayout';
import EmailList from '../../src/components/email/EmailList';

export default function Form(): any {
  return (
    <UserLayout authRequired>
      <EmailList />
    </UserLayout>
  );
}
