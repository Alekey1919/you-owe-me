import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../services/firebase/firebase";
import { CollectionsEnum } from "../enums/collectionsEnum";
import { ITicket } from "../types/types";

export const getUserTickets = async ({
  userId,
  lastDoc,
  pageSize,
}: {
  userId: string;
  pageSize: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData, DocumentData>;
}) => {
  const colRef = collection(db, CollectionsEnum.Tickets);
  let q = query(colRef, where("userId", "==", userId), limit(pageSize));

  // If lastDoc is provided, start after it
  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);
  const tickets = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ITicket[];

  // Get the last document for the next page
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  return { tickets, lastVisible };
};

export const getTicket = async ({ ticketId }: { ticketId: string }) => {
  const colRef = collection(db, CollectionsEnum.Tickets);
  const q = query(colRef, where("id", "==", ticketId));

  const snapshot = await getDocs(q);

  if (snapshot.docs[0]) {
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as ITicket;
  }
};

export async function deleteTicketById(ticketId: string) {
  const docRef = doc(db, "tickets", ticketId);

  try {
    await deleteDoc(docRef);

    return "Success";
  } catch (error) {
    return error;
  }
}
