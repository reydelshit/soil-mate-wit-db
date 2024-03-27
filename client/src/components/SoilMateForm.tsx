import { useEffect, useState } from 'react';

import axios from 'axios';

export default function SoilMateForm() {
  const [soil, setSoil] = useState('');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setKpotassium] = useState('');
  const [humidity, setHumidity] = useState('');
  const [temperature, setTemperature] = useState('');

  const [phLevel, setPhLevel] = useState('');

  const [decider, setDecider] = useState(false);

  const [result, setResult] = useState([]);
  const [resultData, setResultData] = useState([]);

  //   const cropRecommendations = [
  //     {
  //       soilMoistureLevel: {
  //         min: 1,
  //         max: 20,
  //       },
  //       phLevel: {
  //         min: 1,
  //         max: 5,
  //       },

  //       result: [
  //         {
  //           name: "carrot",
  //           img: carrot,
  //         },
  //         {
  //           name: "capsicum",
  //           img: capsicum,
  //         },
  //       ],
  //       conditions: {
  // "Soil Moisture":
  //   "Keep the soil consistently moist but not waterlogged. Water when the top inch of soil feels dry.",
  // "pH Level": "Aim for a slightly acidic to neutral soil .",
  // "Ideal Temperature":
  //   "Thrive in temperatures between 20-30°C (68-86°F).",
  // Guide:
  //   "Provide adequate sunlight, use well-draining soil, and monitor for signs of overwatering.",
  //       },
  //     },
  //     {
  //       soilMoistureLevel: {
  //         min: 1,
  //         max: 20,
  //       },

  //       phLevel: {
  //         min: 6,
  //         max: 7,
  //       },

  //       result: [
  //         {
  //           name: "chinese cabbage",
  //           img: chineseCabbage,
  //         },
  //       ],
  //       conditions: {
  //         "Soil Moisture":
  //           "Maintain moderate moisture levels. Water when the top 1-2 inches of soil is dry.",
  //         "pH Level": "Prefer slightly acidic to neutral soil ",
  //         "Ideal Temperature": "Best in temperatures around 18-24°C (64-75°F).",
  //         Guide:
  //           "Plant in loose, well-draining soil, mulch to retain moisture, and avoid waterlogging.",
  //       },
  //     },
  //     {
  //       soilMoistureLevel: {
  //         min: 1,
  //         max: 20,
  //       },
  //       phLevel: {
  //         min: 7,
  //         max: 10,
  //       },
  //       result: [
  //         {
  //           name: "onion",
  //           img: onion,
  //         },

  //         {
  //           name: "chinese cabbage",
  //           img: chineseCabbage,
  //         },
  //       ],

  //       conditions: {
  //         "Soil Moisture":
  //           "Keep the soil consistently moist but not waterlogged. Water when the top inch of soil feels dry.",
  //         "pH Level": "Aim for a slightly acidic to neutral soil (pH 5.5-6).",
  //         "Ideal Temperature":
  //           "Thrive in temperatures between 20-30°C (68-86°F).",
  //         Guide:
  //           "Provide adequate sunlight, use well-draining soil, and monitor for signs of overwatering.",
  //       },
  //     },

  //     {
  //       soilMoistureLevel: {
  //         min: 21,
  //         max: 30,
  //       },
  //       phLevel: {
  //         min: 1,
  //         max: 5,
  //       },

  //       result: [
  //         {
  //           name: "capsicum",
  //           img: capsicum,
  //         },
  //       ],

  //       conditions: {
  //         "Soil Moisture":
  //           "Maintain moderate moisture levels. Water when the top 1-2 inches of soil is dry.",
  //         "pH Level": "Prefer slightly acidic to neutral soil.",
  //         "Ideal Temperature": "Best in temperatures around 20-30°C (68-86°F).",
  //         Guide:
  //           "Provide well-draining soil, avoid waterlogging, and mulch to retain moisture.",
  //       },
  //     },
  //     {
  //       soilMoistureLevel: {
  //         min: 21,
  //         max: 30,
  //       },
  //       phLevel: {
  //         min: 6,
  //         max: 7,
  //       },
  //       result: [
  //         {
  //           name: "tomato",
  //           img: kamatis,
  //         },

  //         {
  //           name: "eggplant",
  //           img: talong,
  //         },
  //       ],

  //       conditions: {
  //         "Soil Moisture":
  //           "Keep the soil consistently moist. Water regularly, and ensure good drainage.",
  //         "pH Level": "Thrive in slightly acidic to neutral soil (pH 5.5-6.5).",
  //         "Ideal Temperature": "Prefer temperatures between 20-30°C (68-86°F).",
  //         Guide:
  //           "Provide full sun to partial shade, mulch to retain moisture, and monitor for signs of pests.",
  //       },
  //     },
  //     {
  //       soilMoistureLevel: {
  //         min: 21,
  //         max: 30,
  //       },
  //       phLevel: {
  //         min: 8,
  //         max: 10,
  //       },
  //       // result: ["tomato", "eggplant"],
  //       result: [
  //         {
  //           name: "tomato",
  //           img: kamatis,
  //         },

  //         {
  //           name: "eggplant",
  //           img: talong,
  //         },
  //       ],

  //       conditions: {
  //         "Soil Moisture":
  //           "Keep the soil consistently moist. Water regularly, especially during dry periods.",
  //         "pH Level": "Prefer slightly acidic to neutral soil (pH 6.5-7).",
  //         "Ideal Temperature": "Best in temperatures around 20-30°C (68-86°F).",
  //         Guide:
  //           "Ensure good drainage, add organic matter to improve moisture retention, and provide regular watering.",
  //       },
  //     },

  //     {
  //       soilMoistureLevel: {
  //         min: 31,
  //         max: 50,
  //       },
  //       phLevel: {
  //         min: 1,
  //         max: 5,
  //       },

  //       result: [
  //         {
  //           name: "carrot",
  //           img: carrot,
  //         },

  //         {
  //           name: "onion",
  //           img: onion,
  //         },
  //       ],
  //       conditions: {
  //         "Soil Moisture":
  //           "Maintain moderate moisture levels. Water when the top 1-2 inches of soil is dry.",
  //         "pH Level": "Prefer slightly acidic to neutral soil (pH 5.5-6).",
  //         "Ideal Temperature": "Best in temperatures around 20-30°C (68-86°F).",
  //         Guide:
  //           "Provide well-draining soil, avoid waterlogging, and mulch to retain moisture.",
  //       },
  //     },
  //     {
  //       soilMoistureLevel: {
  //         min: 31,
  //         max: 50,
  //       },
  //       phLevel: {
  //         min: 6,
  //         max: 7,
  //       },

  //       result: [
  //         {
  //           name: "eggplant",
  //           img: talong,
  //         },
  //       ],

  //       conditions: {
  //         "Soil Moisture":
  //           "Keep the soil consistently moist. Water regularly, and ensure good drainage.",
  //         "pH Level": "Thrive in slightly acidic to neutral soil (pH 5.5-6.5).",
  //         "Ideal Temperature": "Prefer temperatures between 20-30°C (68-86°F).",
  //         Guide:
  //           "Provide full sun to partial shade, mulch to retain moisture, and monitor for signs of pests.",
  //       },
  //     },
  //     {
  //       soilMoistureLevel: {
  //         min: 31,
  //         max: 50,
  //       },
  //       phLevel: {
  //         min: 7,
  //         max: 10,
  //       },

  //       result: [
  //         {
  //           name: "tomato",
  //           img: kamatis,
  //         },

  //         {
  //           name: "onion",
  //           img: onion,
  //         },

  //         {
  //           name: "eggplant",
  //           img: talong,
  //         },
  //       ],
  //       conditions: {
  //         "Soil Moisture":
  //           "Keep the soil consistently moist. Water regularly, especially during dry periods.",
  //         "pH Level": "Prefer slightly acidic to neutral soil (pH 6.5-7).",
  //         "Ideal Temperature": "Best in temperatures around 20-30°C (68-86°F).",
  //         Guide:
  //           "Ensure good drainage, add organic matter to improve moisture retention, and provide regular watering.",
  //       },
  //     },
  //   ];

  // fetch data from arduino

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8800/data');
      console.log(res.data);

      setResultData(res.data);
      setSoil(res.data.res.soil);
      setNitrogen(res.data.res.N);
      setPhosphorus(res.data.res.P);
      setKpotassium(res.data.res.K);
      setHumidity(res.data.res.humidity);
      setTemperature(res.data.res.temperature);
      setPhLevel(res.data.res.pH);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    setDecider(!decider);

    axios
      .get(`${import.meta.env.VITE_SOIL_MATE}/plant.php`, {
        params: {
          soil,
        },
      })
      .then((res) => {
        console.log(res.data, 'test');

        setResult(res.data);
      });
  };

  const handleRefresh = () => {
    fetchData()
  }

  return (
    <div className="w-screen h-screen flex flex-row-reverse justify-center gap-5 items-center">
      {soil && result.length > 0 && (
        <div className="bg-gray-200 p-2 w-[50%] h-[30rem] flex flex-col text-center rounded-lg gap-4 overflow-x-hidden">
          <h1 className="font-bold text-start">Suggested Plants:</h1>
          {result.map((plant: any, index) => {
            return (
              <div
                className="border-2 p-2 bg-white rounded-md border-green-500 flex  items-start gap-2"
                key={index}
              >
                <img
                  className="w-[8rem] h-[8rem] object-cover block rounded-md "
                  src={plant.plant_image}
                  alt="plant image"
                />
                <div className="text-start w-full text-wrap">
                  <h1 className="font-bold text-xl">{plant.plant_name}</h1>
                  <p className="break-words w-[80%]">
                    <TextWithNewLine text={plant.plant_description} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-white w-[30rem] h-[30rem] flex  items-center flex-col text-center rounded-lg  overflow-hidden">
        <div className="flex justify-end w-full px-4 my-[1.5rem]">
          <button onClick={handleRefresh}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </div>
        <div className="py-2">
          <h1 className="font-bold text-2xl">SoilMate</h1>
        </div>
        <div className="w-[80%] bg-[#fff8eb] bg-opacity-60 p-2 text-[#ffb01f] font-bold rounded-lg mb-4">
          <h1 className=" text-sm">Soil Moisture: {soil}</h1>
        </div>

        <div className="w-[80%] bg-[#f0fffb] bg-opacity-60 p-2 text-[#00bd91] font-bold rounded-lg mb-4">
          <h1 className=" text-sm">
            Nitrogen: {nitrogen}, Phosphorus: {phosphorus}, Potassium:{' '}
            {potassium}
          </h1>
        </div>

        <div className="w-[80%] bg-[#fff0f0] bg-opacity-60 p-2 text-[#ff5757] font-bold rounded-lg mb-4">
          <h1 className=" text-sm">Humidity: {humidity}</h1>
        </div>

        <div className="w-[80%] bg-[#fff0f0] bg-opacity-60 p-2 text-[#ff5757] font-bold rounded-lg mb-4">
          <h1 className=" text-sm">Temperature: {temperature}</h1>
        </div>

        <div className="w-[80%] bg-[#fff0f0] bg-opacity-60 p-2 text-[#ff5757] font-bold rounded-lg mb-4">
          <h1 className=" text-sm">Ph Level: {phLevel}</h1>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="border-2 border-[#f0fffb] p-2 hover:bg-blue-500 hover:text-white rounded-md bg-[#41644a] text-white"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}

function TextWithNewLine({ text }: { text: string }) {
  const parts = text.split('-');

  return (
    <div>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index !== parts.length - 1 && '-'}
          <br />
          <br />
        </span>
      ))}
    </div>
  );
}
