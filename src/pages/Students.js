import React, { Component } from 'react';
import StudentsList from "../components/StudentsList";
import Cookies from "js-cookie";

class Students extends Component {

    checkCookies() {
        if (Cookies.get('sessionCode') === undefined) {
            window.location.reload();
        }
    }

    render() {
        this.checkCookies();
        return (
            <div className='container'>
                <StudentsList/>
            </div>
        );
    }
}

export default Students;