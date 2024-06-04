import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from 'axios';

const Shop = () => {
const [data,setData] = useState([])
const [filterList, setFilterList] = useState("");
const [searchItem,setSearchItem] = useState("");
 useEffect(()=>{ 
  
  if(!filterList && !searchItem){
  axios.get('http://localhost:5000/getItems').then((res) => {
      if (res.data.status === true) {

          setData(res.data.data.Items);
          console.log(res.data.data.Items);
        
      } else {
          // toast.error(res.data.error);
      }
  })
  .catch((error) => {
      console.error('Error:', error);
      // toast.error('An error occurred. Please try again later.');
  });}
  // if(searchItem){
  //   window.scroll(0,250)
  //   console.log(searchItem);
  //   axios.post('http://localhost:5000/search',{searchItem:searchItem}).then((res) => {
  //     console.log(res.data.data.Items.length);
  //     if (res.data.status === true) {
  //         setData(res.data.data.Items);
        
  //     }
  //     if(res.data.data.Items.length==0) {
  //         // toast.error(res.data.error);
  //         setData("")
  //     }
  // })
  // .catch((error) => {
  //     console.error('Error:', error);
  //     // toast.error('An error occurred. Please try again later.');
  // });
  // }
  else{
    axios.post('http://localhost:5000/getCategoryItems',{category:filterList}).then((res) => {
      console.log(res.data);
      if (res.data.status === true) {
          setData(res.data.data.Items);
        
      } else {
          // toast.error(res.data.error);
      }
  })
  .catch((error) => {
      console.error('Error:', error);
      // toast.error('An error occurred. Please try again later.');
  });

  }
  },[filterList,searchItem]);
  useEffect(()=>{
    window.scroll(0,250)
    console.log(searchItem);
    axios.post('http://localhost:5000/search',{searchItem:searchItem}).then((res) => {
      if (res.data.status === true) {
          setData(res.data.data.Items);
        
      }
      if(res.data.data.Items.length==0) {
          // toast.error(res.data.error);
          setData("")
      }
  })
  .catch((error) => {
      console.error('Error:', error);
      // toast.error('An error occurred. Please try again later.');
  });
  },[searchItem])

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title="Our Featured Products" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} />
            </Col>
            <Col md={8}>
              <SearchBar setSearchItem={setSearchItem} />
            </Col>
          </Row>
        </Container>
        <Col md={12}>
          <ShopList productItems={data} />
        </Col>
      </section>
    </Fragment>
  );
};

export default Shop;
