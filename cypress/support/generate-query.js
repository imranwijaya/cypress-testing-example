import dayjs from "dayjs";
import { faker, fakerID_ID } from "@faker-js/faker";

export function generateQueryCreateCustomer() {
  const firstName = fakerID_ID.person.firstName();
  const lastName = fakerID_ID.person.lastName();

  const customer = {
    name: `${firstName} ${lastName}`,
    email: fakerID_ID.internet.email({ firstName, lastName }).toLowerCase(),
    phone: faker.phone.number({ style: "mobile" }),
    address: fakerID_ID.location.streetAddress({ useFullAddress: true }),
    created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    created_by: 1,
    updated_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    updated_by: 1,
  };

  const sql = `INSERT INTO t_customer (name, email, phone, address, created_at, created_by, updated_at, updated_by) VALUES ('${customer.name}', '${customer.email}', '${customer.phone}', '${customer.address}', '${customer.created_at}', ${customer.created_by}, '${customer.updated_at}', ${customer.updated_by})`;

  return { sql, customer };
}
