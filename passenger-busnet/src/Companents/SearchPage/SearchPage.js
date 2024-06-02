import React, { useState } from 'react';
import './SearchPage.css';
import axios from 'axios';
import Logo from '../../imgs/logo.png';
import {Link} from "react-router-dom";

const SearchPage = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [timeFilter, setTimeFilter] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8080/api/schedules', {
                params: { origin, destination, date }
            });
            if (response.data.length === 0) {
                setErrorMessage('No routes found for selected date, origin, and destination');
            } else {
                let filteredSchedules = response.data;
                if (priceFilter) {
                    filteredSchedules = filteredSchedules.filter(schedule => schedule.price <= parseInt(priceFilter));
                }
                if (timeFilter) {
                    filteredSchedules = filteredSchedules.filter(schedule => schedule.time <= timeFilter);
                }
                filteredSchedules.sort((a, b) => a.price - b.price); // Sort by price
                // If you want to sort by time, convert time to a comparable format (e.g., milliseconds since midnight) and then sort.
                // For simplicity, I assume the time is stored as a number of milliseconds since midnight.
                filteredSchedules.sort((a, b) => a.time - b.time); // Sort by time
                setSchedules(filteredSchedules);
            }
        } catch (error) {
            console.error('Error fetching schedules', error);
            setErrorMessage('An error occurred while fetching schedules');
        }
    };

    return (
        <div className="SearchPageContainer">
            <div className="SearchPageHeader">
                <div className="logo">
                    <img src={Logo} alt="logo"/>
                    <span>
                        Bus<span> Net</span>
                    </span>
                </div>
                <div className="nav-links">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/">Main Page</Link>

                </div>
            </div>
            <h1>Search Bus Schedules</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                />
                <div className="datetime-inputs">
                    <input
                        type="date"
                        placeholder="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />

                </div>
                <input
                    type="number"
                    placeholder="Max Price"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Time"
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="results-container">
                {schedules.map(schedule => (
                    <div key={schedule.id} className="result-card">
                        <h3>{schedule.origin} to {schedule.destination}</h3>
                        <p>Date: {schedule.date}</p>
                        <p>Time: {schedule.time}</p>
                        <p>Price: {schedule.price} ₸</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
