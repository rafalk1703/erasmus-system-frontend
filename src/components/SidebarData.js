import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
  {
    title: 'Lista Umów',
    path: '/contracts',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Koordynatorzy Umów',
    path: '/coordinators',
    icon: <BsIcons.BsPeopleFill />,
    cName: 'nav-text'
  },
  {
    title: 'Kwalifikacja Studentów',
    path: '/qualification',
    icon: <FaIcons.FaUserGraduate />,
    cName: 'nav-text'
  },
  {
    title: 'Lista Edycji',
    path: '/editions',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  }
];