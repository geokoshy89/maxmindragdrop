import { useState } from "react";
import { Data } from "./constants";
import { Chart, CategoryScale, ArcElement } from "chart.js";
import PieChart from "./PieChart";
import './App.css';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy
} from "@dnd-kit/sortable";
import { Box } from "grommet";
import SortableItem from "./SortableItem";

Chart.register(CategoryScale, ArcElement);

function ChartPage(){
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year), 
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        weight: 1,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 0
      }
    ]
  });

  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState([
    "0",
    "1",
    "2",
    "3",
    "4",
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

 
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <Box
        flex={true}
        wrap={true}
        direction="row"
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} handle={true}><PieChart chartData={chartData} id={id}/></SortableItem>
          ))}
          <DragOverlay>
            {activeId ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "grey"
                }}
              ></div>
            ) : null}
          </DragOverlay>
        </SortableContext>
      </Box>
    </DndContext>
  

    //   <div style={{height: '100vh', width: '100%', display: "flex", flexWrap: 'wrap',backgroundColor: '#121212'}}>
    //   <PieChart chartData={chartData} />
    //   <PieChart chartData={chartData} />
    //   <PieChart chartData={chartData} />
    // </div>
  );
}

export default ChartPage;