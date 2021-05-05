export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Timezone: any;
};


export type AdminRole = Role & {
  __typename?: 'AdminRole';
  admin: Scalars['Boolean'];
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Board = {
  __typename?: 'Board';
  name: Scalars['String'];
  tickets: Array<Ticket>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type BoardInput = {
  __typename?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


export type Mutations = {
  __typename?: 'Mutations';
  createUser: User;
  deleteBoard: Scalars['Boolean'];
  deleteTicket: Ticket;
  putBoard: Board;
  createOrganisation: Organisation;
  putTicket: Ticket;
  updateOrganisation: Organisation;
};


export type MutationsCreateUserArgs = {
  user: UserInput;
};


export type MutationsDeleteBoardArgs = {
  organisationId: Scalars['ID'];
  boardId: Scalars['ID'];
};


export type MutationsDeleteTicketArgs = {
  organisationId: Scalars['ID'];
  ticketId: Scalars['ID'];
};


export type MutationsPutBoardArgs = {
  organisationId: Scalars['ID'];
  boardId?: Maybe<Scalars['ID']>;
  input: BoardInput;
};


export type MutationsCreateOrganisationArgs = {
  name: Scalars['String'];
  timezone: Scalars['Timezone'];
};


export type MutationsPutTicketArgs = {
  organisationId: Scalars['ID'];
  boardId: Scalars['ID'];
  ticketId?: Maybe<Scalars['ID']>;
  input: TicketInput;
};


export type MutationsUpdateOrganisationArgs = {
  organisationId: Scalars['ID'];
  organisationInput: OrganisationInput;
};

export type Organisation = {
  __typename?: 'Organisation';
  name: Scalars['String'];
  timezone: Scalars['Timezone'];
  boards: Array<Board>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type OrganisationInput = {
  __typename?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['Timezone']>;
};

export type Query = {
  __typename?: 'Query';
  members: Array<UserMembership>;
  board?: Maybe<Board>;
  roles: Array<Role>;
  organisation?: Maybe<Organisation>;
  me: User;
  ticket?: Maybe<Ticket>;
};


export type QueryMembersArgs = {
  organisationId: Scalars['ID'];
};


export type QueryBoardArgs = {
  organisationId: Scalars['ID'];
  boardId: Scalars['ID'];
};


export type QueryRolesArgs = {
  organisationId: Scalars['ID'];
};


export type QueryOrganisationArgs = {
  organisationId: Scalars['ID'];
};


export type QueryTicketArgs = {
  organisationId: Scalars['ID'];
  ticketId: Scalars['ID'];
};

export type Role = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Subscriptions = {
  __typename?: 'Subscriptions';
  ticketUpdates: Ticket;
};


export type SubscriptionsTicketUpdatesArgs = {
  organisationId: Scalars['ID'];
};

export type Ticket = {
  __typename?: 'Ticket';
  name: Scalars['String'];
  visible: Scalars['Boolean'];
  description: Scalars['String'];
  status: TicketStatus;
  board: Board;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type TicketInput = {
  __typename?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  visible?: Maybe<Scalars['Boolean']>;
  status?: Maybe<TicketStatus>;
};

export enum TicketStatus {
  Done = 'DONE',
  Inprogress = 'INPROGRESS',
  Todo = 'TODO'
}


export type User = {
  __typename?: 'User';
  membership: UserMembership;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  cognitoId: Scalars['String'];
  groups: Array<UserGroup>;
  memberships: Array<UserMembership>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum UserGroup {
  Developers = 'DEVELOPERS'
}

export type UserInput = {
  __typename?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UserMembership = {
  __typename?: 'UserMembership';
  id: Scalars['ID'];
  user: User;
  organisation: Organisation;
  role: Role;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserRole = Role & {
  __typename?: 'UserRole';
  admin: Scalars['Boolean'];
  write: Scalars['Boolean'];
  whitelistBoards: Array<Board>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};
