import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import { CollectionsEnum } from "../enums/collectionsEnum";
import { db } from "../services/firebase/firebase";
import { ITicket } from "../types/types";

export const getUserTickets = async ({
  userId,
  lastDoc,
  pageSize,
  sortOrder = "desc",
}: {
  userId: string;
  pageSize: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  sortOrder?: "asc" | "desc";
}) => {
  const colRef = collection(db, CollectionsEnum.Tickets);

  // Build query with all constraints at once
  let q;
  if (lastDoc) {
    q = query(
      colRef,
      where("userId", "==", userId),
      orderBy("date", sortOrder),
      startAfter(lastDoc),
      limit(pageSize)
    );
  } else {
    q = query(
      colRef,
      where("userId", "==", userId),
      orderBy("date", sortOrder),
      limit(pageSize)
    );
  }

  const snapshot = await getDocs(q);
  const tickets = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as object),
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
