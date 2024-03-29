
import React from 'react';
import { Link } from 'react-router-dom';
import { IonPage, IonContent, IonSelect, IonSelectOption } from '@ionic/react';
import axios from 'axios';

import { RouterProps } from '../types';
import { WEBAPI } from '../variables';
import './Registration.css';

interface RegistrationPageState {
  message: string;
  registering: boolean;
  openDarkModal: boolean;
  darkModalMessage: string;
}

class RegistrationPage extends React.Component<RouterProps, RegistrationPageState> {
  constructor (props: RouterProps) {
    super(props);

    this.state = {
      message: '',
      registering: false,
      openDarkModal: false,
      darkModalMessage: ''
    };

    this.register = this.register.bind(this);
    this.modal = this.modal.bind(this);
  }

  modal (message: string, callbackFn: Function = () => {}, show: boolean = true) {
    return (event?: React.MouseEvent) => {
      this.setState({
        darkModalMessage: message,
        openDarkModal: show
      });

      if (show) {
        setTimeout(() => {
          this.setState({ openDarkModal: false });
          callbackFn();
        }, 5000);
      } else {
        callbackFn();
      }
    }
  }

  async register (event: React.FormEvent) {
    event.preventDefault();
    this.setState({
      message: '',
      registering: true
    });

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    try {
      const response = await axios.post(target.action, formData)
      if (response.data.success) {
        target.reset();
        this.modal('Successfully registered', () => {
          this.props.history.push('/');
        }, true)();
      } else {
        this.setState({ message: response.data.message });
      }
    } catch (error: any) {
      this.setState({ message: 'Unable to register' });
    }

    this.setState({ registering: false });
  }

  render () {
    return (
      <IonPage>
        <IonContent fullscreen style={{ '--background': 'var(--ion-color-primary)' }}>
          <form action={ WEBAPI + '/register.php' } method="post" className="form-register" onSubmit={this.register}>
            <div className="card">
              <h6 className="register-title mb-2">Sign-up</h6>
              <p className="text-md text-bold mb-1">Personal Information</p>

              <div className="form-group mb-1">
                <input type="text" name="name" placeholder="Full Name" className="form-control form-control-shadow" required />
              </div>

              <div className="form-group mb-1">
                <IonSelect name="gender" placeholder="Select gender" interface="popover" className="form-control form-control-shadow">
                  <IonSelectOption>Male</IonSelectOption>
                  <IonSelectOption>Female</IonSelectOption>
                </IonSelect>
              </div>

              <div className="form-group mb-1">
                <input type="date" name="birthday" placeholder="Birthday (YYYY-MM-DD)" className="form-control form-control-shadow" required />
              </div>

              <div className="form-group mb-1">
                <input type="text" name="username" placeholder="Username" className="form-control form-control-shadow" required />
              </div>

              <div className="form-group mb-1">
                <input type="password" name="password" placeholder="Password" className="form-control form-control-shadow" required />
              </div>

              <div className="form-group mb-1">
                <input type="email" name="email" placeholder="Email" className="form-control form-control-shadow" required />
              </div>

              <div className="form-group mb-2">
                <input type="text" name="mobile" placeholder="09123456789" className="form-control form-control-shadow" required />
              </div>

              <p className="text-md text-bold mb-1">Address</p>
              <div className="form-group mb-2">
                <IonSelect name="address-brgy" placeholder="Select barangay" interface="popover" className="form-control form-control-shadow">
                  <IonSelectOption>Abuanan</IonSelectOption>
                  <IonSelectOption>Alianza</IonSelectOption>
                  <IonSelectOption>Atipuluan</IonSelectOption>
                  <IonSelectOption>Bacong-Montilla</IonSelectOption>
                  <IonSelectOption>Bagroy</IonSelectOption>
                  <IonSelectOption>Balingasag</IonSelectOption>
                  <IonSelectOption>Binubuhan</IonSelectOption>
                  <IonSelectOption>Busay</IonSelectOption>
                  <IonSelectOption>Calumangan</IonSelectOption>
                  <IonSelectOption>Caridad</IonSelectOption>
                  <IonSelectOption>Don Jorge L. Araneta</IonSelectOption>
                  <IonSelectOption>Dulao</IonSelectOption>
                  <IonSelectOption>Ilijan</IonSelectOption>
                  <IonSelectOption>Lag-Asan</IonSelectOption>
                  <IonSelectOption>Ma-ao</IonSelectOption>
                  <IonSelectOption>Mailum</IonSelectOption>
                  <IonSelectOption>Malingin</IonSelectOption>
                  <IonSelectOption>Napoles</IonSelectOption>
                  <IonSelectOption>Pacol</IonSelectOption>
                  <IonSelectOption>Poblacion</IonSelectOption>
                  <IonSelectOption>Sagasa</IonSelectOption>
                  <IonSelectOption>Tabunan</IonSelectOption>
                  <IonSelectOption>Taloc</IonSelectOption>
                  <IonSelectOption>Sampinit</IonSelectOption>
                </IonSelect>
              </div>

              <div className="form-group mb-1">
                <input type="text" name="address-purok" placeholder="Purok" className="form-control form-control-shadow" required />
              </div>

              <div className="form-group mb-1">
                <input type="text" name="address-street" placeholder="Street" className="form-control form-control-shadow" required />
              </div>

              <p className="text-md text-bold mb-1">Valid ID (for verification):</p>
              <div className="form-group mb-1">
                <input type="file" name="valid-id" className="form-control form-control-shadow" required />
              </div>

              {
                this.state.message &&
                <p className="text-center text-sm text-danger">{ this.state.message }</p>
              }

              <button type="submit" className="mt-2 btn btn-block btn-primary" disabled={this.state.registering}>
                { this.state.registering ? 'REGISTERING...' : 'REGISTER' }
              </button>
              <div className="mt-1 text-sm text-center">Already have an account? <Link to="/">Sign in here</Link></div>
            </div>
          </form>

          {
            this.state.openDarkModal && <React.Fragment>
              <div className="dark-modal-backdrop" onClick={this.modal('', () => {}, false)}></div>
              <div className="dark-modal-wrapper" onClick={this.modal('', () => {}, false)}>
                <div className="dark-modal d-flex flex-column align-items-center text-center">
                  { this.state.darkModalMessage }
                </div>
              </div>
            </React.Fragment>
          }
        </IonContent>
      </IonPage>
    );
  }
}

export default RegistrationPage;
