import React,{useState,useContext} from "react";
import { Button } from "@progress/kendo-react-buttons";
import { DrawerContent } from '@progress/kendo-react-layout';
import { withRouter,useHistory  } from 'react-router-dom';
import { LinkContext } from "../contexts/LinkContext.js";
import {toast} from "react-toastify";

toast.configure();
const CreateLinkPage = props => {
    const history = useHistory();
    const {dispatch} =useContext(LinkContext);
    const[name,setName]=useState('');
    const[url,setUrl]=useState('');
    const[point,setPoint]=useState(0);
    const[input,setInput]=useState({});
    const[errors,setErrors]=useState({});

    const handleSubmit =(e) => {
        e.preventDefault();
        if(validate()){
           dispatch({type:'ADD_LINK',link:{
            name,url,point
            }});
            setName('');
            setUrl('');
            toast.success(name.toUpperCase()+" added.",{ position: toast.POSITION.TOP_CENTER})
        }

    }

    const handleChange=(event)=> {
        input[event.target.name] = event.target.value;
      
        switch(event.target.name){
            case 'linkName':
                setName(event.target.value);
                break;
            case 'linkURL':
                setUrl(event.target.value); 
                break;
            default:
                break;        
        }
        setInput(input);
      }
    
    const validate=()=>{
        let isValid = true;
        let errors = {};

        if (!input["linkName"]) {
            isValid = false;
            errors["linkName"] = "Please enter the link name..";
          }
      
          if (!input["linkURL"]) {
            isValid = false;
            errors["linkURL"] = "Please enter the link url..";
          }else if(!isUrlValid(input["linkURL"])){
            isValid = false;
            errors["linkURL"] = "Please enter the link url correctly..";
          }

          setErrors(errors);
          return isValid;
    }
  
    const isUrlValid = (urlInput) => {
        var res = urlInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res == null)
            return (false );
        else
            return (true);
    };

    return (
        <DrawerContent>
        <form onSubmit={handleSubmit} style={{width: "60%",margin:"auto",height:"50%"}}>
                <Button 
                icon="arrow-left" 
                className="k-button k-bare" 
                style={{textTransform:"capitalize"}} 
                onClick={() => history.push('/')}>
                    Return To List
                </Button>
                <fieldset >
                    <legend style={{fontSize:"60px",verticalAlign:"middle",fontWeight: "bold"}}>Add New Link</legend>
                    <div>
                        <label>Link Name:</label> 
                    </div>
                    <div>
                         <input
                            name="linkName"
                            type="linkName"
                            style={{width:"80%"}}
                            value={name}
                            onChange={handleChange}
                            required />
                             <div className="text-danger">{errors.linkName}</div>
                    </div>
                   <div>
                      <label>Link URL:</label> 
                   </div>
                   <div>
                       <input
                            name="linkURL"
                            type="linkURL"
                            style={{width:"80%"}}
                            value={url}
                            onChange={handleChange}
                            required />
                            <div className="text-danger">{errors.linkURL}</div>
                   </div>
                    <div class="col-lg-10" >
                    <button
                            type={'submit'}
                            class="btn btn-secondary float-right"
                            style={{width:"100px",height:"50px",marginTop:"30px"}}
                        >
                            ADD
                        </button>
                      
                    </div>
                </fieldset>
            </form>
     </DrawerContent>
    );
}

export default withRouter(CreateLinkPage);