import { ObjectId } from "mongodb";

export const toOID = (id: string) => new ObjectId(id);
