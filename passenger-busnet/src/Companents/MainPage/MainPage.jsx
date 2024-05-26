import React from 'react';
import './MainPage.css';
import Logo from '../../imgs/logo.png';
import AlmatyImage from '../../imgs/almaty.jpg';
import AstanaImage from '../../imgs/astana.jpeg';
import ShymkentImage from '../../imgs/shymkent.jpg';
import StudentDiscountImage from '../../imgs/student-discount.jpg';
import EarlyBirdImage from '../../imgs/early-bird.jpg';
import {Link} from "react-router-dom";

const topDestinations = [
    { id: 1, name: "Almaty", image: AlmatyImage },
    { id: 2, name: "Astana", image: AstanaImage },
    { id: 3, name: "Shymkent", image: ShymkentImage },
];

const specialOffers = [
    { id: 1, name: "Student Discount", image: StudentDiscountImage },
    { id: 2, name: "Early Bird", image: EarlyBirdImage },
];

const newsUpdates = [
    {
        id: 1,
        title: "New Route Expansion: Exciting News!",
        content: "Our intercity bus service is expanding with a new route connecting Almaty, Kazakhstan, to Bishkek, Kyrgyzstan. Explore new destinations with ease!",
        link: "#",
    },
    {
        id: 2,
        title: "Eco-Friendly Initiatives: Going Green!",
        content: "We're proud to announce our commitment to sustainability. Our fleet is now equipped with eco-friendly buses, reducing our carbon footprint for a more environmentally conscious travel experience.",
        link: "#",
    },
];
const MainPage = () => {
    return (
        <div className="MainPageContainer">
            <div className="MainPageHeader">
                <div className="logo">
                    <img src={Logo} alt="logo"/>
                    <span>
                        Bus<span> Net</span>
                    </span>
                </div>
                <div className="nav-links">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/search">Search Schedules</Link>

                </div>
            </div>
            <div className="MainPageContent">
                <h1>Welcome to the Bus Management System</h1>
                <p>
                    Our bus management system offers comprehensive solutions for bus operations
                    across Kazakhstan. Whether you are a commuter or a bus operator, our system
                    provides all the tools and information you need to ensure a smooth and efficient
                    travel experience.
                </p>

                <h2>Top Destinations</h2>
                <div className="top-destinations">
                    {topDestinations.map(destination => (
                        <div key={destination.id} className="destination-card">
                            <img src={destination.image} alt={destination.name} />
                            <div className="overlay">
                                <div className="textf">{destination.name}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <h2>Special Offers</h2>
                <div className="special-offers">
                    {specialOffers.map(offer => (
                        <div key={offer.id} className="offer-card">
                            <img src={offer.image} alt={offer.name} />
                            <div className="overlay">
                                <div className="textf">{offer.name}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <h2>News/Updates</h2>
                <div className="news-updates">
                    {newsUpdates.map(news => (
                        <div key={news.id} className="news-card">
                            <h3>{news.title}</h3>
                            <p>{news.content}</p>
                            <a href={news.link} className="read-more">Read More</a>
                        </div>
                    ))}
                    <div className="see-all">
                        <a href="#">See All News</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;