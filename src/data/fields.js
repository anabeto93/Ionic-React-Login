import { useFormInput } from "./utils";

export const useSignupFields = () => {

    return [
        {
            id: "name",
            label: "Name",
            name: "name",
            required: true,
            input: {
                
                props: {
                    
                    type: "text",
                    placeholder: "Richard Doe"
                },
                state: useFormInput("")
            }
        },
        {
            id: "email",
            label: "Email",
            name: "email",
            required: true,
            input: {
                
                props: {
                    
                    type: "email",
                    placeholder: "joe@rapidwristbands.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Password",
            name: "password",
            required: true,
            input: {
                
                props: {
                    
                    type: "password",
                    placeholder: "*********"
                },
                state: useFormInput("")
            }
        }
    ];
}

export const useLoginFields = () => {

    return [

        {
            id: "email",
            label: "Email",
            name: "email",
            required: true,
            input: {
                
                props: {
                    type: "email",
                    placeholder: "joe@rapidwristbands.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Password",
            name: "password",
            required: true,
            input: {
                
                props: {
                    type: "password",
                    placeholder: "*******"
                },
                state: useFormInput("")
            }
        }
    ];
}