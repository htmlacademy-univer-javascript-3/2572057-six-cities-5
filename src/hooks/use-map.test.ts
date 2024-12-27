import { renderHook } from '@testing-library/react';
import { Map } from 'leaflet';
import { MutableRefObject } from 'react';
import useMap from './use-map';

describe('useMap hook', () => {
  const mockCity = {
    name: 'Paris',
    location: {
      latitude: 48.856663,
      longitude: 2.351556,
      zoom: 11,
    },
  };

  const mockRef: MutableRefObject<HTMLElement | null> = {
    current: document.createElement('div'),
  };

  it('should return null when ref is null', () => {
    const { result } = renderHook(() => useMap({ current: null }, mockCity));
    expect(result.current).toBeNull();
  });

  it('should create map instance when ref is valid', () => {
    const { result } = renderHook(() => useMap(mockRef, mockCity));
    expect(result.current).toBeInstanceOf(Map);
  });
});
