import React from "react";
import { ListView } from '@progress/kendo-react-listview';
import { Pager } from '@progress/kendo-react-data-tools';
import MyItemRender from "./MyItemRender";
import ListHeader from "./ListHeader";
import AddLink from "../link/AddLink";
import {DrawerContent } from '@progress/kendo-react-layout';
import { LinkContext } from "../contexts/LinkContext";
import _ from 'lodash';

class LinkList extends React.Component {
  static contextType= LinkContext;

  state = {
    skip: 0,
    take: 5,
    type: "numeric",
    info: true,
    pageSize: true,
    previousNest: true,
    buttonCounts: 5
  };
  
    handlePageChange = (e) => {
        this.setState({
            skip: e.skip,
            take: e.take
        });
    }

    render() {
        const { skip, take } = this.state;
        const {links} =this.context;
 
        return (
          <DrawerContent>
                <AddLink style={{ width: "60%",border:"none",margin:" auto" }}/>
                <ListView
                    data={links.slice(skip, skip + take)}
                    item={MyItemRender}
                    style={{ width: "60%",border:"none",margin:" auto" }}
                    header={ListHeader}
                />
                 <Pager
                    skip={skip}
                    take={take}
                    onPageChange={this.handlePageChange}
                    total={links.length}
                    info={this.state.info}
                    type={this.state.type}
                    pageSizes={this.state.pageSizes ? this.pageSizes : undefined}
                    previousNext={true}
                    buttonCount={this.state.buttonCount}
                    style={{width:"60%",margin:" auto"}}
                  />
           </DrawerContent>
        );
    }
}


export default LinkList;