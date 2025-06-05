import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

/**
 * Autocomplete field for Brazilian cities using IBGE API.
 * Fetches city suggestions as user types and only allows
 * selection of valid cities.
 */
const CityAutocomplete = ({ value = '', onCityChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]); // list of city strings
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const fetchTimeout = useRef(null);

  // Keep input in sync if parent resets the value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Fetch cities from IBGE with debounce
  useEffect(() => {
    if (fetchTimeout.current) {
      clearTimeout(fetchTimeout.current);
    }

    if (inputValue.length < 3) {
      setSuggestions([]);
      setIsLoading(false);
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');

    const controller = new AbortController();
    fetchTimeout.current = setTimeout(() => {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/municipios?nome=${encodeURIComponent(
          inputValue
        )}`,
        { signal: controller.signal }
      )
        .then((res) => {
          if (!res.ok) throw new Error('Erro ao buscar cidades');
          return res.json();
        })
        .then((data) => {
          const filtered = data.filter((c) =>
            c.nome.toLowerCase().includes(inputValue.toLowerCase())
          );
          const mapped = filtered.map((c) => {
            const uf =
              c.microrregiao?.mesorregiao?.UF?.sigla ||
              c['regiao-imediata']?.['regiao-intermediaria']?.UF?.sigla ||
              '';
            return `${c.nome} - ${uf}`;
          });
          setSuggestions(mapped.slice(0, 10));
          setIsLoading(false);
        })
        .catch((err) => {
          if (controller.signal.aborted) return;
          console.error(err);
          setError('Erro ao buscar cidades');
          setIsLoading(false);
        });
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(fetchTimeout.current);
    };
  }, [inputValue]);

  // Handle selection of a city
  const handleSelect = (city) => {
    setInputValue(city);
    setSuggestions([]);
    setHighlightIndex(-1);
    if (onCityChange) onCityChange(city);
  };

  // When typing, clear current selection until a suggestion is chosen
  const handleChange = (e) => {
    setInputValue(e.target.value);
    setHighlightIndex(-1);
    if (onCityChange) onCityChange('');
  };

  // Keyboard navigation for the suggestion list
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) =>
        Math.min(prev + 1, suggestions.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        e.preventDefault();
        handleSelect(suggestions[highlightIndex]);
      }
    }
  };

  return (
    <div className="flex items-start gap-2 relative">
      {/* Icon */}
      <div className="bg-libra-light p-1.5 rounded-full mt-0.5">
        <MapPin className="w-4 h-4 text-libra-blue" />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-libra-navy mb-1">
          Selecione a cidade do imóvel a ser dado de garantia
        </label>
        {/* Input with green border */}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={
            inputValue.length < 3 ? 'Digite 3 ou mais caracteres' : 'Busque a cidade'
          }
          className="text-sm w-full px-3 py-2 rounded-md border-2 border-[#3CB371] focus:outline-none"
        />
        {/* Suggestion dropdown */}
        {inputValue.length >= 3 && (
          <ul className="absolute left-7 right-0 mt-1 max-h-60 overflow-auto rounded-md border border-gray-300 bg-white text-sm shadow-md z-10">
            {isLoading && <li className="px-3 py-2">Buscando...</li>}
            {error && !isLoading && (
              <li className="px-3 py-2 text-red-500">{error}</li>
            )}
            {!isLoading && !error && suggestions.length === 0 && (
              <li className="px-3 py-2">Nenhuma cidade encontrada</li>
            )}
            {!isLoading && !error &&
              suggestions.map((city, index) => (
                <li
                  key={city}
                  onMouseDown={() => handleSelect(city)}
                  onMouseEnter={() => setHighlightIndex(index)}
                  className={`cursor-pointer px-3 py-2 ${
                    index === highlightIndex ? 'bg-gray-200' : ''
                  }`}
                >
                  {city}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CityAutocomplete;
