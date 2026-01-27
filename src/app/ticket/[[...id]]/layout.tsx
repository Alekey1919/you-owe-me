import { getTicket } from "@app/lib/fetchData";
import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  params: { id: string[] };
  children: ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id?.[0];

  if (!id || id === "local") {
    return {
      title: "New ticket",
      description: "Create a new ticket to split expenses.",
    };
  }

  try {
    const ticketData = await getTicket({ ticketId: id });

    if (!ticketData) {
      return {
        title: "Ticket not found",
        description: "The requested ticket could not be found.",
      };
    }

    return {
      title: `${ticketData.name} - Edit`,
      description: ticketData.notes || `Ticket: ${ticketData.name}`,
      openGraph: {
        title: `${ticketData.name} - Edit`,
        description:
          ticketData.notes ||
          `Ticket with ${ticketData.participants.length} participants.`,
      },
    };
  } catch (error) {
    console.error("Error fetching ticket data for metadata:", error);
    return {
      title: "Ticket - you-owe-me",
      description: "Create or view a ticket.",
    };
  }
}

const layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default layout;
