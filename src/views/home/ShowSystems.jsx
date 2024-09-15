import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceDescription from "../../data/ServicesDescriptionData";
import loading from "../../assets/loading.gif";

const ShowSystems = () => {
  const params = useParams();
  const [currentSystem, setCurrentSystem] = useState({});
  const [currentSystemFunction, setCurrentSystemFunction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentSystem(ServiceDescription[params.system]);
    setIsLoading(false);
  }, [params.system]);

  useEffect(() => {
    if(currentSystem!==undefined){
      setCurrentSystemFunction(currentSystem.systemFunctions);
    }
  }, [currentSystem]);

  return (
    <div className="space-y-8">
      <section  className="flex w-full bg-pink-700 h-52 text-white rounded-br-full items-center   justify-center">
        <div className="font-serif">
          <h1 className="flex justify-center text-3xl font-black w-11/12 text-center">
            {params.system}
          </h1>
        </div>
      </section>

      {isLoading && (
        <section className="flex justify-center pb-32 pt-20">
          <img src={loading} alt="loading" className="w-10 h-10" />
        </section>
      )}


      {(!isLoading && currentSystem!==undefined) && (
        <section className="py-2 font-serif space-y-5 text-slate-800">
          <article className="space-y-1 px-2">
            <h1 className="font-black  text-lg ">{currentSystem.name}</h1>
            <p className="text-medium indent-10">
              {currentSystem.shortDescription}
            </p>
          </article>

          <article className="py-4">
            <img src={currentSystem.image.url} alt={currentSystem.image.alt} />
            <small className="text-xs italic text-gray-800 flex px-1">{currentSystem.image.alt}</small>
          </article>

          <p className="text-medium indent-10 bg-gradient-to-r from-pink-200 to-pink-400 rounded-tr-full rounded-bl-full bg-opacity-[0.2] px-2">
            {currentSystem.fullDescription}
          </p>

          <article>Posts from database</article>

          <article className="bg-pink-700 rounded-tl-full rounded-br-full px-2 bg-opacity-[0.2]">
            <h1 className="font-black text-lg">{params.system} Benefits</h1>

            <ol className="text-sm pl-4 space-y-2">
              {currentSystem &&
                currentSystemFunction &&
                currentSystemFunction.map((system, index) => {
                  return <li key={index}>{system}</li>;
                })}
            </ol>
          </article>
        </section>
      )}
    </div>
  );
};

export default ShowSystems;
