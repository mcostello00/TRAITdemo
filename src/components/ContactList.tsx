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
        <Col className="pt-1">
          <a className="icon-button" onClick={(e) => props.handleAddClick()}>
            <FontAwesomeIcon icon={faPlusCircle} color="#579AFF" size="2x" />
          </a>
        </Col>
      </Row>

      <ListGroup as="ul" className="contact-list">
        {props.contacts.map((contact) => (
          <ListGroup.Item
            as="li"
            key={contact.id}
            onClick={(e) => props.handleEditClick(contact.id)}
          >
            {contact.firstName} {contact.lastName}: {contact.id}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
