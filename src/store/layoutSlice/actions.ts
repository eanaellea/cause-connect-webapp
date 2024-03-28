import { useGlobalStore } from "@/store/store";

export const toggleDrawer = async (): Promise<void> => {
  useGlobalStore.setState((state) => ({ isDrawerOpen: !state.isDrawerOpen }));
};

export const setActivePage = async (newPage: string): Promise<void> => {
  useGlobalStore.setState(() => ({ activePage: newPage }));
};
