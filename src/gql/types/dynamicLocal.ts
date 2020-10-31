export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export interface IAuth {
  __typename?: 'Auth';
  email: Scalars['String'];
  groups: Array<Maybe<Scalars['String']>>;
}

export interface IAuthMutationResponse {
  __typename?: 'AuthMutationResponse';
  code: Scalars['Int'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
}

export interface IMutation {
  __typename?: 'Mutation';
  addAuth?: Maybe<IAuthMutationResponse>;
  addNotification: INotifyMutationResponse;
  deleteNotification: INotifyMutationResponse;
  editNotification: INotifyMutationResponse;
}


export type IMutationAddAuthArgs = {
  email: Scalars['String'];
  groups: Array<Maybe<Scalars['String']>>;
};


export type IMutationAddNotificationArgs = {
  message: Scalars['String'];
  type: NotificationE;
  status: Scalars['Boolean'];
};


export type IMutationDeleteNotificationArgs = {
  id: Scalars['ID'];
};


export type IMutationEditNotificationArgs = {
  id: Scalars['ID'];
  status: Scalars['Boolean'];
};

export interface INotification {
  __typename?: 'Notification';
  id: Scalars['ID'];
  message: Scalars['String'];
  status: Scalars['Boolean'];
  type: NotificationE;
}

export enum NotificationE {
  Error = 'error',
  Success = 'success'
}

export interface INotifyMutationResponse {
  __typename?: 'NotifyMutationResponse';
  code: Scalars['Int'];
  id?: Maybe<Scalars['ID']>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
}

export interface IQuery {
  __typename?: 'Query';
  getAuth: IAuth;
  getNotifications: Array<Maybe<INotification>>;
}

