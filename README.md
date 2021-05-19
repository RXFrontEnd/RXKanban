# Board - Ticket

![Sign Up Page](imgs/signup-page.png)
![Board Page](imgs/board-page.png)
![Ticket Page](imgs/ticket-page.png)


## Technology Stack

[Apollo Client for React](https://www.apollographql.com/docs/react/)

## Run Me
In order to avoid polluting the given service & data, application could <mark>***run in different environment***</mark>. Run the following command if you didn't install dotenv-cli before.

```
> yarn global add dotenv-cli
```
### Run for Development
All the operation will take effect in [Ryan-Dev](https://14g8921io8.execute-api.us-east-1.amazonaws.com/ryan-dev-ticket) environment

```
> yarn start:dev
```

## Notice
* No responsive design, use <mark>***full screen in Chrome***</mark> for better UI presentation.
* <mark>***No Unit Test***</mark> for this project, but most of the components are testable.


## Conventions
* Board Update & Deletion are not supported currently.
* You can only create <mark>***todo-status tikets***</mark> by the understanding of each ticket should start its lifecycle at todo status.

