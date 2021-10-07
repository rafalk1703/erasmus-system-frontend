import React , {useEffect} from 'react'
import { Button } from "react-bootstrap";
import {Link, NavLink} from 'react-router-dom';
import './Navbar2.css';
import $ from 'jquery';
import Cookies from "js-cookie";

const Navbar2 = () => {

  function animation(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {
    
    animation();
    $(window).on('resize', function(){
      setTimeout(function(){ animation(); }, 500);
    });
    
  }, []);

  function logout() {
      Cookies.remove('email');
      Cookies.remove('sessionCode');
  }

  return (
  <nav className="navbar navbar-expand-lg navbar-mainbg">
    
      <NavLink className="navbar-brand navbar-logo" to="/" exact>
        Erasmus System
      </NavLink>
    
    
      <button 
        className="navbar-toggler"
        onClick={ function(){
          setTimeout(function(){ animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
 
      <div 
        className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            
            <li className="nav-item active">
              <NavLink className="nav-link" to="/contracts" exact>
                <i 
                className="fas fa-tachometer-alt">
                </i>Lista Umów
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/coordinators" exact>
                <i 
                className="far fa-address-book">
                </i>Koordynatorzy Umów
              </NavLink> 
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/qualification" exact>
                <i 
                className="far fa-clone">
                </i>Kwalifikacja Studentów
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/editions" exact>
                <i 
                className="far fa-chart-bar">
                </i>Lista Edycji
              </NavLink>
            </li>
        </ul>
      </div>

      { Cookies.get('sessionCode') !== undefined ?
          <div>
              <p style={{color: "white", float: "left", margin: '25px'}}>{Cookies.get('email')}</p>
              <Link to="/logout">
                  <Button variant="secondary" style={{margin: '20px'}} onClick={function(){logout();}}>
                      Wyloguj się!
                  </Button>
              </Link>
          </div>
          : ""
      }
  </nav>
  )
}
export default Navbar2;