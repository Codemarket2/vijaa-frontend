import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Tab, Divider, Paper } from '@material-ui/core';

import BookmarkList from '../bookmark/BookmarkList';
import FBSettings from '../facebook/FBSettings';
import MyPostsList from '../post/MyPostsList';
import ProfileCard from './ProfileCard';
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
