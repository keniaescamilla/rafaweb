import React from 'react';
import Mapita from './Mapita';

function Rutinas() {

  const googleMapsApiKey = "AIzaSyD7eg_7MntktPUSUweD_GLTvv01QHeQEEY"


  return (
    <div className="flex h-screen bg-white">
    
      <div className="flex flex-col flex-grow">
        <h1 className="text-center text-xl font-bold my-4 text-gray-600 bg-orange-400 rounded-full py-2 px-4 inline-block">Encuentra gimnasios cercanos</h1>
        <div style={{ width: '100%', height: '400px' }} >
        <Mapita googleMapsApiKey={googleMapsApiKey}/>
      </div>
      </div>
    </div>
  );
  
}  




export default Rutinas;
