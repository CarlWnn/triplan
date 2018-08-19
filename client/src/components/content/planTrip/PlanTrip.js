import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react'; 
import DayList from './dayList/DayList';
import styled from 'styled-components';
import PlaceList from './placeList/PlaceList';
import EventList from './EventList/EventList';

const Container = styled.div `
  margin: 8px;
  border-radius: 2px;
  
`;

const Wrapper = styled.div `
margin: 8px;
border-radius: 2px;
display: flex;
flex-direction: row;
`;


@inject(allStores => ({
    placesArray: allStores.store.placesArray,
    daysArray: allStores.store.daysArray
}))
@observer
class PlanTrip extends Component {



  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
        return;
    }

    if (
        destination.droppableId === source.droppableId && 
        destination.index === source.index
    ) {
        return;
    }
     
  
     //dragging inside the Place Container
     if(source.droppableId === "placesContainer"){
     const idToIndexPlaces = this.props.placesArray.findIndex(p=>p.id===draggableId)
     const dragger = this.props.placesArray[idToIndexPlaces]
     
     this.props.placesArray.splice(source.index, 1);
     this.props.placesArray.splice(destination.index, 0, dragger);
     console.log('working source '+JSON.stringify(source))
     console.log('working destiantion '+ destination)
     }else {
    console.log(source.index)
    //  const dayIdtoindex = this.props.daysArray.findIndex(p=> p.id === source.droppableId)
    //  const idToIndexPlace = this.props.daysArray[dayIdtoindex].places.findIndex(p=> p.id===draggableId)
    //  const draggedPlace = this.props.daysArray[dayIdtoindex].places[idToIndexPlace]
    // this.props.daysArray[dayIdtoindex].places.splice(source.index, 1);
    // this.props.daysArray[dayIdtoindex].places.splice(destination.index, 0, draggedPlace);
     }
    }
     
    


  
    render() {
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Container>

                        <Wrapper>
                            <PlaceList/>
                            <EventList/>
                        </Wrapper>

                        <DayList/>

                    </Container>
                </DragDropContext>
            </React.Fragment>
        );
    }
}

export default PlanTrip;