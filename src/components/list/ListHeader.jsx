import React,{useContext,useEffect} from "react";
import { ListViewHeader } from '@progress/kendo-react-listview';
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { LinkContext } from "../contexts/LinkContext";


const ListHeader = () => {
    const list = ["Most Voted(Z->A)", "Less Voted(A->Z)"];
    const {links}=useContext(LinkContext)
    let newList=links;

    const handleChange = (event) => {
      switch(event.target.value){
        case "Less Voted(A->Z)": 
          sortAscending();
          break;
        case "Most Voted(Z->A)":
          sortDescending();
          break;
        default:
          break;
      }
    window.location.reload()
  }

  const sortAscending = () => {
    newList=links.sort((a, b) =>a.point -b.point)    
    localStorage.setItem("links", JSON.stringify(newList));
  }

  const sortDescending = () => {
    newList=links.sort((a, b) => b.point - a.point)
    localStorage.setItem("links", JSON.stringify(newList));
  }

  useEffect(()=>{
    localStorage.setItem('links',JSON.stringify(newList));
  },[links])

    return (
      <ListViewHeader style={{ color: "rgb(160, 160, 160)", fontSize: 14 }} className="pl-4 pb-2 pt-2">
       <DropDownList data={list} defaultValue="Order By" onChange={handleChange} />
      </ListViewHeader>
    );
  };

  export default ListHeader;
  