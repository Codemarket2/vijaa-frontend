import { useState } from 'react';
import { useSelector } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ProfileCard from './ProfileCard';
import MyPostsList from '../post/MyPostsList';
import BookmarkList from '../bookmark/BookmarkList';
import FBSettings from '../facebook/FBSettings';
import CreateUserProfile from './CreateUserProfile';
import UserProfile2 from './UserProfile2';

export default function ProfileScreen() {
  const [value, setValue] = useState('posts');
  const attributes = useSelector(({ auth }: any) => auth.attributes);
  return (
    <div>
      <Paper variant="outlined">
        <ProfileCard user={attributes} />
        <Divider />
        <Tabs
          value={value}
          onChange={(event: React.ChangeEvent<{}>, newValue: string) => setValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant="scrollable"
          scrollButtons="on">
          <Tab label="Posts" value="posts" />
          <Tab label="About" value="about" />
          <Tab label="Saved Tags" value="bookmarks" />
          <Tab label="Facebook Setting" value="facebookPostSetting" />
          <Tab label="View User Profile" value="userProfile2" />
        </Tabs>
      </Paper>
      {value === 'posts' && <MyPostsList />}
      {value === 'bookmarks' && <BookmarkList />}
      {value === 'facebookPostSetting' && <FBSettings showUser={true} />}
      {value === 'userProfile2' && <UserProfile2 />}
    </div>
  );
}
