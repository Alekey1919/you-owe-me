import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface INavbarContext {
  isMobileOpen: boolean;
  setIsMobileOpen: Dispatch<SetStateAction<boolean>>;
  handleSignOut: () => void;
  svgColor: string;
  lgScreen: boolean;
}

const NavbarContext = createContext({});

export const NavbarContextProvider = ({
  children,
  state,
}: {
  children: any;
  state: INavbarContext;
}) => {
  return (
    <NavbarContext.Provider value={state}>{children}</NavbarContext.Provider>
  );
};

const useNavbarContext = () => {
  const state = useContext(NavbarContext) as INavbarContext;

  return state;
};

export default useNavbarContext;
