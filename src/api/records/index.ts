import { getAllRecords } from "./getAllRecords";
import { postCreateRecord, RequestBodyCreateRecord } from "./postCreateRecord";
import { deleteRecord } from "./deleteRecord";
import { patchRecord } from "./patchRecord"
import { getFile } from "./getFile"
import { postFile, RequestBodyPostFile, ResponseBodyPostFile } from "./postFile"
import { getRecord } from "./getRecord"
import { deleteFile } from "./deleteFile"

export { getAllRecords, postCreateRecord, deleteRecord, patchRecord, getFile, postFile, getRecord, deleteFile };
export type { RequestBodyCreateRecord, RequestBodyPostFile, ResponseBodyPostFile };
