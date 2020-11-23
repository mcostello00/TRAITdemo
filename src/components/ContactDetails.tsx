import ReactDOM from 'react-dom';
import React from 'react';
import { IContact } from '../utils/Contact_Interfaces';
import { EmailList } from './EmailList';

interface IContactDetailState {
  contact: IContact;
}

interface IContactDetailProps {
  contact: IContact;
  handleSaveClick: (contact: IContact) => void;
  handleDeleteClick: (contact: IContact) => void;
  handleCancelClick: () => void;
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
    };
  else {
    return { contact: props.contact };
  }
};

export class ContactDetails extends React.Component<
  IContactDetailProps,
  IContactDetailState
> {
  // handleChange2: React.ReactEventHandler<HTMLInputElement> = (ev) => {

  //  const target = ev.target as HTMLInputElement;
  //   this.setState({firstName: target.value});
  // }

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

  public handleAddEmailClick = (email: string) => {
    this.setState({
      contact: {
        ...this.state.contact,
        emails: [...this.state.contact.emails, email],
      },
    });
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

  state = getInitialContactState(this.props);

  public render(): JSX.Element {
    let { contact } = this.props;

    return (
      <>
        <input
          type="text"
          name="firstName"
          onChange={this.handleNameChange}
          value={this.state.contact.firstName}
        />
        <input
          type="text"
          name="lastName"
          onChange={this.handleNameChange}
          value={this.state.contact.lastName}
        />
        {console.log('emails:', this.state.contact.emails)}
        {console.log('emails:', this.props)}
        <EmailList
          handleAddClick={this.handleAddEmailClick}
          handleDeleteClick={this.handleDeleteEmailClick}
          emailAddresses={this.state.contact.emails}
        />
        <button
          onClick={(e) => this.props.handleDeleteClick(this.state.contact)}
        >
          Delete
        </button>
        <button onClick={this.props.handleCancelClick}>Cancel</button>
        <button onClick={(e) => this.props.handleSaveClick(this.state.contact)}>
          Save
        </button>
      </>
    );
  }
}
