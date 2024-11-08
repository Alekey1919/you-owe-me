import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
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
