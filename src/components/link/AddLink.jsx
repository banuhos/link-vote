import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Card, CardTitle } from '@progress/kendo-react-layout';
import { withRouter,useHistory  } from 'react-router-dom';


const AddLink = props => {
  const history = useHistory();

    return (
        <Card 
        style={{ width: "60%", height: "auto", borderRadius: 8,margin:"auto",marginBottom:10}} 
        orientation="horizontal" 
        className="d-flex justify-content-between"
        >
          <CardTitle style={{ fontStyle: "bold",padding:"20px 24px" }}>
              <Button 
              icon="plus"  
              style={{fontSize:60,fontStyle:"bold"}} 
              route="/createlink" 
              onClick={() => history.push('/createlink')}/>
          </CardTitle>
              <div className="k-vbox k-column">
                <div style={{ padding: "20px 24px", marginRight: "3rem",margin:"auto",fontSize:"40px" }}>
                    SUBMIT A LINK
                </div>
              </div>
        </Card>
    );
}

export default withRouter(AddLink);