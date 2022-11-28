import PocketBase, { Record } from 'pocketbase';

// if (!process.env.PB_URL) throw new Error("Missing PocketBase url environmental variable")
// if (!process.env.PB_EMAIL) throw new Error("Missing PocketBase authentication email environmental variable")
// if (!process.env.PB_PASSWORD) throw new Error("Missing PocketBase authentication password environmental variable")

const PB_URL = 'https://10.0.2.2:8090/'
const PB_EMAIL = 'st.brigita@gmail.com'
const PB_PASSWORD = 'pbslaptikas'
const PB_TOKEN = ''

export const pbClient = new PocketBase(PB_URL);

export function authenticatePocketBase() {

  //return pbClient.admins.authViaEmail('st.brigita@gmail.com', 'pbslaptikas');
}

// export interface CashierSessionResponse {
//   "@collectionId": string;
//   "@collectionName": string;
//   id: string;
//   created: string;
//   updated: string;
//   station_id: number;
//   employee: string;
//   shift_start: string;
//   shift_end: string;
// }

// export const getCashierSession = async (sessionId): Promise<CashierSessionResponse | Record> => {
//   return await pbClient.records.getOne('cashier_session', sessionId)
// }