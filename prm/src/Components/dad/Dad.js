import { useState, useEffect } from "react";
import "./Dad.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import Card from "./Card/Card";
import Layout from "../../layout/Layout";

const Dad = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/task")
      .then((response) => {
        const groupedTasks = groupTasksByStatus(response.data);
        setTaskList(groupedTasks);
        console.log("Task listed successfully!");
      })
      .catch((error) => {
        console.error("Error fetching task list:", error);
      });
  }, []);

  const groupTasksByStatus = (tasks) => {
    const groupedTasks = tasks.reduce((result, task) => {
      const status = task.status;
      if (!result[status]) {
        result[status] = {
          id: status.toLowerCase().replace(/\s/g, "-"),
          title: ` ${status}`,
          tasks: [],
        };
      }
      result[status].tasks.push({
        id: task.id.toString(),
        title: task.taskName,
        // desc: task.description,
        member: task.member,
        deadline: task.deadline,
      });
      return result;
    }, {});
    return Object.values(groupedTasks);
  };

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const updatedTaskList = [...taskList];
      
      const sourceColIndex = taskList.findIndex(
        (e) => e.id === source.droppableId
      );
      const destinationColIndex = taskList.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = taskList[sourceColIndex];
      const destinationCol = taskList[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      taskList[sourceColIndex].tasks = sourceTask;
      taskList[destinationColIndex].tasks = destinationTask;

      setTaskList(taskList);
    }
  };

  return (
    <Layout>
      <div className="m-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban">
            {taskList.map((section, index) => (
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    className="kanban__section"
                    ref={provided.innerRef}
                  >
                    <div className="kanban__section__title">
                      {section.title}
                    </div>
                    <div className="kanban__section__content">
                      {section.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? "0.5" : "1",
                              }}
                            >
                              {/* <Card> */}
                                {/* <div>
                                  {task.title}<br/>
                                  {task.member}<br/>
                                  {task.deadline}
                                </div> */}
                                <div className="card">
                                  <div className="card-body">
                                    <p className="card-text">{task.title}</p>
                                    <p className="card-text">{task.member}</p>
                                    <p className="card-text">{task.deadline}</p>
                                  </div>
                                </div>
                              {/* </Card> */}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </Layout>
  );
};

export default Dad;
