import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel3';
import TopSearch from './home/TopSearch';
import SectionHeading from './common/SectionHeading';
import FontAwesome from './common/FontAwesome';
import ReviewCard from './ReviewCard/index';
import Image1 from '../assets/Bloggers/1.jpg';
import Image2 from '../assets/Bloggers/2.jpg';
import Image3 from '../assets/Bloggers/3.jpg';
import Image4 from '../assets/Bloggers/4.jpg';
import Image5 from '../assets/Bloggers/5.jpg';
import Image6 from '../assets/Bloggers/6.jpg';
import Image7 from '../assets/Bloggers/7.jpg';
import Image8 from '../assets/Bloggers/8.jpg';
import Image9 from '../assets/Bloggers/9.jpg';
import Image10 from '../assets/Bloggers/10.jpg';
import Image11 from '../assets/Bloggers/11.jpg';

function Index(props) {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        setReviews([
            {
                photoURL: Image1,
                profile_link: 'https://www.instagram.com/ap_fooddiaries/',
                review:
                    'Biryani - It was really good. It has 4-5 large pieces of chicken. Well cooked, flavourful, aromatic & less oily biryani. Give it a try.👍',
                username: 'ap_fooddiaries',
                rating: 4.5,
            },
            {
                photoURL: Image2,
                profile_link: 'https://www.instagram.com/hungrie_young_man/',
                review:
                    '🌟They sent me some of their best dishes which included Chicken Biryani, Chicken Hyderabadi and Mushroom 65. The food came with another package which included paper handkerchief, spoons, sanitizer & ketchup.',
                username: 'Bhaskar Raha',
                rating: 4.7,
            },
            {
                photoURL: Image3,
                profile_link: 'https://www.instagram.com/hunger_triggers',
                review:
                    'Had 4 medium-sized chicken pieces. Absolutely my type of Biryani- not so oily, flavourful and enough for 2. CHICKEN MASALA The curry was so good that I had them without any rice or roti 🙈. So creamy and so rich in flavours.iaries',
                username: 'Banditaaaa',
                rating: 4.3,
            },
            {
                photoURL: Image4,
                profile_link: 'https://www.instagram.com/jas_tronomy',
                review:
                    'The Chicken Biryani came with a good quantity and had balanced flavours which was not too spicy(which is loved by many).Chicken Dopiaza had fair amount of pieces. The taste was amazing the way it should be.',
                username: 'JASTRONOMY',
                rating: 4.8,
            },
            {
                photoURL: Image5,
                profile_link: 'https://www.instagram.com/food_and_them_',
                review:
                    'The Biryani Had an Amazing Blend of The Taste and Was Perfectly Flavoured.Chicken Punjabi (Most Recommended) One of the Best Flavoured Gravy Tasted in Recent Time. The Gravy was Creamy and Had a Perfect Amount of Spices.',
                username: 'Dr. Jagruti',
                rating: 4.5,
            },
            {
                photoURL: Image6,
                profile_link: 'https://www.instagram.com/_foodie_me_pratikshya',
                review:
                    'FOOD DUDE has taken an initiative to provide High Quality Food made with utmost Hygiene and Safety . With good quality ingredients and Reasonable Prices Fooddude strives to provide the best for the People in Bhubaneswar .',
                username: 'Pratikshya Routray',
                rating: 4.6,
            },
            {
                photoURL: Image7,
                profile_link: 'https://www.instagram.com/thatfoodieartist',
                review:
                    '🔥Food Dude is an initiative borne out of a gaping hole of quality existing in the online food ordering space right now. Being founded by youngsters like ourselves, It strives to cater to the palette of each and everyone.',
                username: 'Subhra Saswati',
                rating: 4.8,
            },
            {
                photoURL: Image8,
                profile_link: 'https://www.instagram.com/foodishah',
                review:
                    'Chicken Punjabi was too delicious and plus point was the masala which had perfect flavours to it.Mushroom 65 was delicious and perfect for starter dish. Mushroom was perfectly coated, deep-fried and tempered with curry leaves.',
                username: 'Foodishah',
                rating: 4.5,
            },
            {
                photoURL: Image9,
                profile_link: 'https://www.instagram.com/being_foodie_boy',
                review:
                    'Frankly, I found the Biryani to be a regular one. Chicken pieces were soft and succulent. Quantity is sufficient for two people.I personally loved this dish, BLOCKBUSTER DISH. (Highly recommended) ',
                username: 'THEFOODIEBOY',
                rating: 4.9,
            },
            {
                photoURL: Image10,
                profile_link: 'https://www.instagram.com/cravings',
                review:
                    'We Food Dude actually packaged each and every item really well. The food was packed in quality containers with their logo on it. The Chicken Biriyani had ample quantity in it, with good chicken pieces.',
                username: '__.cravings.__',
                rating: 4.7,
            },
            {
                photoURL: Image11,
                profile_link: 'https://www.instagram.com/foodies_of_bhubaneswar',
                review:
                    'I really loved the chili paneer & chicken Kassa . Perfect match with naan or Roti.And Packaging is too good pre-equiped with sanitizer sachets. Must say tottaly statisfying. ',
                username: 'Foodies of Bhubaneswar',
                rating: 4.4,
            },
        ]);
    }, []);

    return (
        <>
            <TopSearch />
            <div className="food-background">
                <section className="section pt-5 pb-5 homepage-add-section ">
                    <SectionHeading heading="Our Motto" subHeading="" />
                    <div className="container">
                        <div className="rows row_motto">
                            <div className="cols col_motto">
                                <blockquote
                                    class="blockquote blockquote-custom  p-5 shadow rounded card_moto"
                                    style={{
                                        height: '280px',
                                        background: '#f0f0f0',
                                    }}
                                >
                                    <div class="blockquote-custom-icon bg-info shadow-sm">
                                        <i class="fa fa-quote-left text-white"></i>
                                    </div>
                                    <h4 className="mb-2 font-weight-normal">
                                        <span className="font-weight-bold">Affordability</span>
                                    </h4>
                                    <p class="mb-0 mt-2 font-italic">
                                        "The tastiest food doesn't have to be the costliest. In these tough times, it
                                        may be very hard for us to spend every time we crave something delicious.
                                        Fooddude promises to be the most affordable option you have to satisfy your
                                        hunger."
                                    </p>
                                </blockquote>
                            </div>
                            <div className="cols col_motto">
                                <blockquote
                                    class="blockquote blockquote-custom  p-5 shadow rounded card_moto"
                                    style={{
                                        height: '280px',
                                        background: '#f0f0f0',
                                    }}
                                >
                                    <div class="blockquote-custom-icon bg-info shadow-sm">
                                        <i class="fa fa-quote-left text-white"></i>
                                    </div>
                                    <h4 className="mb-2 font-weight-normal">
                                        <span className="font-weight-bold">Quality</span>
                                    </h4>
                                    <p class="mb-0 mt-2 font-italic">
                                        "Fooddude provides you the best food ranging from several cuisines from the best
                                        kitchens throughout the city. We assure you of satisfying your palette minus the
                                        food colours and unnecessary oil."
                                    </p>
                                </blockquote>
                            </div>
                            <div className="cols col_motto">
                                <blockquote
                                    class="blockquote blockquote-custom  p-5 shadow rounded card_moto"
                                    style={{
                                        height: '280px',
                                        background: '#f0f0f0',
                                    }}
                                >
                                    <div class="blockquote-custom-icon bg-info shadow-sm">
                                        <i class="fa fa-quote-left text-white"></i>
                                    </div>
                                    <h4 className="mb-2 font-weight-normal">
                                        <span className="font-weight-bold">Hygiene</span>
                                    </h4>
                                    <p class="mb-0 mt-2 font-italic">
                                        "The pandemic has forced us to rethink our sanitary practices. But, Fooddude
                                        promises that you'll never have to think twice while ordering from us. Our
                                        delivery agents are checked and sanitized regularly and use masks and gloves
                                        throughout the process to ensure your food reaches to you safely."
                                    </p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section pt-5 pb-5 products-section">
                    <Container>
                        <SectionHeading
                            heading="FoodBloggers Reviews!"
                            subHeading="All of the smiles in our heart...."
                        />
                        <Row>
                            <Col md={12}>
                                <OwlCarousel nav {...options} className="owl-carousel-four owl-theme">
                                    {reviews.map((ele, i) => (
                                        <ReviewCard {...ele} key={i} />
                                    ))}
                                </OwlCarousel>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section
                    className="section pt-5 pb-5  becomemember-section border-bottom "
                    style={{ marginTop: '-70px' }}
                >
                    <Container>
                        <SectionHeading heading="Join The Family" subHeading="" />
                        <Row>
                            <Col sm={12} className="text-center">
                                <Link to="/detail" className="btn btn-success btn-lg">
                                    Check Menu <FontAwesome icon="chevron-circle-right" />
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    );
}

const options = {
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 3,
        },
        1200: {
            items: 3,
        },
    },

    lazyLoad: true,
    pagination: false.toString(),
    loop: false,
    rewind: true,
    dots: false,
    autoplay: true,
    autoPlay: 1000,
    nav: true,
    autoplayHoverPause: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
};

export default Index;
