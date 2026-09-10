import { useState, useEffect } from 'react';

interface BcvRateData {
  rate: number;
  lastUpdated: number;
}

const CACHE_KEY = 'bcv-official-rate';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export function useBcvRate() {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: BcvRateData = JSON.parse(cached);
          const now = Date.now();
          
          if (now - parsed.lastUpdated < CACHE_DURATION) {
            setRate(parsed.rate);
            setLoading(false);
            return;
          }
        }

        // Fetch fresh data
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch('https://dolarapi.com/v1/dolares/oficial', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate response structure
        if (typeof data.promedio !== 'number') {
          throw new Error('Invalid response format');
        }
        
        const rateValue = data.promedio;
        setRate(rateValue);
        
        // Cache the result
        const cacheData: BcvRateData = {
          rate: rateValue,
          lastUpdated: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            setError('Timeout al obtener tasa BCV');
          } else {
            setError(`Error: ${err.message}`);
          }
        } else {
          setError('Error desconocido al obtener tasa BCV');
        }
        
        // Try to use cached data as fallback
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsed: BcvRateData = JSON.parse(cached);
            setRate(parsed.rate);
          } catch {
            // Ignore cache parse errors
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, []);

  return { rate, loading, error };
}
