

export const FahrenheitInput = ({ value,onChange}) => {
  return (
    <div className=" mb-4">
      <label className=" block font-semibold">Fahrenheit:</label>
      <input value={ value} onChange={(e)=> onChange(e.target.value)}
        type="number"
        name="fahrenheit"
        id="fahrenheit"
        placeholder="32 F"
        className="  rounded p-2 w-full"
      />
    </div>
  );
}
