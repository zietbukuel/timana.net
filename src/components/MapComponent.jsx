import React, { useEffect, useRef } from 'react';

export default function MapComponent() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    let L;
    let resizeObserver;

    // Dynamically load leaflet on the client side only
    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      L = await import('leaflet');

      // Cleanup previous map instance if it exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Shift map center slightly West on desktop screens (>=1024px)
      // to center the marker in the visible right-hand half (not covered by the orange triangle overlay)
      const isDesktop = window.innerWidth >= 1024;
      const mapCenterLng = isDesktop ? -76.978000 : -76.956762;

      // Initialize map instance
      const map = L.map(mapContainerRef.current, {
        center: [-12.071483, mapCenterLng],
        zoom: 13,
        scrollWheelZoom: false
      });

      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add custom pin SVG icon
      const myIcon = L.divIcon({
        html: `
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#ff4b5c"/>
          </svg>
        `,
        className: 'custom-leaflet-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      // Add marker to map with autoPan disabled so it doesn't override our custom center offset
      L.marker([-12.071483, -76.956762], { icon: myIcon })
        .addTo(map)
        .bindPopup('<b>Juan Timaná</b><br>Lima, Perú', { autoPan: false })
        .openPopup();

      // Recalculate dimensions immediately on mount
      map.invalidateSize();

      // ResizeObserver handles size invalidations dynamically when DOM container shifts/renders
      resizeObserver = new ResizeObserver(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    initMap();

    // Clean up on component unmount
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full min-h-[400px] relative z-10 rounded-none border-0 shadow-none" 
    />
  );
}
