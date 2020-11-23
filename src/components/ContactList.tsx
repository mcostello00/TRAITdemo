import { Main } from '../Main';
import ReactDOM from 'react-dom';
import React from 'react';
import { IContact } from '../utils/Contact_Interfaces';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export interface IContactListProps {
  contacts: IContact[];
  //handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleEditClick: (i: number) => void;
  handleAddClick: () => void;
}

export const ContactList: React.FunctionComponent<IContactListProps> = (
  props,
) => {
  return (
    <>
      <Row>
        <Col>
          <h3>Contacts</h3>
        </Col>
        <Col>
          <div
            style={{
              height: '32px',
              width: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
            onClick={(e) => props.handleAddClick()}
          >
            <FontAwesomeIcon icon={faPlusCircle} color="#579AFF" size="2x" />
          </div>
        </Col>
      </Row>

      <ListGroup as="ul" className="contact-list">
        {props.contacts.map((contact) => (
          <ListGroup.Item
            as="li"
            key={contact.id}
            onClick={(e) => props.handleEditClick(contact.id)}
          >
            <a onClick={(e) => props.handleEditClick(contact.id)}>
              {contact.firstName} {contact.lastName}: {contact.id}
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* <ul style={{ listStyle: 'none' }}>
        {props.contacts.map((contact) => (
          <li key={contact.id}>
            <a onClick={(e) => props.handleEditClick(contact.id)}>
              {contact.firstName} {contact.lastName}: {contact.id}
            </a>
          </li>
        ))}
      </ul> */}
    </>
  );
};
