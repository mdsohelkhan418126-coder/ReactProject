 export function Responding() {
  function handleClick() {
    alert('You clicked me!');
  }

  return <button className=" bg-blue-700 rounded-3xl p-5 m-5" onClick={handleClick}>Click me</button>;
}