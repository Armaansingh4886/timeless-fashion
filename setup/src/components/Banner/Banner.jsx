import { Col, Container, Row } from "react-bootstrap";
import productBg from "../../assets/banner.jpg";
import "./banner.css";
const Banner = ({title}) => {
    return ( 
        <div className="image-container bannner-container">
            <img src={productBg} alt="Product-bg" />
            <div className="overlay">
                <Container>
                    <Row>
                        <Col>
                            <p>{title}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Banner;