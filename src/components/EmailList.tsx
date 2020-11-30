import ReactDOM from 'react-dom';
import React from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface IEmailListProps {
  emailAddresses: string[];

  handleDeleteClick: (email: string) => void;
  handleNewEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
}

interface IEmailListState {
  isAdding: boolean;
}

export class EmailList extends React.Component<
  IEmailListProps,
  IEmailListState
> {
  state = {
    isAdding: false,
  };

  public handleAddClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    this.setState({ isAdding: true });
  };

  public render(): JSX.Element {
    return (
      <>
        <Form.Row>
          <Form.Group as={Col} className="col-md-5">
            <Form.Label sm="2">Emails</Form.Label>

            {this.props.emailAddresses.map((email) => (
              <InputGroup key={email}>
                <Form.Control
                  key={email}
                  plaintext
                  readOnly
                  value={email}
                  className="hover-button-trigger"
                />
                <a
                  className="icon-button small hover-button"
                  title="Delete Email"
                  key={`${email}button`}
                  onClick={(e) => this.props.handleDeleteClick(email)}
                >
                  <FontAwesomeIcon icon={faMinusCircle} color="#FF5757" />
                </a>
              </InputGroup>
            ))}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <InputGroup className="mb-3">
            <InputGroup.Prepend className="pb-1">
              <a
                className="icon-button small mr-1"
                title="Add Email"
                onClick={this.handleAddClick}
              >
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  color="#579AFF"
                  style={{ verticalAlign: '2em' }}
                />
              </a>
            </InputGroup.Prepend>
            <Form.Label>Add Email</Form.Label>
          </InputGroup>
        </Form.Row>
        {this.state.isAdding && (
          <Form.Row className="mb-2">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              onChange={this.props.handleNewEmailChange}
              value={this.props.email}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Row>
        )}
      </>
    );
  }
}
