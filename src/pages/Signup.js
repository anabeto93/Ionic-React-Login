import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import styles from './Signup.module.scss';
import axios from 'axios';

import { arrowBack, shapesOutline } from "ionicons/icons";
import CustomField from '../components/CustomField';
import { useSignupFields } from '../data/fields';
import { Action } from '../components/Action';
import { Wave } from '../components/Wave';
import { useEffect, useState } from 'react';
import { validateForm } from '../data/utils';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";

const Signup = () => {

    const params = useParams();
    const fields = useSignupFields();
    const [ errors, setErrors ] = useState(false);
    const history = useHistory();

    const api = axios.create({
        baseURL: `http://10.0.2.2:8089/api/v1`,
      });

    const createAccount = () => {

        const errors = validateForm(fields);
        setErrors(errors);

        if (!errors.length) {
            const formData = {};

            fields.forEach((field) => {
                formData[field.name] = field.input.state.value;
            })

            // repeat the password for password confirmation
            formData['password_confirmation'] = formData['password'];

            console.log("SignUp Data", { formData });

            // Will make the axios request to the backend from here
            api.post('/register', formData).then((res) => {
                console.log("Auth Response", { response: res.data });
                history.push("/home");
            }).catch((err) => {
                if (err.response && err.response.status && parseInt(err.response.status) === 422) {
                    console.log("Invalid payload", { message: err.message, status: err.response.status, data: err.response.data })
                    const responseErrors = err.response.data.errors;
                    const inputErrors = [];

                    for (let [key, val] of Object.entries(responseErrors)) {
                        const currentField = fields.find((e) => e.name === key);
                        inputErrors.push({
                            id: currentField.id,
                            message: val[0],
                        })
                    }

                    setErrors(inputErrors)
                }
                console.log("Error", { message: err.message })
            })
        }
    }

    useEffect(() => {

        return () => {

            fields.forEach(field => field.input.state.reset(""));
            setErrors(false);
        }
    }, [params]);
	
	return (
		<IonPage className={ styles.signupPage }>
			<IonHeader>
				<IonToolbar>
					
                    <IonButtons slot="start">
                        <IonBackButton icon={ arrowBack } text="" className="custom-back" />
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton className="custom-button">
                            <IonIcon icon={ shapesOutline } />
                        </IonButton>
                    </IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" className={ styles.headingText }>
                            <IonCardTitle>Sign up</IonCardTitle>
                            <h5>Lets get to know each other</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            { fields.map(field => {

                                return <CustomField key={ field.id } field={ field } errors={ errors } />;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={ createAccount }>Create account</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
			</IonContent>

			<IonFooter>
				<IonGrid className="ion-no-margin ion-no-padding">

                    <Action message="Already got an account?" text="Login" link="/login" />
                    <Wave />
				</IonGrid>
			</IonFooter>
		</IonPage>
	);
};

export default Signup;