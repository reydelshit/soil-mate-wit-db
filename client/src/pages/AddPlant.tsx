import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllPlants from './AllPlants';

export default function AddPlant() {
  const [plants, setPlants] = useState({
    title: '',
    desc: '',
    cover: null,
    price: '',
  });
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlants({ ...plants, [name]: value });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const data = new FileReader();
    // data.readAsDataURL(e.target.files![0]);

    // data.onloadend = () => {
    //   const base64 = data.result;
    //   if (base64) {
    //     setImage(base64.toString());

    //     // console.log(base64.toString());
    //   }


    const file = e.target.files![0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImage(base64);
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_SOIL_MATE}/plant.php`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...plants,
      plant_image: image
    }).then((res) => {
      console.log(res.data);
      window.location.reload()
    });
  };
  return (
    <div className="flex flex-col justify-center items-center w-full p-2 mt-[5rem]">
      <form
        className="flex flex-col justify-center items-center w-[80%] gap-4 h-[fit] "
        onSubmit={handleSubmit}
      >
        <div className="flex w-full items-center justify-center gap-2">
          <div className="w-[30%] b  text-black p-2 h-full bg-white rounded-md">
            <div className="mb-2 flex flex-col">
              <img
                className="w-full  h-[15rem] object-cover rounded-lg mb-4"
                src={image! ? image! : ''}
              />
              <span>Plant Image</span>
              <input
                required
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
                name="product_image"
              />
            </div>

            <div className="flex flex-col">
              <span>Plant Name</span>
              <input
                className="h-[3rem] border-2 border-green-500 rounded-mdp-2"
                required
                onChange={handleChange}
                name="plant_name"
              />
            </div>

            <div className="flex flex-col">
              <span>Description</span>
              <input
                className="h-[3rem] border-2 border-green-500 rounded-mdp-2"
                required
                onChange={handleChange}
                name="plant_description"
              />
            </div>
          </div>

          <div className="border-2 w-[30%] text-black p-2 h-full flex items-center flex-col bg-white bg-white rounded-md">
            <div className="flex flex-col w-full">
              <span>soilMoisture</span>
              <input
                className="h-[3rem] mb-2 w-full  border-2 border-green-500 rounded-md  p-2"
                required
                onChange={handleChange}
                name="soilMoistureMin"
                placeholder="min"
              />
              <input
                className="h-[3rem] mb-2 w-full  border-2 border-green-500 rounded-md p-2"
                required
                onChange={handleChange}
                name="soilMoistureMax"
                placeholder="max"
              />
            </div>

            <div className="flex flex-col w-full">
              <span>NPK</span>
              <input
                className="h-[3rem] mb-2 w-full  border-2 border-green-500 rounded-md p-2"
                required
                onChange={handleChange}
                name="npk"
              />
            </div>

            <div className="flex flex-col w-full">
              <span>phLevel</span>
              <input
                className="h-[3rem] mb-2 w-full  border-2 border-green-500 rounded-md p-2"
                required
                onChange={handleChange}
                name="phLevelMin"
                placeholder="min"
              />
              <input
                className="h-[3rem] mb-2 w-full  border-2 border-green-500 rounded-md p-2"
                required
                onChange={handleChange}
                name="phLevelMax"
                placeholder="max"
              />
            </div>

            <div className="flex flex-col w-full">
              <span>temperature</span>
              <input
                className="h-[3rem] mb-2 w-full  border-2 border-green-500 rounded-md p-2"
                required
                onChange={handleChange}
                name="temperatureMin"
                placeholder="min"
              />
              <input
                className="h-[3rem] mb-2 w-full  border-2 border-green-500 rounded-md p-2"
                required
                onChange={handleChange}
                name="temperatureMax"
                placeholder="max"
              />
            </div>
          </div>
        </div>
        <div className="gap-2 flex">
          <button
            type="submit"
            className="mt-2 bg-white p-4 w-[10rem]  border-2 border-green-500 rounded-md   font-bold"
          >
            Submit
          </button>
        </div>
      </form>

      <AllPlants />
    </div>
  );
}
