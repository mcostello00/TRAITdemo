import * as React from 'react';
import { App } from './App';
import {
  getContactInfo,
  createContact,
  deleteContact,
  updateContact,
} from './utils/ContactUtils';
import { IContact, IContactInfo } from './utils/Contact_Interfaces';
import { ContactList } from './components/ContactList';
import { ContactDetails } from './components/ContactDetails';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

export interface IMainProps {
  app: App;
}

// example consuming code

interface IMainState {
  response: IContactInfo;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  emails: string[];
  isLoading: boolean;
  isAdding: boolean;
  isEditing: boolean;
  isRetrievalError: boolean;
  isUpdateError: boolean;
}

export function isValidEmail(email: string) {
  return (
    email === '' ||
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email,
    )
  );
}

export class Main extends React.Component<IMainProps, IMainState> {
  state = {
    response: { contacts: [] } as IContactInfo,
    id: null as number,
    firstName: '',
    lastName: '',
    email: '',
    emails: [] as string[],
    isLoading: true,
    isAdding: false,
    isEditing: false,
    isRetrievalError: false,
    isUpdateError: false,
  };

  private findContact(id: number) {
    return this.state.response.contacts.find((contact) => contact.id === id);
  }

  private resetState() {
    this.setState({
      isAdding: false,
      isEditing: false,
      isLoading: false,
      isUpdateError: false,
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      emails: [],
    });
  }

  public handleEditClick = (id: number) => {
    let { firstName, lastName, emails } = this.findContact(id);

    this.setState({
      id,
      firstName,
      lastName,
      emails,
      isAdding: false,
      isEditing: true,
    });
  };

  public handleAddClick = () => {
    this.setState({
      isAdding: true,
      isEditing: false,
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      emails: [],
    });
  };

  private consolidateEmails(): string[] {
    let { emails, email } = this.state;

    if (email != '') {
      return emails.concat(email);
    } else {
      return emails;
    }
  }
  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let {
      id,
      firstName,
      lastName,
      email,
      emails,
      isAdding,
      isEditing,
    } = this.state;

    if (firstName && lastName && isValidEmail(email)) {
      this.setState({ isLoading: true, isUpdateError: false });

      let contact: IContact = {
        firstName,
        lastName,
        emails: this.consolidateEmails(),
      };

      if (isEditing) {
        contact.id = id;

        updateContact(contact)
          .then(() => this.resetState())
          .then(() => this.retreiveContactInfo())
          .catch((error) => this.setState({ isUpdateError: true }))
          .finally(() => this.setState({ isLoading: false }));
      }

      if (isAdding) {
        createContact(contact)
          .then(() => this.resetState())
          .then(() => this.retreiveContactInfo())
          .catch((error) => this.setState({ isUpdateError: true }))
          .finally(() => this.setState({ isLoading: false }));
      }
    }
  };

  public handleCancelClick = () => {
    this.resetState();
  };

  public handleDeleteClick = (id: number) => {
    this.setState({ isLoading: true, isUpdateError: false });

    deleteContact(id)
      .then(() => {
        this.resetState();
        return this.retreiveContactInfo();
      })
      .catch((error) => this.setState({ isUpdateError: true }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  public handleDeleteEmailClick = (email: string) => {
    this.setState({
      emails: this.state.emails.filter(
        (emailAddress) => email !== emailAddress,
      ),
    });
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'firstName') {
      this.setState({ firstName: event.target.value });
    } else if (event.target.name === 'lastName') {
      this.setState({ lastName: event.target.value });
    } else if (event.target.name === 'email') {
      this.setState({ email: event.target.value });
    }
  };

  private async retreiveContactInfo() {
    this.setState({ isLoading: true, isRetrievalError: false });

    getContactInfo()
      .then((response) => this.setState({ response }))
      .catch((error) => this.setState({ isRetrievalError: true }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  public componentDidMount() {
    this.retreiveContactInfo();
  }

  public render(): JSX.Element {
    let { contacts } = this.state.response;
    let {
      id,
      firstName,
      lastName,
      emails,
      email,
      isUpdateError,
      isRetrievalError,
    } = this.state;

    if (isUpdateError || isRetrievalError) {
      let errorType = isUpdateError ? 'updating' : 'retreiving';
      let message = `Error ${errorType}, please try again.`;

      return (
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <Alert variant={'danger'} className="mt-2">
                <span>
                  <h5>{message}</h5>
                </span>
                <a href="/">Click to retry</a>
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    }
    return (
      <Container>
        <h1>Mike</h1>
        {this.state.isLoading ? (
          <Row>
            <Col className="d-flex justify-content-center">
              <Alert variant={'info'}>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ml-2">Loading...</span>
              </Alert>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col xs={12} md={4}>
              <ContactList
                activeId={this.state.id}
                contacts={contacts}
                handleEditClick={this.handleEditClick}
                handleAddClick={this.handleAddClick}
              />
            </Col>
            <Col xs={12} md={8}>
              {(this.state.isAdding || this.state.isEditing) && (
                <ContactDetails
                  key={this.state.id}
                  id={id}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  emails={emails}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  handleDeleteEmailClick={this.handleDeleteEmailClick}
                  handleCancelClick={this.handleCancelClick}
                  handleDeleteClick={this.handleDeleteClick}
                />
              )}
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}
