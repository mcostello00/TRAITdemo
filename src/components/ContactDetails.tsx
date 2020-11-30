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
  Fade,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { updateContact } from '../utils/ContactUtils';

interface IContactDetailState {
  wasValidated: boolean;
}

interface IContactDetailProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  emails: string[];
  //handleSaveClick: (contact: IContact) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteEmailClick: (email: string) => void;
  handleDeleteClick: (id: number) => void;
  handleCancelClick: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export class ContactDetails extends React.Component<
  IContactDetailProps,
  IContactDetailState
> {
  state = { wasValidated: false };

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!e.currentTarget.reportValidity()) {
      this.setState({ wasValidated: true });
    } else {
      this.props.handleSubmit(e);
    }
  }

  public render(): JSX.Element {
    let { firstName, lastName, emails } = this.props;

    return (
      <>
        <Container className="pt-5">
          <Form
            noValidate
            onSubmit={(e) => this.onSubmit(e)}
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
                  onChange={this.props.handleChange}
                  value={this.props.firstName}
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
                  onChange={this.props.handleChange}
                  value={this.props.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <EmailList
              //handleAddClick={this.handleAddEmailClick}
              email={this.props.email}
              handleDeleteClick={this.props.handleDeleteEmailClick}
              handleNewEmailChange={this.props.handleChange}
              emailAddresses={this.props.emails}
            />
            <Form.Row className="mt-auto mb-3">
              <Col xs={12} md={2}>
                <Button
                  disabled={this.props.id === null}
                  formNoValidate
                  className="button full-width mb-1"
                  style={{ backgroundColor: '#FF5757' }}
                  onClick={(e) => this.props.handleDeleteClick(this.props.id)}
                >
                  Delete
                </Button>
              </Col>
              <Col xs={12} md={5}></Col>
              <Col xs={12} md={3}>
                <Button
                  formNoValidate
                  className="button full-width mb-1"
                  style={{ backgroundColor: '#F9FBFF', color: 'black' }}
                  onClick={this.props.handleCancelClick}
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
