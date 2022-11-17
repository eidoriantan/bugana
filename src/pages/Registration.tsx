
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
}

class RegistrationPage extends React.Component<RouterProps, RegistrationPageState> {
  constructor (props: RouterProps) {
    super(props);

    this.state = {
      message: '',
      registering: false
    };

    this.register = this.register.bind(this);
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
        this.props.history.push('/');
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
        <IonContent fullscreen style={{ '--background': '#36454f' }}>
          <form action={ WEBAPI + '/register.php' } method="post" className="form-register" onSubmit={this.register}>
            <div className="card">
              <h6 className="register-title mb-2">Sign-up</h6>
              <p className="text-md text-bold mb-1">Personal Information</p>

              <div className="form-group mb-1">
                <input type="text" name="name" placeholder="Full Name" className="form-control" required />
              </div>

              <div className="form-group mb-1">
                <IonSelect name="gender" placeholder="Select gender" interface="popover" className="form-control">
                  <IonSelectOption value="male">Male</IonSelectOption>
                  <IonSelectOption value="female">Female</IonSelectOption>
                  <IonSelectOption value="others">Others</IonSelectOption>
                </IonSelect>
              </div>

              <div className="form-group mb-1">
                <input type="text" name="birthday" placeholder="Birthday (YYYY-MM-DD)" className="form-control" required />
              </div>

              <div className="form-group mb-1">
                <input type="text" name="username" placeholder="Username" className="form-control" required />
              </div>

              <div className="form-group mb-1">
                <input type="password" name="password" placeholder="Password" className="form-control" required />
              </div>

              <div className="form-group mb-1">
                <input type="email" name="email" placeholder="Email" className="form-control" required />
              </div>

              <div className="form-group mb-2">
                <input type="text" name="mobile" placeholder="Mobile number" className="form-control" required />
              </div>

              <p className="text-md text-bold mb-1">Address</p>
              <div className="form-group mb-1">
                <input type="text" name="address-street" placeholder="Purok/Street" className="form-control" required />
              </div>

              <div className="form-group mb-1">
                <input type="text" name="address-brgy" placeholder="Barangay" className="form-control" required />
              </div>

              <div className="form-group mb-1">
                <input type="text" name="address-city" placeholder="City/Municipality" className="form-control" required />
              </div>

              {
                this.state.message &&
                <p className="text-center text-sm text-danger">{ this.state.message }</p>
              }

              <button type="submit" className="mt-2 btn btn-block btn-primary" disabled={this.state.registering}>REGISTER</button>
              <div className="mt-1 text-sm text-center">Already have an account? <Link to="/">Sign in here</Link></div>
            </div>
          </form>
        </IonContent>
      </IonPage>
    );
  }
}

export default RegistrationPage;
