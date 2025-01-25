import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Threebox } from 'threebox-plugin'; 
import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComp = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  const [cansatCoordinates, setCansatCoordinates] = useState([
    [77.61648476788898, 12.932323492103944, 0],
    [77.61348476788898, 12.942223492103944, 100],
    [77.61648476788898, 12.962223492103944, 200],
    [77.62648476788898, 12.952223492103944, 100],
    [77.65648476788898, 12.952223492103944, 0],
  ])


  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFyN29wZXJhdG9yIiwiYSI6ImNtNXh3amo0YTBld2sycXB5ZmExNm5nbjcifQ.M5pnCwxsbSHrzLHd0RjB6w';

    mapRef.current = new mapboxgl.Map({
      container: 'map',
      zoom: 11,
      center: [77.61648476788898, 12.932323492103944],
      pitch: 40,
      bearing: 41,
      attributionControl: false,
      style: 'mapbox://styles/mapbox/satellite-streets-v12'
    });


    mapRef.current.on('load', () => {
      mapRef.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: cansatCoordinates
          }
        }
      });

      mapRef.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': 'rgba(255,0, 0, 1)',
          'line-width': 3
        }
      });
    });

    mapRef.current.on('style.load', () => {
      mapRef.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 15
      });
      mapRef.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
    });



  }, []);

  return <div id="map" ref={mapContainerRef} style={{ height: '100%', width: "100%", borderRadius: "10px" }}></div>;
};

export default MapComp;