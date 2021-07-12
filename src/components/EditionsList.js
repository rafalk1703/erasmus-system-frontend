import React, { Component } from 'react';
import { Link } from "react-router-dom";

class EditionsList extends Component {


    render() {
        return (
            <div>
                <h1 className='text-center'>Editions List</h1>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <td>Edition Id</td>
                            <td>Year</td>

                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td> 1 </td>
                            <td> 2020/2021</td>

                        </tr>

                    </tbody>
                </table>

                <Link to="/newEdition">
                    <button type="button">
                        Dodaj nową edycję
                    </button>
                </Link>
            </div>
        );
    }
}

export default EditionsList;