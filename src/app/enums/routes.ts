export enum RoutesEnum {
  Ticket = "/ticket",
  Results = "/results",
  MyTickets = "/my_tickets",
  Login = "/login",
}

export const protectedRoutes = [RoutesEnum.MyTickets];
