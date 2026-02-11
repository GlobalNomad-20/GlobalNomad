"use client";

import { useEffect, useRef } from "react";

interface KakaoMapProps {
  address?: string;
}
const KakaoMap = ({ address }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const kakao = (window as any).kakao;
    if (!kakao || !mapRef.current || !address) return;

    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status !== kakao.maps.services.Status.OK) return;

        const lat = result[0].y;
        const lng = result[0].x;

        const coords = new kakao.maps.LatLng(lat, lng);

        const map = new kakao.maps.Map(mapRef.current, {
          center: coords,
          level: 3,
        });

        const marker = new kakao.maps.Marker({
          position: coords,
        });
        marker.setMap(map);
      });
    });
  }, [address]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default KakaoMap;
