import React from 'react'
import Profile from './Profile';

const Home = (props) => {


    return (
        <Profile showAlert={props.showAlert} />

    )
}

export default Home;