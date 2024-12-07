import React, { useState } from 'react';
import { useActions } from '../../store/hooks';

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

const SortingOptions: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Popular);
  const { sortOffers } = useActions();

  const handleSortTypeClick = (type: SortType) => {
    setActiveSort(type);
    setIsOpened(false);
    sortOffers(type);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption" style={{ marginRight: '4px' }}>Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened(!isOpened)}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((type) => (
          <li
            key={type}
            className={`places__option ${type === activeSort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortTypeClick(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortingOptions;
