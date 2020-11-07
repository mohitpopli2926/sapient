import React, { Component } from 'react';

const Missions = (props) => {

        return (
            <div className="col-md-10 col-sm-9 mb-2x">
                {props.isLoading ?
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
                        {props.spaceData.length ?
                            props.spaceData.map((data, index) =>
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
                                        SuccessFul Landing: <span>{data.rocket.first_stage.cores[0].land_success ? 'true' : data.rocket.first_stage.cores[0].land_success === false ? "false" : 'No record'}</span>
                                    </div>
                                </div>
                            </div>
                        ): <div className="no-data">No Data</div>}
                    </div> 
                }
            </div>
        )
    }

export default Missions