import { CollectionConfig } from "payload/types";
import { authenticatedUser } from "../access/authenticatedUser";
import { adminOnly } from "../access/adminOnly";

const Channel: CollectionConfig = {
  slug: "channel",
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: adminOnly,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};

export default Channel;
