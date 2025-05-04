import { ReactNode } from "react";
import { Metadata } from "next";
import { getTicket } from "@app/lib/fetchData";

type Props = {
  params: { id: string[] };
  children: ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id?.[0];

  // Return default metadata if we don't have an ID or if it's a local ticket
  if (!id || id === "local") {
    return {
      title: "Results - Split your tickets evenly",
      description: "View the results of your expense sharing calculation.",
    };
  }

  // Fetch ticket data
  try {
    const ticketData = await getTicket({ ticketId: id });

    if (!ticketData) {
      return {
        title: "Ticket not found",
        description: "The requested ticket could not be found.",
      };
    }

    // Create metadata with ticket information
    return {
      title: `${ticketData.name} - Split Results`,
      description:
        ticketData.notes ||
        `Split ticket results for ${ticketData.name} with ${ticketData.participants.length} participants.`,
      openGraph: {
        title: `${ticketData.name} - You owe me`,
        description:
          ticketData.notes ||
          `Split your expenses between ${ticketData.participants.join(", ")}.`,
      },
    };
  } catch (error) {
    console.error("Error fetching ticket data for metadata:", error);
    return {
      title: "Results - you-owe-me",
      description: "View the results of your expense sharing calculation.",
    };
  }
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
