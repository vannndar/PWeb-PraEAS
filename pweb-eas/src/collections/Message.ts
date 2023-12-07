import { CollectionConfig } from "payload/types";
import { authenticatedUser } from "../access/authenticatedUser";
import { adminOnly } from "../access/adminOnly";

const Message: CollectionConfig = {
  slug: "message",
  admin: {
    useAsTitle: "text",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: adminOnly,
  },
  fields: [
    {
      name: "text",
      type: "textarea",
      required: true,
    },
    {
      name: "sender",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "channel",
      type: "relationship",
      relationTo: "channel",
    },
  ],
};

export default Message;
