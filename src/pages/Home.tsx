import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import "./Home.css";
import { useEffect, useState } from "react";
import { camera } from "ionicons/icons";
import { LocalNotifications } from "@capacitor/local-notifications";

const Home: React.FC = () => {
    const [photo, setPhoto] = useState<string | undefined>(undefined);
    useEffect(() => {
        // Solicitar permiso para notificaciones al cargar el componente
        LocalNotifications.requestPermissions();
    }, []);

    const takePicture = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Camera,
            });

            setPhoto(image.dataUrl);

			sendNotification()
        } catch (error) {
            console.error("Error al tomar la foto:", error);
        }
    };

    const sendNotification = async () => {
        try {
            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: "Foto Capturada desde Camara magica",
                        body: "Has tomado una nueva foto con éxito",
                        id: 1,
                        schedule: { at: new Date(Date.now() + 1000) },
                        actionTypeId: "",
                    },
                ],
            });
        } catch (error) {
            console.error("Error al enviar la notificación:", error);
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <div className="photo-container">
                    {photo ? (
                        <img
                            src={photo}
                            width={200}
                            alt="Foto capturada"
                            className="photo"
                        />
                    ) : (
                        <div className="default-photo">
                            <img
                                src="/assets/default-photo.webp"
                                alt="Foto por defecto"
                                width={200}
                                className="photo"
                            />
                            <p>Aquí aparecerá tu foto</p>
                        </div>
                    )}
                </div>
                <div className="button-container">
                    <button onClick={takePicture} className="custom-button">
                        <IonIcon icon={camera} />
                    </button>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
