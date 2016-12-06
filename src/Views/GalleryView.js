import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class GalleryView extends Component {
    render() {
        let carRows = this.props.cars.map(car =>
            <div className="carTitle" key={car._id} style={{float: 'left'}}>
                    <h2>{car.title}</h2>
                    <p>{car.description}</p>
                <div>
                    <img  className="img-responsive img-circle"
                          src={car.url} style={{width:'200px', height:'200px', margin:"20px"}} alt=""/>
                </div>
            </div>
        );

        return (
            <div className="cars">
                <h1>Cars</h1>
                <hr/>
                    {carRows}
            </div>
        );
    }
}