import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AllPlants() {
  const [plant, setPlants] = useState([]);
  const getAllPlants = () => {
    axios.get(`${import.meta.env.VITE_SOIL_MATE}/plant.php`).then((res) => {
      console.log(res.data, 'plants');
      if (res.data.length > 0) {
        setPlants(res.data);
      }
    });
  };
  useEffect(() => {
    getAllPlants();
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`${import.meta.env.VITE_SOIL_MATE}/plant.php`, {
        data: {
          id,
        },
      })
      .then((res) => {
        console.log(res.data);
        getAllPlants();
      });
  };

  return (
    <div className=" w-full p-2 h-fit border-2 block mt-[5rem]">
      <div className="grid grid-cols-4 w-[80%] gap-2 text-white">
        {plant.map((pl: any, index) => {
          return (
            <div key={index}>
              <button onClick={() => handleDelete(pl.plant_id)}>delete</button>
              <h1>{pl.plant_name}</h1>
              <img
                className="w-[10rem] h-[10rem] object-cover"
                src={pl.plant_image}
                alt="plant"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
