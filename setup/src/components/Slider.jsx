import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Container } from "react-bootstrap"
import SlideCard from "./SliderCard/SlideCard"
import { SliderData } from "../utils/products"
import Video from "../assets/video.MP4"
const SliderHome = () => {
  const settings = {
    nav:false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }
  return (
      <section className='homeSlide'>
        <div className="bg-video"><video autoPlay muted loop ><source src={require("../assets/video.MP4")} type="video/mp4"/></video></div>
        <div className="center-logo"><img src={require("../assets/nobg-logo.png")} alt="nobg" /></div>
        {/* <Container> */}
          {/* <Slider {...settings}>
          {SliderData.map((value, index) => {
            return (
              <SlideCard key={index} title={value.title} cover={value.cover} desc={value.desc} />
            )
          })}
        </Slider> */}
        {/* </Container> */}
      </section>
  )
}

export default SliderHome
