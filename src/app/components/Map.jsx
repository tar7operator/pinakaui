import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  const [lineCoordinates, setLineCoordinates] = useState([
    [77.61648476788898, 12.932323492103944, 0],
    [77.616402, 12.982396, 200],
    [77.616158, 13.032469, 400],
    [77.615751, 13.082542, 600],
    [77.615181, 13.132615, 800],
    [77.614448, 13.182688, 300], // Peak altitude
    [77.615181, 13.232761, 800],
    [77.615751, 13.282834, 600],
    [77.616158, 13.332907, 400],
    [77.616402, 13.382980, 200],
    [77.61648476788898, 13.433053, 0]
]);



  const addModel = (rf) => {

    window.tb = new Threebox(
      rf,
      rf.getCanvas().getContext('webgl'),
      { defaultLights: true, realSunlight: true }
    );

    // model data
    // const scale = 3.2;
    // const options = {
    //   obj: 'https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf',
    //   type: 'gltf',
    //   scale: { x: scale, y: scale, z: 2.7 },
    //   units: 'meters',
    //   rotation: { x: 90, y: -90, z: 0 },
    //   translate: { x: 0, y: 0, z: 240}
    // };

    // window.tb.loadObj(options, (model) => {
    //   model.setCoords([77.61648476788898, 12.932323492103944]);

    //   model.setRotation({ x: 0, y: 0, z: 241 });
    //   window.tb.add(model);
    // });


    //lines data
    var lineOptions = {
      geometry: lineCoordinates,
      color: "red", // color based on latitude of endpoint
      width: 1.5 // random width between 1 and 2
    }
    let lineMesh = window.tb.line(lineOptions);
    window.tb.add(lineMesh)


  }

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFyN29wZXJhdG9yIiwiYSI6ImNtNXh3amo0YTBld2sycXB5ZmExNm5nbjcifQ.M5pnCwxsbSHrzLHd0RjB6w';

    mapRef.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [77.61648476788898, 12.932323492103944],
      zoom: 15.4,
      pitch: 110,
      bearing: 90,
      antialias: true
    });

    
    mapRef.current.on('style.load', () => {

      mapRef.current.addLayer({
        id: 'addedpoints',
        type: 'custom',
        renderingMode: '3d',
        onAdd: addModel(mapRef.current),

        render: function () {
          window.tb.update();
        }
      });
    });



  }, []);

  return <div id="map" ref={mapContainerRef} style={{ height: '100%', width: "100%", borderRadius: "10px" }}></div>;
};

export default MapboxExample;