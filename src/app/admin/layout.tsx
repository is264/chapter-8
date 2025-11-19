import { SideBer } from "./_components/SideBer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideBer />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
