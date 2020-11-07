import React, { useEffect, useState } from 'react';
import '../assets/main.css';
import Header from './Header';
import Footer from './Footer';
import Filters from './Filters';
import Mission from './Mission';
import axios from 'axios';

const App = () => {

    const filtersObj = { launch_success: "", land_success: "", launch_year: "" }

    const [spaceData, setSpaceData] = useState([])
    const [filters, setFilters] = useState(filtersObj)
    const [isLoading, setIsLoading] = useState(true)

    // invoke dynamic api call according to filters
    const getSpaceData = () => {
        let filtersTemp = JSON.parse(JSON.stringify(filters))
        let filterArr = Object.keys(filtersTemp).filter(key => filtersTemp[key])
        let path = "https://api.spacexdata.com/v3/launches?limit=100";

        if (filterArr.length) {
            path = path + filterArr.map(key => `&${key}=${filters[key]}`)
            path = path.replace(/,/g, '');
        }

        axios.get(path)
            .then(res => {
                setSpaceData(res.data)
                setIsLoading(false)
            })
            .catch((error) => {
                // console.log(error)
            });
    }
    useEffect(() => {
        getSpaceData()
    }, [])

    // filter function
    // const filterChangeHandler = (id, value) => {
    //     let filtersTemp = JSON.parse(JSON.stringify(filters))
    //     filtersTemp[id] = value
    //     //this.setState({ filters}, () => this.getSpaceData())
    //     setFilters(filtersTemp)
    //     getSpaceData()

    //     setIsLoading(true)
    // }

    // reset all filter function
    // const resetAllHandler = () => {
    //     let filters = JSON.parse(JSON.stringify(filters))
    //     filters.land_success = "";
    //     filters.launch_success = "";
    //     filters.launch_year = "";
    //     //this.setState({ filters}, () => this.getSpaceData())
    //     setFilters(filters)
    //     getSpaceData()
    //     setIsLoading(true)

    // }

    const filterHandler = (obj) => {
        setFilters(obj)
        setIsLoading(true)
    }

    const resetAllHandler = () => {
        let filtersTemp = JSON.parse(JSON.stringify(filters))
        filtersTemp.land_success = "";
        filtersTemp.launch_success = "";
        filtersTemp.launch_year = "";
        filterHandler(filtersTemp)
    }

    const filterChangeHandler = (id, value) => {
        let filtersTemp = JSON.parse(JSON.stringify(filters))
        filtersTemp[id] = value
        filterHandler(filtersTemp)
    }

    useEffect(() => {
        getSpaceData()
    }, [filters])

    return (
        <div>
            <Header />
            <section>
                <div className="container">
                    <div className="row">
                        <Filters filters={filters} resetAllHandler = {resetAllHandler} filterChangeHandler={filterChangeHandler} filterObjHandler={filterHandler} />
                        <Mission spaceData={spaceData} isLoading={isLoading} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default App;