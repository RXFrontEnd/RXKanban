
import { generateKey } from "../apollo";
import { appStateVar } from "../apollo/cache";
import UserForm from "../components/UserForm"
import { AppState } from "../models/locatType";
import { UserInput } from "../models/type";
import { useCreateUser } from "../operations/mutations/createUser";
import { useRegisterOrganisation } from "../operations/mutations/registerOrganisation";

/**
 * UserFrom container component: signup logic provider
 * @returns 
 */
const Container = () => {
    const {createUser, userLoading, userError} = useCreateUser();
    const { registerOrganisation, organisationLoading, organisationError  } = useRegisterOrganisation();
    
    const doSignUp = async (user: UserInput, organisation: string) => {
        let userData = null;
        const id = localStorage.getItem(generateKey(user.email));
        if(id){
            const curState = appStateVar();
            userData = appStateVar({
                ...curState,
                userId: id,
                userName: user.firstName.concat(user.lastName)
            } as AppState);
        }else {
            try{
                const result = await createUser({
                    variables: {
                        user
                    }
                });
                userData = result.data;
            }catch(error){
                console.log(error);
            }
            
        }
        if(userData){
            const curState = appStateVar();
            const oId = localStorage.getItem(generateKey(user.email.concat(organisation)));
            if(oId){
                appStateVar({
                    ...curState,
                    orgId: oId,
                    orgName: organisation
                })
            }else{
                try{
                    await registerOrganisation({
                        variables:{
                            name: organisation,
                            timezone: 'Pacific/Auckland'
                        }
                    });
                }catch(error){
                    console.log(error);
                }
            }
        }
    }

    return <UserForm doSignUp={doSignUp} 
                     loading={userLoading || organisationLoading}
                     error={
                         (userError && userError.message )||
                         (organisationError && organisationError.message)
                     } />
}

export default Container;
