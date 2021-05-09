import { gql, useMutation } from "@apollo/client";
import { Mutations, MutationsCreateOrganisationArgs } from "../../models/type";
import { appStateVar } from '../../apollo/cache';
import { AppStateInput } from "../../models/localType";
import { updateAppState } from "../../utils/appStateStore";
import { generateKey } from "../../utils/constant";

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
              const appState = {...appStateVar()} as AppStateInput;
                const org = data?.createOrganisation;
                if(org){
                  appState.orgId = org.id;
                  appState.orgName = org.name;
                }
                // appStateVar(appState);
                updateAppState(appState);
                
                // save userId to localstorage
                appState.email 
                && appState.orgName 
                && appState.orgId 
                && localStorage.setItem(generateKey(appState.email.concat(appState.orgName)), appState.orgId);
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