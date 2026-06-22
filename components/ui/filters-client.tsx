"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Castle, TreePine, Landmark, Mountain, History, Search, X } from "lucide-react";

interface FiltersClientProps {
  playfair: any;
  regions?: string[];
  onFilterChange?: (filters: any) => void;
}

export default function FiltersClient({ playfair, regions = [], onFilterChange }: FiltersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Состояния для фильтров
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [durationFrom, setDurationFrom] = useState<string>("");
  const [durationTo, setDurationTo] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Загружаем фильтры из URL при первом рендере
  useEffect(() => {
    const regionsParam = searchParams.get('regions');
    const typesParam = searchParams.get('types');
    const durationFromParam = searchParams.get('durationFrom');
    const durationToParam = searchParams.get('durationTo');
    const searchParam = searchParams.get('search');

    if (regionsParam) setSelectedRegions(regionsParam.split(','));
    if (typesParam) setSelectedTypes(typesParam.split(','));
    if (durationFromParam) setDurationFrom(durationFromParam);
    if (durationToParam) setDurationTo(durationToParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [searchParams]);

  // Обновление URL и применение фильтров
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (selectedRegions.length > 0) {
      params.set('regions', selectedRegions.join(','));
    }
    
    if (selectedTypes.length > 0) {
      params.set('types', selectedTypes.join(','));
    }
    
    if (durationFrom) {
      params.set('durationFrom', durationFrom);
    }
    
    if (durationTo) {
      params.set('durationTo', durationTo);
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    router.push(`/community-trips?${params.toString()}`);
    
    if (onFilterChange) {
      onFilterChange({
        regions: selectedRegions,
        types: selectedTypes,
        durationFrom,
        durationTo,
        search: searchQuery
      });
    }
  };

  // Сброс всех фильтров
  const resetFilters = () => {
    setSelectedRegions([]);
    setSelectedTypes([]);
    setDurationFrom("");
    setDurationTo("");
    setSearchQuery("");
    router.push('/community-trips');
    
    if (onFilterChange) {
      onFilterChange({
        regions: [],
        types: [],
        durationFrom: "",
        durationTo: "",
        search: ""
      });
    }
  };

  // Обработчики для чекбоксов
  const handleRegionChange = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Типы туров с иконками
  const tripTypes = [
    { id: 'castles', label: 'Замки и усадьбы', icon: Castle },
    { id: 'nature', label: 'Национальные парки', icon: TreePine },
    { id: 'history', label: 'Исторические места', icon: History },
    { id: 'active', label: 'Активный отдых', icon: Mountain },
    { id: 'culture', label: 'Культурные туры', icon: Landmark },
  ];

  // Регионы Беларуси
  const belarusRegions = regions.length > 0 ? regions : [
    'Минская', 'Брестская', 'Гродненская', 'Витебская', 'Гомельская', 'Могилёвская'
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-8">
      <h2 className={`${playfair.className} text-2xl font-black text-gray-900 mb-6 uppercase`}>
        ФИЛЬТРЫ
      </h2>
      
      {/* Поиск */}
      <div className="mb-6">
        <div className="flex items-center bg-gray-50 rounded-xl px-4 border-2 border-gray-100 focus-within:border-gray-300 transition">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск туров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-3 bg-transparent border-none focus:outline-none text-sm"
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Регионы */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
          Регион
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {belarusRegions.map((region) => (
            <label key={region} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedRegions.includes(region)}
                onChange={() => handleRegionChange(region)}
                className="w-4 h-4 rounded border-2 border-gray-300 checked:bg-gray-900 checked:border-gray-900 focus:ring-0 focus:ring-offset-0"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">
                {region} область
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Тип тура */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
          Тип тура
        </h3>
        <div className="space-y-2">
          {tripTypes.map((type) => {
            const Icon = type.icon;
            return (
              <label key={type.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => handleTypeChange(type.id)}
                  className="w-4 h-4 rounded border-2 border-gray-300 checked:bg-gray-900 checked:border-gray-900 focus:ring-0 focus:ring-offset-0"
                />
                <Icon className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">
                  {type.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Длительность */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
          Длительность (дней)
        </h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="От"
            value={durationFrom}
            onChange={(e) => setDurationFrom(e.target.value)}
            min="1"
            className="w-1/2 px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition"
          />
          <input
            type="number"
            placeholder="До"
            value={durationTo}
            onChange={(e) => setDurationTo(e.target.value)}
            min="1"
            className="w-1/2 px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition"
          />
        </div>
      </div>

      {/* Активные фильтры */}
      {(selectedRegions.length > 0 || selectedTypes.length > 0 || durationFrom || durationTo || searchQuery) && (
        <div className="mb-4 p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 mb-2">Активные фильтры:</p>
          <div className="flex flex-wrap gap-2">
            {selectedRegions.map(region => (
              <span key={region} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                {region}
              </span>
            ))}
            {selectedTypes.map(type => {
              const typeLabel = tripTypes.find(t => t.id === type)?.label;
              return typeLabel && (
                <span key={type} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                  {typeLabel}
                </span>
              );
            })}
            {durationFrom && (
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                от {durationFrom} дн.
              </span>
            )}
            {durationTo && (
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                до {durationTo} дн.
              </span>
            )}
            {searchQuery && (
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                "{searchQuery}"
              </span>
            )}
          </div>
        </div>
      )}

      {/* Кнопки */}
      <button
        onClick={applyFilters}
        className="w-full py-3 bg-gray-900 hover:bg-gray-800 rounded-xl text-sm font-semibold text-white uppercase tracking-wider transition mb-3"
      >
        ПРИМЕНИТЬ
      </button>
      
      <button
        onClick={resetFilters}
        className="w-full py-3 bg-transparent hover:text-gray-700 text-sm font-semibold text-gray-400 uppercase tracking-wider transition"
      >
        СБРОСИТЬ
      </button>
    </div>
  );
}