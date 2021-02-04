import React from 'react';
import { useInfiniteQuery } from 'react-query';
import PokemonCard from './pokemon-card';

function App() {

  async function fetchPokemonBatch({ pageParam = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0" }) {
    const result = await fetch(pageParam);
    return result.json();
  }

  function handleScroll({ target }) {
    const isPageBottom = (target.scrollHeight - target.scrollTop) === target.clientHeight;
    if (isPageBottom) fetchNextPage();
  }

  const {
    data,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery('pokemons', fetchPokemonBatch, {
    getNextPageParam: (lastPage, pages) => pages[pages.length - 1].next
  });

  return (
    <div className="h-full flex flex-col items-center">
      <div className="h-full flex flex-row flex-wrap justify-around px-24 py-16 xs:py-0 overflow-y-auto" onScroll={handleScroll}>
        {
          data && data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {
                group.results.map(pokemonInfo => (
                  <PokemonCard link={pokemonInfo.url} key={pokemonInfo.url} />
                ))
              }
            </React.Fragment>
          ))
        }
      </div>
      {
        isFetchingNextPage && <span className="text-4xl pb-4">Loading more...</span>
      }
    </div>
  );
}

export default App;
