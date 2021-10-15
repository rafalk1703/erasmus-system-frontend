import React, { Component } from 'react';
import StudentsList from "../components/StudentsList";

class Students extends Component {
    render() {
        return (
            <div className='container'>
                <StudentsList/>
            </div>
        );
    }
}

export default Students;