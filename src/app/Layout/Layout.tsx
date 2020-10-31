import React, { FC, useState } from 'react';
import {
  useHistory, useLocation,
} from 'react-router-dom';
import {
  mdiViewDashboard as DashboardIcon,
} from '@mdi/js';
import IconButtonUI from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import { useQuery, useMutation } from '@apollo/client';
import { Icon, Notification } from '@/ui';
import { INotification, Maybe, NotificationE } from '@/gql/types/dynamicLocal';
import { EDIT_NOTIFICATION, DELETE_NOTIFICATION, GET_NOTIFICATIONS } from '@/gql/query/notification';
import useStyles from './styles';

const Layout: FC = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // useStyles
  const classes = useStyles({ open });
  const path = pathname.split('/')[1];
  const { data: cacheData } = useQuery(GET_NOTIFICATIONS);
  const [editNotification] = useMutation(EDIT_NOTIFICATION);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION);

  return (
    <>
      {path !== 'sign-in' ? (
        <>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
              [classes.scrollBar]: true,
            })}
            classes={{
              paper: clsx(classes.drawerPaper, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <List>
              <ListItem button onClick={handleRoute('/')} alignItems="center" className={classes.titleWrap}>
                <Typography variant="h6" className={classes.title}>
                  EON
                </Typography>
              </ListItem>
            </List>
            <div className={classes.toolbar}>
              <IconButtonUI
                onClick={handleDrawer}
                color="inherit"
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButtonUI>
            </div>
            <List>
              <ListItem button disabled classes={{ disabled: classes.disabled }} className={clsx({ [classes.columnWrap]: !open, [classes.notActiveWrap]: path !== 'dashboard' })} onClick={handleRoute('/dashboard')}>
                <ListItemIcon className={clsx(classes.columnIcon, { [classes.columnIconFull]: open })}>
                  <Icon
                    path={DashboardIcon}
                    className={clsx({ [classes.activeIcon]: path === '/' })}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Home"
                  className={clsx({ [classes.columnText]: !open, [classes.activeText]: path === 'home' })}
                />
              </ListItem>

            </List>
          </Drawer>
          <main className={clsx({
            [classes.main]: !open,
            [classes.mainOpen]: open,
            [classes.scrollBar]: true,
          })}
          >
            {children}
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
        </>
      ) : (
        <main className={classes.mainAuth}>{ children }</main>
      )}
    </>
  );

  function handleCloseNotification(id: string | undefined) {
    return async () => {
      await editNotification({ variables: { id, status: false } });

      setTimeout(() => {
        deleteNotification({ variables: { id } });
      }, 1000);
    };
  }

  function handleDrawer() {
    setOpen(!open);
  }

  function handleRoute(route: string) {
    return () => {
      history.push(route);
    };
  }
};

export default Layout;
