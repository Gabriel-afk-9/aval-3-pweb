import { useState, type Dispatch, type SetStateAction } from "react";
import { Filter } from "lucide-react";
import styles from "../styles/Home/Select.module.css";

interface SelectProps {
  selectedRegion: { value: string, label: string };
  setSelectedRegion: Dispatch<SetStateAction<{ value: string, label: string }>>
}

export default function Select({ selectedRegion, setSelectedRegion }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const REGIONS = [
    { value: 'all', label: 'Todos os continentes' },
    { value: 'Africa', label: 'África' },
    { value: 'Americas', label: 'Américas' },
    { value: 'Asia', label: 'Ásia' },
    { value: 'Europe', label: 'Europa' },
    { value: 'Oceania', label: 'Oceania' },
  ];

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  }

  const handleSelect = (region: { value: string, label: string}) => {
    setSelectedRegion(region);
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.regionFilter} onClick={toggleSelect}>
      <Filter size={20} />
      <p>{selectedRegion.label}</p>

      {isOpen && (
        <div
        className={styles.options}
        onClick={(e) => e.stopPropagation()}
        >
          {REGIONS.map((region) => (
            <p
            onClick={() => handleSelect(region)}
            className={styles.option}
            >{region.label}</p>
          ))}
        </div>
      )}
    </div>
  )
}