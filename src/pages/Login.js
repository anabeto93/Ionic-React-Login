import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import styles from './Login.module.scss';

import { arrowBack, shapesOutline } from "ionicons/icons";
import CustomField from '../components/CustomField';
import { useLoginFields } from '../data/fields';
import { Action } from '../components/Action';
import { Wave } from '../components/Wave';
import { useEffect, useState } from 'react';
import { validateForm } from '../data/utils';
import { useParams } from 'react-router';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Login = () => {
    
    const params = useParams();
    const history = useHistory();

    const fields = useLoginFields();
    const [ errors, setErrors ] = useState(false);

    const api = axios.create({
        baseURL: `https://rapidbackend.sharedwithexpose.com/api/v1`,
      });

    const login = () => {
        const errors = validateForm(fields);
        setErrors(errors);

        const formData = {};

        if (!errors.length) {
            fields.forEach((field) => {
                formData[field.name] = field.input.state.value;
            })

            api.post('/auth', formData).then((res) => {
                console.log("Auth Response", { response: res.data })
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
                } else {
                    console.log("Error", { message: err.message, status: err.response.status})
                }
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
		<IonPage className={ styles.loginPage }>
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
                            <IonCardTitle>Log in</IonCardTitle>
                            <h5>Welcome back, hope you're doing well</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            { fields.map(field => {

                                return <CustomField key={ field.id } field={ field } errors={ errors } />;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={ login }>Login</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
			</IonContent>

			<IonFooter>
				<IonGrid className="ion-no-margin ion-no-padding">

                    <Action message="Don't have an account?" text="Sign up" link="/signup" />
                    <Wave />
				</IonGrid>
			</IonFooter>
		</IonPage>
	);
};

export default Login;