import GET_PHONEBOOK, { ADD_PHONEBOOK, EDIT_PHONEBOOK, DELETE_PHONEBOOK } from '@/gql/query/external';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
  mdiPencil as EditIcon,
  mdiDelete as DeleteIcon,
  mdiPlus as AddIcon,
  mdiRefresh as RefreshIcon,
} from '@mdi/js';

import React, {
  FC, useState, useCallback, useEffect,
} from 'react';
import { IconButton, Popup, LoadingCircle } from '@/ui';
import Button from '@material-ui/core/Button';
import { ADD_NOTIFICATION } from '@/gql/query/notification';
import { NotificationE } from '@/gql/types/dynamicLocal';
import { cloneDeep } from 'lodash';
import useStyles from './styles';
import { FormRow } from './FormRow';

const Home: FC = () => {
  const client = useApolloClient();
  const [addRow, { loading: loadingAdd, error: errorAdd }] = useMutation(ADD_PHONEBOOK);
  const [editRow, { loading: loadingEdit, error: errorEdit }] = useMutation(EDIT_PHONEBOOK);
  const [deleteRow, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_PHONEBOOK);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRow, setIsOpenRow] = useState(false);

  const [currentId, setCurrentId] = useState<string | null>(null);
  const [currentRow, setCurrentRow] = useState<any | null>(null);

  const [addNotification] = useMutation(ADD_NOTIFICATION);
  const memoError = useCallback(setErrorByValue, []);

  const classes = useStyles();
  const {
    data, refetch, loading: loadingGet, error: errorGet,
  } = useQuery(GET_PHONEBOOK, { notifyOnNetworkStatusChange: true });
  const rows = data?.phonebook || [];
  const loading = loadingAdd || loadingEdit || loadingDelete || loadingGet;
  const error = errorAdd || errorEdit || errorDelete || errorGet;

  useEffect(() => {
    memoError(error?.message);
  }, [error, memoError]);

  return (
    <TableContainer component={Paper}>
      {!!loading && (
        <div className={classes.loading}>
          <LoadingCircle isLoading size={64} />
        </div>
      )}

      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">
              <div>
                <IconButton
                  path={AddIcon}
                  title="Add row"
                  onClick={handleAdd(null)}
                />
                <IconButton
                  path={RefreshIcon}
                  title="Refresh records"
                  onClick={handleRefetch}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell align="left">{row.lastName}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <div>
                  <IconButton
                    path={EditIcon}
                    title="Edit row"
                    onClick={handleEdit(row)}
                  />
                  <IconButton
                    path={DeleteIcon}
                    title="Delete row"
                    onClick={handlePopupOpen(row.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Popup
        isOpen={isOpen}
        title="Confirmation"
        onClose={handlePopupClose}
        actionsComponent={(
          <>
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={handlePopupClose}>No</Button>
          </>
      )}
      >
        <p>Are you sure you want to delete the entry?</p>
      </Popup>
      <Popup
        isOpen={isOpenRow}
        title={currentRow ? 'Edit record' : 'Add record'}
        onClose={handlePopupRowClose}
      >
        <FormRow row={currentRow} onSubmit={handleSubmit as any} />
      </Popup>
    </TableContainer>
  );

  function handleRefetch() {
    refetch();
  }

  async function handleSubmit(values: any) {
    if (currentRow) {
      const result = await editRow({ variables: { doc: values } });

      if (result?.data?.editPhonebook?.success) {
        addNotification({
          variables: {
            message: result.data.editPhonebook.message,
            status: true,
            type: NotificationE.Success,
          },
        });
      }
    } else {
      const result = await addRow({ variables: { doc: values } });

      if (result?.data?.addPhonebook?.success) {
        addNotification({
          variables: {
            message: result.data.addPhonebook.message,
            status: true,
            type: NotificationE.Success,
          },
        });
      }
    }
    setIsOpenRow(false);
    setCurrentRow(null);
    refetch();
  }

  function setErrorByValue(message?: string) {
    if (message) {
      addNotification({
        variables: {
          message,
          status: true,
          type: NotificationE.Error,
        },
      });
    }
  }

  function handleEdit(row: any) {
    return () => {
      setCurrentRow(row);
      setIsOpenRow(true);
    };
  }

  function handleAdd(row: any) {
    return () => {
      setCurrentRow(null);
      setIsOpenRow(true);
    };
  }

  async function handleDelete() {
    const result = await deleteRow({ variables: { id: currentId } });

    if (result?.data?.deletePhonebook?.success) {
      refetch();
      addNotification({
        variables: {
          message: result.data.deletePhonebook.message,
          status: true,
          type: NotificationE.Success,
        },
      });
    }
    setIsOpen(false);
    setCurrentId(null);
  }

  function handlePopupOpen(id: string) {
    return () => {
      setIsOpen(true);
      setCurrentId(id);
    };
  }

  function handlePopupClose() {
    setIsOpen(false);
  }

  function handlePopupRowClose() {
    setIsOpenRow(false);
  }
};

export default Home;
