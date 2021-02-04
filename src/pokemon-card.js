import React, { useState, useEffect } from 'react';

function PokemonCard({
    link
}) {

    const [cardInfo, setCardInfo] = useState(null);
    const [isBioVisible, setIsBioVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await fetch(link);
            const data = await result.json();
            setCardInfo(data);
        })();
    }, []);

    function flipToBio() {
        setIsBioVisible(true);
        setTimeout(() => setIsBioVisible(false), 5000);
    }

    return (
        cardInfo &&
        <div className="w-60 border-black border-2 text-white flex flex-col flex-shrink-0 m-4 xs:m-16">
            <header className="h-8 w-full bg-red-600 p-1 flex flex-row justify-between italic text-2xl items-center">
                <span>#{cardInfo.id}</span>
                <span className="tracking-widest">{cardInfo.name}</span>
            </header>
            <div className="hidden xs:flex h-72 flex-grow flex-col items-center p-4 bg-gray-100 justify-between">
                <img className="w-44 h-44 border-2 border-red-600" src={cardInfo.sprites.other.dream_world.front_default} alt="" />
                {
                    isBioVisible ?
                        <div className="flex flex-row text-sm space-x-4">
                            <span className="bg-blue-400 p-0.5">Height: {cardInfo.height}</span>
                            <span className="bg-blue-400 p-0.5">Weight: {cardInfo.weight}</span>
                        </div>
                        :
                        <div className="flex flex-row text-sm space-x-4">
                            {
                                cardInfo.types.map((type, i) => <span className="bg-green-400 p-0.5" key={i}>{type.type.name.toUpperCase()}</span>)
                            }
                        </div>
                }
                <button className="bg-red-600 p-1.5 text-xs italic font-extralight focus:outline-none shadow-custom" onClick={flipToBio}>FLIP TO BIO</button>
            </div>
        </div>
    );
}

export default PokemonCard;
