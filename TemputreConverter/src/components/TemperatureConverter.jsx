import { useState } from 'react';
import { CelsiusInput } from './CelsiusInput';
import { FahrenheitInput } from './FahrenheitInput';

export const TemperatureConverter = () => {
  const [temperature, setTemperature] = useState({
    celsius: '',
    fahrenheit: '',
  });

  const handleCelsiusChange = value => {
    const celsius = Number.parseFloat(value);
    const fahrenheit = Number.isNaN(celsius)
      ? ''
      : ((celsius * 9) / 5 + 32).toFixed(2);

    setTemperature({
      celsius: value,
      fahrenheit,
    });
  };

  const handleFahrenheitChange = value => {
    const fahrenheit = Number.parseFloat(value);
    const celsius = Number.isNaN(fahrenheit)
      ? ''
      : ((fahrenheit - 32) * 5) / 9;

    setTemperature({
      celsius: Number.isNaN(celsius) ? '' : celsius.toFixed(2),
      fahrenheit: value,
    });
  };

  return (
    <div className="max-w-md rounded bg-white mx-auto mt-10 p-4 border-gray-900 shadow-lg">
      <h1 className="text-2xl font-bold">TemperatureConverter</h1>
      <CelsiusInput value={temperature.celsius} onChange={handleCelsiusChange} />
      <FahrenheitInput value={temperature.fahrenheit} onChange={handleFahrenheitChange} />
    </div>
  );
};
