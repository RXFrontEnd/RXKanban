# Board - Ticket

![Sign Up Page](imgs/signup-page.png)

## Technology Stack

[Apollo Client for React](https://www.apollographql.com/docs/react/)

## Run Me
In order to avoid polluting the given service & data, application could <mark>run in different environment</mark>. Run the following command if you didn't install dotenv-cli before.

```
> yarn global add dotenv-cli
```
### Run for Development
All the operation will take effect in [Ryan-Dev](https://14g8921io8.execute-api.us-east-1.amazonaws.com/ryan-dev-ticket) environment

```
> yarn start:dev
```

### Run for Test
All the operation will take effect in [Phocas-Given](https://14g8921io8.execute-api.us-east-1.amazonaws.com/ryan-dev-ticket) environment

```
> yarn start
```

## Notice

* Modify schema of Query Board for easy implementing ticket deletion

```
query board($organisationId: ID!, $boardId: ID!) {
  board(organisationId: $organisationId, boardId: $boardId) {
    id
    ...
    tickets {
      id      // add id here
      name
      ...
    }  
  }
```

* Refresh or GoBack operation will lead to <mark>lose the current staus</mark>, application will go to the Sign-Up page.

