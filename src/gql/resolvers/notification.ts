import { nanoid } from 'nanoid';

import {
  IMutationAddNotificationArgs,
  IQuery,
  IMutationEditNotificationArgs,
  IMutationDeleteNotificationArgs,
  INotifyMutationResponse,
  INotification,
} from '../types/dynamicLocal';
import { GET_NOTIFICATIONS } from '../query/notification';
import { responseResolverSuccess, responseResolverFail } from './utils';
import { IResolverContext } from './types';

export const addNotification = (
  _root: object, variables: IMutationAddNotificationArgs, { cache }: IResolverContext,
) => {
  const cacheData = cache.readQuery<IQuery>({ query: GET_NOTIFICATIONS });
  const id = nanoid();

  if (cacheData?.getNotifications) {
    cache.writeQuery({
      query: GET_NOTIFICATIONS,
      data: {
        getNotifications: [
          ...cacheData.getNotifications,
          { ...variables, id, __typename: 'Notification' },
        ],
      },
    });
    return responseResolverSuccess('Notification added successfully!', { id });
  }
  return responseResolverFail('Error: Notification error!', { id });
};

export const editNotification = (
  _root: object, { id, status }: IMutationEditNotificationArgs, { cache }: IResolverContext,
): INotifyMutationResponse => {
  const cacheData = cache.readQuery<IQuery>({ query: GET_NOTIFICATIONS });

  if (cacheData?.getNotifications) {
    const getNotifications = cacheData.getNotifications.map((notify) => {
      const newNotify = { ...notify } as INotification;

      if (notify?.id === id) {
        newNotify.status = status;
      }

      return newNotify;
    });
    cache.writeQuery({ query: GET_NOTIFICATIONS, data: { getNotifications } });
    return responseResolverSuccess('Notification changed successfully!', { id });
  }
  return responseResolverFail('Error: Notification error!', { id });
};

export const deleteNotification = (
  _root: object, { id }: IMutationDeleteNotificationArgs, { cache }: IResolverContext,
): INotifyMutationResponse => {
  const cacheData = cache.readQuery<IQuery>({ query: GET_NOTIFICATIONS });

  if (cacheData?.getNotifications) {
    const getNotifications = cacheData.getNotifications.filter((notify) => notify?.id !== id);
    cache.writeQuery({ query: GET_NOTIFICATIONS, data: { getNotifications } });
    return responseResolverSuccess('Notification deleted successfully!', { id });
  }
  return responseResolverFail('Error: Notification error!', { id });
};
