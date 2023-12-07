import { CollectionConfig } from "payload/types";
import { authenticatedUser } from "../access/authenticatedUser";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};

export default Users;
