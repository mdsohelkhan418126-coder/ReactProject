

export const CelsiusInput = ({ value,onChange}) => {
  return (
    <div className=" mb-4">
    <label className=" block font-semibold">Celsius:</label>
    <input value={ value} onChange={(e)=>onChange(e.target.value)} type="number"name="celcsius" id='celsius'placeholder="0 C" className="  rounded p-2 w-full" />
    </div>
  )
}
