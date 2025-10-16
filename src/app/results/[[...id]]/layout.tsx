import { getTicket } from "@app/lib/fetchData";
import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  params: { id: string[] };
  children: ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id?.[0];

  // Return default metadata if we don't have an ID or if it's a local ticket
  if (!id || id === "local") {
    return {
      title: "Resultados",
      description: "Ve los resultados del cálculo de división de gastos.",
    };
  }

  // Fetch ticket data
  try {
    const ticketData = await getTicket({ ticketId: id });

    if (!ticketData) {
      return {
        title: "Ticket no encontrado",
        description: "No se pudo encontrar el ticket solicitado.",
      };
    }

    // Create metadata with ticket information
    return {
      title: `${ticketData.name} - Resultados de la División`,
      description:
        ticketData.notes ||
        `Resultados de la división de "${ticketData.name}" con ${ticketData.participants.length} participantes.`,
      openGraph: {
        title: `${ticketData.name}`,
        description:
          ticketData.notes ||
          `Rulos de los gastos entre ${ticketData.participants.join(", ")}.`,
      },
    };
  } catch (error) {
    console.error("Error fetching ticket data for metadata:", error);
    return {
      title: "Resultados - you-owe-me",
      description: "Ve los resultados del cálculo de división de gastos.",
    };
  }
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
