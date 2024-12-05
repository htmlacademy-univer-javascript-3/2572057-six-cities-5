import { Cities } from '../../types';
import styles from './styles.module.css';

type CityTabProps = {
	name: Cities;
	isActive: boolean;
	onChange: (city: Cities) => void;
};

const CityTab: React.FC<CityTabProps> = ({ name, isActive, onChange }: CityTabProps) => {
  const handleTabClick = () => {
    onChange(name);
  };

  return (
    <li className="locations__item">
      <div className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''} ${styles.tab}`} onClick={handleTabClick}>
        <span>{name}</span>
      </div>
    </li>
  );
};

export default CityTab;
