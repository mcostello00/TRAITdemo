import { Main } from '../Main';
import ReactDOM from 'react-dom';
import React from 'react';
import { IContact } from '../utils/Contact_Interfaces';
import { ListGroup } from 'react-bootstrap';

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
      <h1>Contacts</h1>
      <button onClick={(e) => props.handleAddClick()}>add</button>

      <ListGroup as="ul">
        {props.contacts.map((contact) => (
          <ListGroup.Item as="li" key={contact.id}>
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
