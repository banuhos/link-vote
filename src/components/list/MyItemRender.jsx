import React,{useState,useContext} from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Card, CardTitle, CardSubtitle, CardActions } from '@progress/kendo-react-layout';
import {LinkContext} from "../contexts/LinkContext";
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import {toast} from "react-toastify";

toast.configure();
const updateLinks=({item},count)=>{
  var links = JSON.parse(localStorage.links);  
  for (var i = 0; i < links.length; i++) {
    if(item.id === links[i].id){  
      links[i].point =count;  
      break;  
    }
  }
  const newList=links.sort((a, b) =>b.point - a.point);  
  localStorage.setItem("links", JSON.stringify(newList));
  window.location.reload();
}

const MyItemRender = props => {
    let item = props.dataItem;
    const {dispatch} = useContext(LinkContext);
    const[visible,setVisible]=useState(false);
  
    const upVote=({item})=>{
      updateLinks({item},item.point-1);
    }

    const downVote=({item})=>{
      updateLinks({item},item.point+1);
    }

    const removeLink=({item})=>{
      setVisible(!visible);
      dispatch({type:'REMOVE_LINK',id:item.id});
      toast.success(item.name.toUpperCase()+" removed.",{position: toast.POSITION.TOP_CENTER})
    }

    const toggleDialog=()=> {
      console.log(!visible)
     setVisible(!visible);
  }
    return  (
     
      <Card
        style={{
          padding: "20px 24px",
          border: "none",
          borderBottom: "1px solid rgba(0,0,0,0.12)"
        }}
        orientation="horizontal"
        className="d-flex justify-content-between"
      >
        <Card style={{ width: 100, height: 100, borderRadius: 8}}>
          <CardTitle style={{ fontSize: 55, fontStyle: "bold", textAlign: "center" }}>{item.point}</CardTitle>
          <CardSubtitle style={{ fontSize: 11, marginTop: -10, textAlign: "center" }}>POINTS</CardSubtitle>
        </Card>
        <div className="k-vbox k-column">
          <div style={{ padding: "0 8px", marginRight: "3rem" }}>
            <CardTitle style={{ fontSize: 18 }}>{item.name}</CardTitle>
            <CardSubtitle style={{ fontSize: 11, marginTop: -10 }}>({item.url})</CardSubtitle>
          </div>
          <CardActions style={{ marginTop: 10 }}>
            <Button icon="sort-desc-sm" className="k-button k-bare" style={{textTransform:"capitalize",color:"grey"}} onClick={()=>upVote({item})}> Up Vote</Button>
            <Button icon="sort-asc-sm" className="k-button k-bare" style={{textTransform:"capitalize",color:"grey"}} onClick={()=>downVote({item})}>Down Vote</Button>
          </CardActions>
        
          
        </div>
        <div  style={{border:"none"}}>
          <Button icon="close-circle" className="k-button k-bare" style={{color:"red"}} onClick={toggleDialog}></Button>
          {visible && <Dialog title={"Remove Link"} onClose={toggleDialog}>
          <p style={{ margin: "25px", textAlign: "center"}}>Do you want to remove 
          <p style={{align:"center"}}><b>{item.name.toUpperCase()}</b></p></p>
                    <DialogActionsBar>
                        <Button className="k-button k-bare" style={{color:"green"}} onClick={()=>removeLink({item})}>OK</Button>
                        <Button   className="k-button" onClick={toggleDialog}>CANCEL</Button>
                    </DialogActionsBar>
                </Dialog>}
                </div>
       
      </Card>
    );
  
}

export default MyItemRender;