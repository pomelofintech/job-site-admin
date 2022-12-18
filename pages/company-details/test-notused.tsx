import React from "react";
import Select from "react-select";

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "China", label: "China" },
    { value: "India", label: "India" },
    { value: "United States", label: "United States" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Brazil", label: "Brazil" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Russia", label: "Russia" },
    { value: "Mexico", label: "Mexico" },
    { value: "Japan", label: "Japan" },
    { value: "Philippines", label: "Philippines" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Egypt", label: "Egypt" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "DR Congo", label: "DR Congo" },
    { value: "Iran", label: "Iran" },
    { value: "Germany", label: "Germany" },
    { value: "Turkey", label: "Turkey" },
    { value: "France", label: "France" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Thailand", label: "Thailand" },
    { value: "Italy", label: "Italy" },
    { value: "South Africa", label: "South Africa" },
    { value: "Tanzania", label: "Tanzania" },
    { value: "Myanmar", label: "Myanmar" },
    { value: "South Korea", label: "South Korea" },
    { value: "Colombia", label: "Colombia" },
    { value: "Kenya", label: "Kenya" },
    { value: "Spain", label: "Spain" },
    { value: "Argentina", label: "Argentina" },
    { value: "Algeria", label: "Algeria" },
    { value: "Sudan", label: "Sudan" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "Uganda", label: "Uganda" },
    { value: "Iraq", label: "Iraq" },
    { value: "Poland", label: "Poland" },
    { value: "Canada", label: "Canada" },
    { value: "Morocco", label: "Morocco" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Peru", label: "Peru" },
    { value: "Angola", label: "Angola" },
    { value: "Ghana", label: "Ghana" },
    { value: "Mozambique", label: "Mozambique" },
    { value: "Nepal", label: "Nepal" },
    { value: "Yemen", label: "Yemen" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Ivory Coast", label: "Ivory Coast" },
    { value: "Madagascar", label: "Madagascar" },
    { value: "Australia", label: "Australia" },
    { value: "North Korea", label: "North Korea" },
    { value: "Taiwan", label: "Taiwan" },
    { value: "Niger", label: "Niger" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "Mali", label: "Mali" },
    { value: "Chile", label: "Chile" },
    { value: "Romania", label: "Romania" },
    { value: "Malawi", label: "Malawi" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Zambia", label: "Zambia" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "Syria", label: "Syria" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Senegal", label: "Senegal" },
    { value: "Chad", label: "Chad" },
    { value: "Somalia", label: "Somalia" },
    { value: "Zimbabwe", label: "Zimbabwe" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "South Sudan", label: "South Sudan" },
    { value: "Rwanda", label: "Rwanda" },
    { value: "Guinea", label: "Guinea" },
    { value: "Benin", label: "Benin" },
    { value: "Haiti", label: "Haiti" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Belgium", label: "Belgium" },
    { value: "Burundi", label: "Burundi" },
    { value: "Cuba", label: "Cuba" },
    { value: "Jordan", label: "Jordan" },
    { value: "Greece", label: "Greece" },
    { value: "Czech Republic", label: "Czech Republic" },
    { value: "Dominican Republic", label: "Dominican Republic" },
    { value: "Sweden", label: "Sweden" },
    { value: "Portugal", label: "Portugal" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "Hungary", label: "Hungary" },
    { value: "Belarus", label: "Belarus" },
    { value: "Tajikistan", label: "Tajikistan" },
    { value: "Honduras", label: "Honduras" },
    { value: "Israel", label: "Israel" },
    { value: "Papua New Guinea", label: "Papua New Guinea" },
    { value: "Austria", label: "Austria" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Sierra Leone", label: "Sierra Leone" },
    { value: "Togo", label: "Togo" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Laos", label: "Laos" }
  ];


const SELECT_VALUE_KEY = "MySelectValue";



export default function MySelect() {
  const [selected, setSelected] = React.useState([]);
  const handleChange = (s) => {
    localStorage.setItem(SELECT_VALUE_KEY, JSON.stringify(s));
    setSelected(s);
  };

  React.useEffect(() => {
    const lastSelected = JSON.parse(
      localStorage.getItem(SELECT_VALUE_KEY) ?? "[]"
    );
    setSelected(lastSelected);
  }, []);

  return (
    <Select
      value={selected}
      onChange={handleChange}
      options={options}
      isMulti
    />
  );
}