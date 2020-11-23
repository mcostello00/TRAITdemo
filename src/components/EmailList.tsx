import ReactDOM from 'react-dom';
import React from 'react';

interface IEmailListProps {
  emailAddresses: string[];
  //   handleAddClick:  React.MouseEventHandler<HTMLButtonElement>;
  //   handleDeleteClick: React.MouseEventHandler<HTMLButtonElement>;
  handleAddClick: (email: string) => void;
  handleDeleteClick: (email: string) => void;
}

interface IEmailListState {
  newEmail: string;
}

export class EmailList extends React.Component<
  IEmailListProps,
  IEmailListState
> {
  state = {
    newEmail: '',
  };
  public handleNewEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ newEmail: event.target.value });
  };
  //export const EmailList: React.FunctionComponent<IEmailListProps, IEmailListState> = (props) => {
  public render(): JSX.Element {
    console.log(this);
    return (
      <>
        <ul style={{ listStyle: 'none' }}>
          {this.props.emailAddresses.map((email) => (
            <li key={email}>
              <a>{email}</a>
              <button onClick={(e) => this.props.handleDeleteClick(email)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button onClick={(e) => this.props.handleAddClick(this.state.newEmail)}>
          Add
        </button>
        <input
          type="text"
          name="firstName"
          onChange={this.handleNewEmailChange}
          value={this.state.newEmail}
        />
      </>
    );
  }
}
