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
import { Container, Row, Col } from 'react-bootstrap';

export interface IMainProps {
  app: App;
}

// example consuming code

interface IMainState {
  response: IContactInfo;
  selectedContact: IContact;
  isAdding: boolean;
  isEditing: boolean;
  isRetrievalError: boolean;
  isUpdateError: boolean;
}

export class Main extends React.Component<IMainProps, IMainState> {
  state = {
    response: { contacts: [] } as IContactInfo,
    selectedContact: null as IContact,
    isAdding: false,
    isEditing: false,
    isRetrievalError: false,
    isUpdateError: false,
  };

  private findContact(id: number) {
    return this.state.response.contacts.find((contact) => contact.id === id);
  }

  public handleEditClick = (id: number) => {
    console.log('handleEditClick');
    this.setState({
      selectedContact: this.findContact(id),
      isAdding: false,
      isEditing: true,
    });
  };

  public handleAddClick = () => {
    console.log('handleAddClick');
    this.setState({
      isAdding: true,
      isEditing: false,
      selectedContact: null,
    });
  };

  public handleSaveClick = (contact: IContact) => {
    if (this.state.isEditing) {
      updateContact(contact);
    } else if (this.state.isAdding) {
      createContact({
        firstName: contact.firstName,
        lastName: contact.lastName,
        emails: contact.emails,
      }).catch((error) => this.setState({ isUpdateError: true }));
    }
  };

  public handleCancelClick = () => {
    this.setState({ selectedContact: null, isEditing: false, isAdding: false });
  };

  public handleDeleteClick = (contact: IContact) => {
    console.log('****', contact, '****');
    deleteContact(contact).catch((error) =>
      console.log('Delete Error: ', error),
    );
    this.setState({ selectedContact: null, isEditing: false, isAdding: false });
  };

  public async componentDidMount() {
    getContactInfo()
      .then((response) => this.setState({ response }))
      .catch((error) => this.setState({ isRetrievalError: true }));
  }

  public render(): JSX.Element {
    let { contacts } = this.state.response;
    let { selectedContact, isAdding, isEditing } = this.state;

    if (isAdding) {
      selectedContact = { id: -1, firstName: '', lastName: '', emails: [] };
    }

    return (
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <ContactList
              contacts={contacts}
              handleEditClick={this.handleEditClick}
              handleAddClick={this.handleAddClick}
            />
          </Col>
          <Col xs={12} md={8}>
            {(this.state.isAdding || this.state.isEditing) && (
              <ContactDetails
                key={selectedContact.id}
                contact={selectedContact}
                handleSaveClick={this.handleSaveClick}
                handleCancelClick={this.handleCancelClick}
                handleDeleteClick={this.handleDeleteClick}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
