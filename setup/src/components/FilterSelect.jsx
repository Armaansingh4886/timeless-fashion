import Select from 'react-select';
import { products } from '../utils/products';

const options = [
   

{ value:"Salwar Kameez",label:"Salwar Kameez" },
{ value:"Casual wear",label:" Casual wear" },
{ value:"Party Wear",label:" Party Wear" },
{ value:"Bridal wear",label:" Bridal Wear" },
{ value:"Pakistani Suits",label:" Pakistani Suits" },
{ value:"Anarkali Suits",label:" Anarkali Suits" },
{ value:"Straight salwar",label:" Straight Salwar" },
{ value:"Kurta with plazo",label:" Kurta with plazo" },
{ value:"Kurtas",label:"Kurtas" },
{ value:"Embroidered Suits",label:"Embroidered Suits" },
{ value:"Sharara Suits",label:"Sharara Suits" },
{ value:"Haldi Dresses",label:"Haldi Dresses" },
{ value:"Mehndi Outfits",label:"Mehndi Outfits" }
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
        backgroundColor: "#0f3460",
        color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({setFilterList}) => {
    const handleChange = (selectedOption)=> {
        setFilterList(selectedOption.value)
    }
    return (
    <Select
    options={options}
    defaultValue={{ value: "", label: "Filter By Category" }}
    styles={customStyles}
    onChange={handleChange}
    />
    );
};

export default FilterSelect;
