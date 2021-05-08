import { gql, useMutation } from "@apollo/client";
import { Mutations, MutationsCreateOrganisationArgs } from "../../models/type";
import { appStateVar } from '../../apollo/cache';
import { AppState } from "../../models/localType";
import { generateKey } from "../../apollo";

const REGISTER_ORGANISATION = gql`
mutation createOrganisation($name: String!, $timezone: Timezone!) {
  createOrganisation(name: $name, timezone: $timezone) {
    id
    name
    
    createdAt
    updatedAt
    
    boards {
      name
    }
    
  }
}
`;

export function useRegisterOrganisation(){
    const [registerOrganisation, {loading, error, data}] = useMutation<Mutations, MutationsCreateOrganisationArgs>(
        REGISTER_ORGANISATION,
          {
            update( cache, { data }) {
              const appState = {...appStateVar()} as AppState;
                const org = data?.createOrganisation;
                if(org){
                  appState.orgId = org.id;
                  appState.orgName = org.name;
                }
                appStateVar(appState);
                
                // save userId to localstorage
                
                localStorage.setItem(generateKey(appState.email.concat(appState.orgName)), appState.orgId);
            }
        }
      );
    return {
        registerOrganisation, 
        organisationLoading: loading, 
        organisationData: data, 
        organisationError: error
    };
}