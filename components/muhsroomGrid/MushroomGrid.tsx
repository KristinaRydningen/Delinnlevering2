import "./mushroomGrid.css";

export type MushroomGridProps = { children: React.ReactNode };

export default function MushroomGrid({ children }: MushroomGridProps) {
  return (
    <>
      <div className="mushroomsDisplay">{children}</div>
    </>
  );
}
