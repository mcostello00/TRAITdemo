import { IContact, IContactInfo } from './Contact_Interfaces';
import endpoint from './endpoint';
import { IHttpResponse } from './HTTP_Interfaces';
import { get, post, http_delete, put } from './HTTPUtils';

export async function getContactInfo() {
  const response = await get<IContactInfo>(
    `${endpoint}/contacts/paginated/?page=0&itemsPerPage=100`,
  );

  return response.parsedBody;
}

export async function createContact(contact: IContact) {
  const response = await post<IContactInfo>(`${endpoint}/contacts`, contact);
}

export async function updateContact(contact: IContact) {
  const response = await put<IContactInfo>(
    `${endpoint}/contacts/${contact.id}`,
    {
      firstName: contact.firstName,
      lastName: contact.lastName,
      emails: contact.emails,
    },
  );
}

export async function deleteContact(contact: IContact) {
  const response = await http_delete<IContactInfo>(
    `${endpoint}/contacts/${contact.id}`,
    contact,
  );
}
