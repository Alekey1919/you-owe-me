import { getTicket } from "@app/lib/fetchData";
import { getUserLocale } from "@app/services/locale";
import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  params: { id: string[] };
  children: ReactNode;
};

// Translation strings for metadata
const translations = {
  en: {
    defaultTitle: "Results",
    defaultDescription: "View the results of your expense sharing calculation.",
    ticketNotFoundTitle: "Ticket not found",
    ticketNotFoundDescription: "The requested ticket could not be found.",
    splitResults: "Split Results",
    splitTicketResults: (name: string, count: number) =>
      `Split ticket results for ${name} with ${count} participants.`,
    splitExpensesBetween: (participants: string) =>
      `Expenses division results for ${participants}.`,
    resultsTitle: "Results - you-owe-me",
  },
  es: {
    defaultTitle: "Resultados",
    defaultDescription: "Ve los resultados del cálculo de división de gastos.",
    ticketNotFoundTitle: "Ticket no encontrado",
    ticketNotFoundDescription: "No se pudo encontrar el ticket solicitado.",
    splitResults: "Resultados de la División",
    splitTicketResults: (name: string, count: number) =>
      `Resultados de la división de "${name}" con ${count} participantes.`,
    splitExpensesBetween: (participants: string) =>
      `Division de gastos entre ${participants}.`,
    resultsTitle: "Resultados - you-owe-me",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id?.[0];
  const locale = (await getUserLocale()) as "en" | "es";
  const t = translations[locale];

  // Return default metadata if we don't have an ID or if it's a local ticket
  if (!id || id === "local") {
    return {
      title: t.defaultTitle,
      description: t.defaultDescription,
    };
  }

  // Fetch ticket data
  try {
    const ticketData = await getTicket({ ticketId: id });

    if (!ticketData) {
      return {
        title: t.ticketNotFoundTitle,
        description: t.ticketNotFoundDescription,
      };
    }

    // Create metadata with ticket information
    return {
      title: `${ticketData.name} - ${t.splitResults}`,
      description:
        ticketData.notes ||
        t.splitTicketResults(ticketData.name, ticketData.participants.length),
      openGraph: {
        title: `${ticketData.name} - You owe me`,
        description:
          ticketData.notes ||
          t.splitExpensesBetween(ticketData.participants.join(", ")),
      },
    };
  } catch (error) {
    console.error("Error fetching ticket data for metadata:", error);
    return {
      title: t.resultsTitle,
      description: t.defaultDescription,
    };
  }
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
