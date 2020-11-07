import React, { useState } from 'react';

const Filters = (props) => {

    //const resetAllHandler = () => {
      //  let filters = JSON.parse(JSON.stringify(props.filters))
        //filters.land_success = "";
        //filters.launch_success = "";
        //filters.launch_year = "";
        //props.filterObjHandler(filters)
    //}

   // const filterChangeHandler = (id, value) => {
     //   let filters = JSON.parse(JSON.stringify(props.filters))
       // filters[id] = value
       // props.filterObjHandler(filters)
   // }

    return (
        <div className="col-md-2 col-sm-3 mb-2x">
            <div className="block-style-2 mh">
                <h4>Filters</h4>
                {Object.values(props.filters).some(el => el) &&
                    <button onClick={() => props.resetAllHandler()} className="reset-all">Reset All</button>
                }
                <div className="filter-sections">
                    <div className="heading"><span>Launch Year</span>
                        {props.filters.launch_year &&
                            <button className="reset" onClick={() => props.filterChangeHandler('launch_year', '')}>Reset</button>
                        }
                    </div>
                    {["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"].map((year, index) => <button className={`${props.filters.launch_year == year ? 'isActive' : ''}`} onClick={() => props.filterChangeHandler("launch_year", year)} key={index}>{year}</button>)}
                </div>
                <div className="filter-sections">
                    <div className="heading"><span>SuccessFul Launch</span>
                        {props.filters.launch_success &&
                            <button className="reset" onClick={() => props.filterChangeHandler('launch_success', '')}>Reset</button>
                        }
                    </div>
                    {["true", "false"].map((launch, index) => <button className={`${props.filters.launch_success == launch ? 'isActive' : ''}`} onClick={() => props.filterChangeHandler("launch_success", launch)} key={index}>{launch}</button>)}
                </div>
                <div className="filter-sections">
                    <div className="heading"><span>SuccessFul landing</span>
                        {props.filters.land_success &&
                            <button className="reset" onClick={() => props.filterChangeHandler('land_success', '')}>Reset</button>
                        }
                    </div>
                    {["true", "false"].map((land, index) => <button className={`${props.filters.land_success == land ? 'isActive' : ''}`} onClick={() => props.filterChangeHandler("land_success", land)} key={index}>{land}</button>)}

                </div>
            </div>
        </div>
    )
}

export default Filters