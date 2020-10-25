import React from 'react';
import '../assets/main.css';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';


class App extends React.Component {

    state = {
        spaceData: [],
        filters: {
            launch_success: "",
            land_success: "",
            launch_year: ""
        },
        isLoading: true,
    }

    componentDidMount() {
        this.getSpaceData()
    }

    // invoke dynamic api call according to filters
    getSpaceData = () => {
        let filters = JSON.parse(JSON.stringify(this.state.filters))
        let filterArr = Object.keys(filters).filter(key => filters[key])  
        let path = "https://api.spacexdata.com/v3/launches?limit=100";

        if (filterArr.length) {
            path = path + filterArr.map(key => `&${key}=${filters[key]}`)
            path = path.replace(/,/g,''); 
        }

        axios.get(path)
            .then(res => {
                this.setState({ spaceData: res.data, isLoading: false })
            })
            .catch((error) => {
                // console.log(error)
            });
    }

    // filter function
    filterChangeHandler = (id, value) => {
        let filters = JSON.parse(JSON.stringify(this.state.filters))
        filters[id] = value
        this.setState({ filters, isLoading: true }, () => this.getSpaceData())
    }

    // reset all filter function
    resetAllHandler = () => {
        let filters = JSON.parse(JSON.stringify(this.state.filters))
        filters.land_success = "";
        filters.launch_success = "";
        filters.launch_year = "";
        this.setState({ filters, isLoading: true }, () => this.getSpaceData())
    }

    render() {
        return (
            <div>
                <Header />
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2 col-sm-3 mb-2x">
                                <div className="block-style-2 mh">
                                    <h4>Filters</h4>
                                    {Object.values(this.state.filters).some(el => el) &&
                                        <button onClick={() => this.resetAllHandler()} className="reset-all">Reset All</button>
                                    }
                                    <div className="filter-sections">
                                        <div className="heading"><span>Launch Year</span>
                                        {this.state.filters.launch_year &&
                                            <button className="reset" onClick={() => this.filterChangeHandler('launch_year', '')}>Reset</button>
                                        }
                                        </div>
                                        {["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"].map((year, index) => <button className={`${this.state.filters.launch_year == year ? 'isActive' : ''}`} onClick={() => this.filterChangeHandler("launch_year", year)} key={index}>{year}</button>)}

                                    </div>
                                    <div className="filter-sections">
                                    <div className="heading"><span>SuccessFul Launch</span>
                                        {this.state.filters.launch_success &&
                                            <button className="reset" onClick={() => this.filterChangeHandler('launch_success', '')}>Reset</button>
                                        }
                                    </div>
                                        {["true", "false"].map((launch, index) => <button className={`${this.state.filters.launch_success == launch ? 'isActive' : ''}`} onClick={() => this.filterChangeHandler("launch_success", launch)} key={index}>{launch}</button>)}
                                    </div>
                                    <div className="filter-sections">
                                    <div className="heading"><span>SuccessFul landing</span>
                                        {this.state.filters.land_success &&
                                            <button className="reset" onClick={() => this.filterChangeHandler('land_success', '')}>Reset</button>
                                        }
                                    </div>
                                        {["true", "false"].map((land, index) => <button className={`${this.state.filters.land_success == land ? 'isActive' : ''}`} onClick={() => this.filterChangeHandler("land_success", land)} key={index}>{land}</button>)}

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-10 col-sm-9 mb-2x">
                                {this.state.isLoading ?
                                    <div className="pageLoader">
                                        <div className="spinner">
                                            <div className="rect1"></div>
                                            <div className="rect2"></div>
                                            <div className="rect3"></div>
                                            <div className="rect4"></div>
                                            <div className="rect5"></div>
                                        </div>
                                    </div>
                                    :
                                    <div className="row">
                                        {this.state.spaceData.length ?
                                         this.state.spaceData.map((data, index) =>
                                            <div className="col-md-3 col-sm-3 mb-2x" key={index}>
                                                <div className="block-style-1 mh">
                                                    <div className="img-holder"><img src={data.links.mission_patch ? data.links.mission_patch : ""} /></div>
                                                    <h5>{data.mission_name} #{data.flight_number}</h5>
                                                    <div className="mh-id">
                                                        <h6>Mission Ids:</h6>
                                                        <ul>
                                                            <li>{typeof data.mission_id == "object" ? data.mission_id.map(item => item) : "--"}</li>
                                                        </ul>

                                                    </div>
                                                    <div className="ly-details">
                                                        Launch Year: <span>{data.launch_year}</span>
                                                    </div>
                                                    <div className="ly-details">
                                                        Successful Launch: <span>{data.launch_success ? "true" : "false"}</span>
                                                    </div>
                                                    <div className="ly-details">
                                                        SuccessFul Landing: <span>{data.rocket.first_stage.cores[0].land_success ? 'true' : data.rocket.first_stage.cores[0].land_success == false ? "false" : 'No record'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ): <div className="no-data">No Data</div>}
                                    </div> 
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default App;