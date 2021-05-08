import { gql, useMutation } from "@apollo/client";
import { Mutations, MutationsCreateUserArgs } from '../../models/type';
import { appStateVar } from '../../apollo/cache';
import { AppState } from "../../models/localType";
import { generateKey } from "../../apollo";

const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      id
      email
      firstName
      lastName
          
      createdAt
      updatedAt
      
      memberships {
        role {
          id
          __typename
        }
        
        organisation {
          name
        }
      }  
    }
  }
`;

export function useCreateUser(){
    const [createUser, {loading, error, data}] = useMutation<Mutations, MutationsCreateUserArgs>(
      CREATE_USER,
        {
            update( cache, { data }) {
                
                const user = data?.createUser;
                if(user){
                  const appState = {...appStateVar()} as AppState;
                  appState.userId = user.id;
                  appState.userName = user.firstName.concat(user.lastName);
                  appState.email = user.email;
                  // save userId to localstorage
                  
                  localStorage.setItem(generateKey(user.email), appState.userId);
                  appStateVar(appState);
                }
                

                
            }
        }
        );
        return {createUser, userLoading: loading, userData: data, userError: error};
}
