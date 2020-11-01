import React, { FC } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';

import { useQuery, useMutation } from '@apollo/client';
import { Notification } from '@/ui';
import { INotification, Maybe, NotificationE } from '@/gql/types/dynamicLocal';
import { EDIT_NOTIFICATION, DELETE_NOTIFICATION, GET_NOTIFICATIONS } from '@/gql/query/notification';
import Container from '@material-ui/core/Container';
import useStyles from './styles';

const Layout: FC = ({ children }) => {
  // useStyles
  const classes = useStyles();
  const { data: cacheData } = useQuery(GET_NOTIFICATIONS);
  const [editNotification] = useMutation(EDIT_NOTIFICATION);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">PHONEBOOK</Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="md">
          <div>
            {children}
          </div>
        </Container>
      </main>
      <footer>
        {
          cacheData?.getNotifications?.map((notification: Maybe<INotification>) => (
            <Notification
              key={notification?.id}
              isOpen={notification?.status}
              onClose={handleCloseNotification(notification?.id)}
              message={notification?.message}
              type={notification?.type}
              delay={notification?.type === NotificationE.Error ? 5000 : 3000}
            />
          ))
        }
      </footer>
    </div>
  );

  function handleCloseNotification(id: string | undefined) {
    return async () => {
      await editNotification({ variables: { id, status: false } });

      setTimeout(() => {
        deleteNotification({ variables: { id } });
      }, 1000);
    };
  }
};

export default Layout;
