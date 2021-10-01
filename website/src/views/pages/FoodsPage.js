import React, {Fragment, useEffect, useState} from "react";

// reactstrap components
import {
    Button,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
} from "reactstrap";
import Popup from 'reactjs-popup';

// core components
import RestaurantPageHeader from "components/Headers/RestaurantPageHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import IndexHeader from "../../components/Headers/IndexHeader";
import RoomsHeader from "../../components/Headers/RoomsHeader";
import axios from "axios";
import {useLocation} from "react-router-dom";
import FoodPageHeader from "../../components/Headers/FoodPageHeader";

function FoodsPage() {
    const [firstFocus, setFirstFocus] = useState(false);
    const [lastFocus, setLastFocus] = useState(false);

    const location = useLocation();
    const data = location.state;

    const [foods,setFoods] = useState([]);

    useEffect(() => {
        document.body.classList.add("landing-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("landing-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/foods').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.foods);
                setFoods(response.data.foods.map((item) => ({
                    id: item._id,
                    foodName: item.foodName,
                    price: item.price,
                    restaurantType: item.restaurantType,
                    description: item.description,
                    image: item.image,
                })));
                setFoods(response.data.foods);
                setTimeout(() => console.log(foods.length),5000)
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })

        console.log("datas",data);
    },[])

    return (
        <>
            <IndexNavbar />
            <div className="wrapper">
                <FoodPageHeader restaurantName={data.restaurant} />
                <div className="section section-about-us">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="60">
                                <h2 className="title">Food Menus</h2>
                                <div className={'container'}>
                                    {foods.length > 0 && foods.map((item,index)=>{
                                        if(item.restaurantType === data.restaurant){
                                        return(
                                            <Fragment key={index}>
                                                <div className="card" style={{
                                                    width: "20rem",
                                                    margin: "25px 25px 25px 25px",
                                                }} >
                                                    <img className="card-img-top" src={'http://localhost:8080/uploads/'+item.image}  alt="Food image"/>
                                                    <div className="card-body">
                                                        <p className="card-text">{item.foodName}</p>
                                                    </div>
                                                    <div className="card-body">
                                                        <p className="card-text">Rs. {item.price}.00</p>
                                                    </div>
                                                    <div className="card-body">
                                                        {/*<p className="card-text">{item.description}</p>*/}
                                                        {/*<Button
                                                            style={{
                                                                float: 'center',
                                                                marginTop: '10px',
                                                                backgroundColor: '#5a2360',
                                                                fontFamily: 'Josefin Sans'
                                                            }}
                                                            type = "submit"
                                                        >
                                                            View more
                                                        </Button>*/}
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )}
                                    })}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <TransparentFooter/>
            </div>
        </>
    );
}

export default FoodsPage;