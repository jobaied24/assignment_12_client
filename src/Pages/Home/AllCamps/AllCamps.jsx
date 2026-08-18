import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import CampCard from '../CampCard/CampCard';
import { FaSearch, FaSortAmountDown } from "react-icons/fa";


const AllCamps = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState("");
    const [search,setSearch] = useState("");
    const [sort,setSort] = useState("registered");
    const [layout,setLayout] = useState("3columns")

    const {data,isLoading,refetch} = useQuery({
        queryKey:['camps',search,sort],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/camps?search=${search}&sort=${sort}`);
            return res.data;
        },
    });

     const camps = data?.result || [];

    console.log(camps);
    console.log(search);
    console.log(sort);

    return (
        <div className=''>
       <div className='text-3xl md:text-4xl text-center mt-3 md:mt-7 mb-1 md:mb-2 font-semibold text-primary'>
        Available Camps
       </div>


{/* search & sort */}
<div className="bg-white rounded-2xl shadow-xs pb-2 md:pb-6 mb-2 px-4 md:px-8 lg:px-12">

<div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-8">

    {/* Search */}
<div className="flex-1">
  <label className="label">
    <span className="label-text font-semibold text-secondary mb-1">
      Search Camps
    </span>
  </label>

  <div className="join w-full">
    <div className="input input-bordered border-2 rounded-l-xl border-blue-200 join-item flex items-center gap-2 w-full">
      <FaSearch className="text-primary" />

      <input
        type="text"
        placeholder="Search by camp, location or healthcare professional..."
        className="grow outline-none"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>

    <button
      className="btn btn-primary rounded-r-xl px-6 join-item"
      onClick={() => setSearch(searchText.trim())}
    >
      <FaSearch />
    </button>
  </div>
</div>
    
    {/* Sort */}
    <div className="md:w-76">
      <label className="label">
        <span className="label-text font-semibold text-secondary mb-1">
          Sort By
        </span>
      </label>

      <label className="select select-bordered border-2 border-blue-200 rounded-xl w-full flex items-center">
        <FaSortAmountDown className="text-primary" />

        <select 
        value={sort}
        onChange={(e)=>setSort(e.target.value)}
        >
          <option value="registered">
            Most Registered
          </option>

          <option value="fees">
            Camp Fees
          </option>

          <option value="alphabetical">
            Alphabetical (A-Z)
          </option>
        </select>
      </label>
    </div>


    {/* change layout */}
{/* Change Layout */}
<div className="md:w-60 hidden md:block">
  <label className="label">
    <span className="label-text font-semibold text-secondary mb-1">
      Layout
    </span>
  </label>

  <button
    onClick={() =>
      setLayout(layout === "3columns" ? "2columns" : "3columns")
    }
    className="btn btn-primary w-full rounded-xl"
  >
    {layout === "3columns"
      ? "Switch to 2 Columns"
      : "Switch to 3 Columns"}
  </button>
</div>
 

  </div>
</div>

        <div className={`grid ${layout === "3columns" ? "md:grid-cols-3" : "md:grid-cols-2" }  grid-cols-1 gap-8 mt-2 md:mt-4 mb-4 md:mb-16 mx-4 md:mx-8 lg:mx-12`}>
            {
                camps.map(camp=><CampCard key={camp._id} camp={camp}></CampCard>)
            }
        </div>
        </div>
    );
};

export default AllCamps;