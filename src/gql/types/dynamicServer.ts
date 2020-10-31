export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export interface ICountriesRequest {
  __typename?: 'CountriesRequest';
  nodes?: Maybe<Array<Maybe<ICountry>>>;
  meta?: Maybe<IMeta>;
}

export interface ICountry {
  __typename?: 'Country';
  id?: Maybe<Scalars['Int']>;
  shortName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
}

export interface ILogin {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  me?: Maybe<Scalars['Boolean']>;
}

export interface ILoginMutationResponse  extends IMutationResponse {
  __typename?: 'LoginMutationResponse';
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  user?: Maybe<IUser>;
}

export interface IMeta {
  __typename?: 'Meta';
  totalCount?: Maybe<Scalars['Int']>;
}

export interface IMutation {
  __typename?: 'Mutation';
  loginAuth?: Maybe<ILoginMutationResponse>;
}


export type IMutationLoginAuthArgs = {
  login?: Maybe<ILogin>;
};

export type IMutationResponse = {
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export interface IQuery {
  __typename?: 'Query';
  countries?: Maybe<ICountriesRequest>;
}


export interface IUser {
  __typename?: 'User';
  email: Scalars['String'];
}

