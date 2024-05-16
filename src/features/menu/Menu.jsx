import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import { getCat } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import { useState } from 'react';

function Menu() {
  const { menu, categories } = useLoaderData();
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  }
  return (
    <>
      <select
      className="w-full p-2 border border-gray-300 rounded-md" 
      id="selectOption" 
      value={selectedOption}
      onChange={handleSelectChange}>
        <option value="">Filter Your Taste</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} filter={selectedOption} key={pizza.id} />
      ))}
    </ul>
    </>
  );
}

export async function loader() {
  const [menu, categories] = await Promise.all([getMenu(), getCat()]);
  return { menu, categories };
}


export default Menu;
