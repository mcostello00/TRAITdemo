import ReactDOM from 'react-dom';
import React from 'react';
import { IContact } from '../utils/Contact_Interfaces';
import { EmailList } from './EmailList';
import {
  Container,
  Col,
  Row,
  Form,
  FormControl,
  Button,
  InputGroup,
  FormLabel,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { updateContact } from '../utils/ContactUtils';

interface IContactDetailState {
  contact: IContact;
  newEmail: string;
  wasValidated: boolean;
}

interface IContactDetailProps {
  contact: IContact;
  handleSaveClick: (contact: IContact) => void;
  handleDeleteClick: (contact: IContact) => void;
  handleCancelClick: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const getInitialContactState = (
  props: IContactDetailProps,
): IContactDetailState => {
  if (!props.contact)
    return {
      contact: {
        id: -1,
        firstName: '',
        lastName: '',
        emails: [] as string[],
      },
      newEmail: '',
      wasValidated: false,
    };
  else {
    return { contact: props.contact, newEmail: '', wasValidated: false };
  }
};

export class ContactDetails extends React.Component<
  IContactDetailProps,
  IContactDetailState
> {
  public handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'firstName') {
      this.setState({
        contact: { ...this.state.contact, firstName: event.target.value },
      });
    } else if (event.target.name === 'lastName') {
      this.setState({
        contact: { ...this.state.contact, lastName: event.target.value },
      });
    }
  };

  //public handleAddEmailClick = (event: React.MouseEvent<HTMLElement>) => {
  //makeMove(ownMark, (event.target as any).index)
  // }

  // public handleDeleteEmailClick = (event: React.MouseEvent<HTMLElement>) => {
  //makeMove(ownMark, (event.target as any).index)
  // }

  // public handleAddEmailClick = (email: string) => {
  //   this.setState({
  //     contact: {
  //       ...this.state.contact,
  //       emails: [...this.state.contact.emails, email],
  //     },
  //   });
  // };

  public handleNewEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log('handleNewEmailChange');
    this.setState({ newEmail: event.target.value });
  };

  public handleDeleteEmailClick = (email: string) => {
    this.setState({
      contact: {
        ...this.state.contact,
        emails: this.state.contact.emails.filter(
          (emailAddress) => email !== emailAddress,
        ),
      },
    });
  };

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(e.currentTarget.reportValidity());

    if (!e.currentTarget.reportValidity()) {
      console.log('setting wasValidated to true');
      this.setState({ wasValidated: true });
    } else {
      this.props.handleSubmit(e);
    }
  }

  save(event: React.MouseEvent<HTMLElement>) {
    let newContact = this.state.contact;

    if (this.state.newEmail != '') {
      let updateEmails = [...this.state.contact.emails, this.state.newEmail];
      newContact = { ...this.state.contact, emails: updateEmails };
    }

    this.props.handleSaveClick(newContact);
  }

  state = getInitialContactState(this.props);

  public render(): JSX.Element {
    let { contact } = this.props;

    console.log('this.state.wasValidated ' + this.state.wasValidated);
    return (
      <>
        <Container className="pt-5">
          <Form
            noValidate
            onSubmit={(e) => this.onSubmit(e)}
            //onSubmit={(e) => console.log('submit')}
            className={
              (this.state.wasValidated ? 'was-validated ' : '') +
              'details-form container-fluid d-flex flex-column h-100'
            }
          >
            <Form.Row>
              <Form.Group as={Col} controlId="first-name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  autoComplete="off"
                  placeholder="First name"
                  name="firstName"
                  onChange={this.handleNameChange}
                  value={this.state.contact.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a first name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={this.handleNameChange}
                  value={this.state.contact.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <EmailList
              //handleAddClick={this.handleAddEmailClick}
              newEmail={this.state.newEmail}
              handleDeleteClick={this.handleDeleteEmailClick}
              handleNewEmailChange={this.handleNewEmailChange}
              emailAddresses={this.state.contact.emails}
            />
            <Form.Row className="mt-auto mb-3">
              <Col xs={12} md={2}>
                <Button
                  formNoValidate
                  type="submit"
                  className="button full-width mb-1"
                  style={{ backgroundColor: '#FF5757' }}
                  // onClick={(e) =>
                  //   this.props.handleDeleteClick(this.state.contact)
                  // }
                >
                  Delete
                </Button>
              </Col>
              <Col xs={12} md={5}></Col>
              <Col xs={12} md={3}>
                <Button
                  type="submit"
                  className="button full-width mb-1"
                  variant="outline-dark"
                  style={{ backgroundColor: '#F9FBFF' }}
                  //onClick={this.props.handleCancelClick}
                >
                  Cancel
                </Button>
              </Col>
              <Col xs={12} md={2}>
                <Button
                  type="submit"
                  className="button full-width mb-1"
                  style={{ backgroundColor: '#579AFF' }}
                  //onClick={(e) => this.save(e)}
                >
                  Save
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </>
    );
  }
}
