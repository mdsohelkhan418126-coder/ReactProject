

export const FahrenheitInput = () => {
  return (
    <div className=" mb-4">
      <label className=" block font-semibold">Fahrenheit:</label>
      <input
        type="number"
        name="fahrenheit"
        id="fahrenheit"
        placeholder="32 F"
        className="  rounded p-2 w-full"
      />
    </div>
  );
}
