import mongoose from 'mongoose';
import uuid from "node-uuid"

const peopleSchema = mongoose.Schema(
  {
    userid: { type: String, default: uuid.v1 },
    username: {
      type: String,
      required: [true, 'Please add a name'],
    },
    loggedid: {
      type: String,
      required: [true],
    },
    userstatus: {
      type: String,
    },
    message: {
      type: String,
    },
    requestStatus: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);
const People = mongoose.model('People', peopleSchema);
export default People;
// export const People = model.schema;
