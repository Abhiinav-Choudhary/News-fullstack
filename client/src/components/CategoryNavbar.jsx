import { Link } from "react-router-dom";

import categories from "../constants/categories";

function CategoryNavbar() {

  return (

    <div className="flex gap-3 overflow-x-auto p-4 border-b">

      {categories.map((category) => (

        <Link
          key={category}
          to={`/category/${category}`}
          className="bg-black text-white px-4 py-2 rounded-full whitespace-nowrap capitalize"
        >

          {category}

        </Link>

      ))}

    </div>
  );
}

export default CategoryNavbar;