import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';
import { useEffect, useState } from 'react';

function Header() {
const [table, setTable] = useState('1');
const [where, setWhere] = useState(1);

  useEffect(()=>{
    const table = JSON.parse(localStorage.getItem('table'));
    const where = JSON.parse(localStorage.getItem('where'));
    setTable(table)
    setWhere(where)
  },[])

  return (
    <>
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to={`/${table}/${where}`} className="tracking-widest">
        OH Ten Spoon
      </Link>

      <SearchOrder />
      <Username />
    </header>
    </>
  );
}

export default Header;
