import Navbar from "@components/search/navbar";
import { SearchProvider } from "@contexts/search";

export default function LayoutSearch({ children }) {
  return (
    <>
      <SearchProvider>
        <Navbar />
        <div className="pt-20">{children}</div>
      </SearchProvider>
    </>
  );
}
