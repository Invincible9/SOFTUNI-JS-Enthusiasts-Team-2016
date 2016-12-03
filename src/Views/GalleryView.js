import React, { Component } from 'react';

export default class GalleryView extends Component {
    render() {
        let carRows = this.props.cars.map(car =>
            <tr key={car._id} style={{float: 'left'}}>

                    <h2>{car.title}</h2>
                    {car.description}

                <td><img  src={car.url} style={{width:'200px', height:'200px', margin:"20px"}}/></td>

            </tr>
        );

        return (
            <div>
                <h1>Cars</h1>
                <hr/>
                <table>
                    <tbody>
                    {carRows}
                    </tbody>
                </table>

            </div>


        );
    }


}