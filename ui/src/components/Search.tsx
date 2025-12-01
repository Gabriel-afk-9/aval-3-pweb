import type { Dispatch, SetStateAction } from "react";
import { Search, X } from "lucide-react";
import styles from "../styles/Home/Search.module.css";
import Select from "./Select";

interface SearchComponentProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  clearSearch: () => void;
  selectedRegion: { value: string, label: string };
  setSelectedRegion: Dispatch<SetStateAction<{ value: string, label: string }>>;
}

export default function SearchComponent({
  searchTerm,
  setSearchTerm,
  clearSearch,
  selectedRegion,
  setSelectedRegion,
}: SearchComponentProps) {
  return (
    <div className={styles.search_filtersSection}>
      <div className={styles.search_searchBox}>
        <Search size={20} />
        <input
          type="text"
          placeholder="Buscar país por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            title="button"
            className={styles.search_clearBtn}
            onClick={clearSearch}
          >
            <X size={18} />
          </button>
        )}
      </div>

      <Select
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      />
    </div>
  );
}
