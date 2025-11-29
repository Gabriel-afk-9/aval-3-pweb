import type { Dispatch, SetStateAction } from "react";
import { Search, Filter, X } from "lucide-react";
import styles from "../styles/Home/Search.module.css";

interface SearchComponentProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  clearSearch: () => void;
  selectedRegion: string;
  REGIONS: { value: string; label: string }[];
  setSelectedRegion: Dispatch<SetStateAction<string>>;
}

export default function SearchComponent({
  searchTerm,
  setSearchTerm,
  clearSearch,
  selectedRegion,
  REGIONS,
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

      <div className={styles.search_regionFilter}>
        <Filter size={20} />
        <select
          title="button"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          {REGIONS.map((region) => (
            <option key={region.value} value={region.value}>
              {region.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
