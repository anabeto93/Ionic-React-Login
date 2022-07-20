import { IonButton, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonImg, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import { IonItem, IonList, IonSelect, IonSelectOption, IonRange } from '@ionic/react';
import { Action } from '../components/Action';
import styles from './Home.module.scss';

const Home = () => {
	const slideOpts = {
		initialSlide: 1,
		speed: 400
	};

	return (
		<IonPage className={ styles.homePage }>
			<IonHeader>
				{/* <IonToolbar className="ion-no-margin ion-no-padding"> */}
					<IonImg src="/assets/login2.jpeg" />
				{/* </IonToolbar> */}
			</IonHeader>
			<IonContent fullscreen>

				{/* <div className={ styles.getStarted }>
					<IonGrid>
						<IonRow className={ `ion-text-center ion-justify-content-center ${ styles.heading }` }>
							<IonCol size="11" className={ styles.headingText }>
								<IonCardTitle>Join millions of other people discovering their creative side</IonCardTitle>
							</IonCol>
						</IonRow>

						<IonRow className={ `ion-text-center ion-justify-content-center` }>
							<IonRouterLink routerLink="/signup" className="custom-link">
								<IonCol size="11">
									<IonButton className={ `${ styles.getStartedButton } custom-button` }>Get started &rarr;</IonButton>
								</IonCol>
							</IonRouterLink>
						</IonRow>
					</IonGrid>
				</div> */}
				<div className={ styles.getStarted }>
				<IonList>
					<IonItem>
						<IonSelect placeholder="Select Color">
						<IonSelectOption value="apples">Red</IonSelectOption>
						<IonSelectOption value="oranges">Yellow</IonSelectOption>
						<IonSelectOption value="bananas">Green</IonSelectOption>
						</IonSelect>
					</IonItem>
				</IonList>
				<IonRange pin={true} pinFormatter={(value: number) => `${value}%`}></IonRange>
				</div>
			</IonContent>

			<IonFooter>
				<IonGrid>
					<Action message="Already got an account?" text="Login" link="/login" />
				</IonGrid>
			</IonFooter>
		</IonPage>
	);
};

export default Home;