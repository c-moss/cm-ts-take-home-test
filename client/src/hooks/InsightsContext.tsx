import { createContext, useContext, useState } from "react";
// TBH using a context for this is overkill - irl I would probably just pass a callback via props
type InsightsContext = {
  needsRefresh: boolean;
  setNeedsRefresh: (needsRefresh: boolean) => void;
};

const InsightsContext = createContext<InsightsContext>({
  needsRefresh: false,
  setNeedsRefresh: function (): void {
    throw new Error("Function not implemented.");
  }
});

export const InsightsProvider = ({ children }: { children: React.ReactNode }) => {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  return (
    <InsightsContext.Provider value={{ needsRefresh, setNeedsRefresh }}>
      {children}
    </InsightsContext.Provider>
  );
}

export const useInsightsContext = () => {
  const context = useContext(InsightsContext);
  if (!context) {
    throw new Error("useInsightsContext must be used within an InsightsProvider");
  }
  return context;
}