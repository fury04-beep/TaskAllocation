import React, { useState, useMemo } from "react";

import Select from "react-select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./style.css";

export default function App() {
  return (
    <div>
      <Header />
      <Menu />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1 className="maintitle">DBS Task Allocation</h1>
    </div>
  );
}

function Menu() {
  const [isVisible, setIsVisible] = useState(false);
  const [rows, setRows] = useState([
    {
      project: "",
      task: "",
      taskDetails: "",
      associate: [],
      startDate: new Date(),
      endDate: new Date(),
      headCount: 0,
      comments: "",
    },
  ]);

  const lstOfAssociates = useMemo(
    () => [
      "Andrew Jacob",
      "Gousi Karthikeyan",
      "Manish",
      "Keerthana",
      "Sachin",
      "anandhu",
      "Ajesh",
      "Gopi",
      "Sarath",
      "Kiruthiga",
      "Shanthini",
      "Karthikeyan L",
      "Karthikeyan Ayyadurai",
    ],
    []
  );

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: 170,
      margin: 2,
    }),
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #ccc",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#007bff" : "white",
      color: state.isSelected ? "white" : "black",
      ":hover": {
        backgroundColor: "#007bff",
        color: "white",
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      zIndex: 9999, // Ensure the menu is rendered above other elements
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      fontSize: "75%",
      padding: "2px", // Adjust padding as needed
    }),
  };

  function handleOnChangeProject(index, value) {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, project: value } : row))
    );
  }

  function handleOnChangeTask(index, value) {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, task: value } : row))
    );
  }

  function handleOnChangeTaskDetails(index, value) {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, taskDetails: value } : row
      )
    );
  }

  function handleOnChangeAssociate(index, selectedOptions) {
    // Extract values from selectedOptions
    const values = selectedOptions.map((option) => option.value);

    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, associate: values } : row
      )
    );
  }
  function handleOnChangeHeadCount(index, value) {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, headCount: value } : row
      )
    );
  }

  function handleOnChangeStartDate(index, date) {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, startDate: date } : row
      )
    );
  }

  function handleOnChangeEndDate(index, date) {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, endDate: date } : row))
    );
  }

  function handleOnChangeComments(index, value) {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, comments: value } : row
      )
    );
  }

  function handleDeleteRow(index) {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  }

  function addRow() {
    // Calculate total headcount in existing rows
    const totalHeadCount = rows.reduce(
      (total, row) => total + Number(row.headCount),
      0
    );

    for (let i = 0; i < rows.length; i++) {
      if (!rows[i].project) {
        return alert("Please Select a project");
      }
      if (!rows[i].task) {
        return alert("Please Select Task");
      }
      if (!rows[i].taskDetails) {
        return alert("Please enter Task details");
      }
      if (rows[i].associate.length === 0) {
        return alert("Please select at least one associate");
      }
      if (rows[i].headCount === 0) {
        return alert("please provide HC");
      } else if (rows[i].headCount > rows[i].associate.length) {
        return alert("HC is more");
      }
    }
    // Allow adding a new row only if the new total headcount is less than or equal to 12
    if (totalHeadCount + 0.5 <= 12) {
      setRows((prevRows) => [
        ...prevRows,
        {
          project: "",
          task: "",
          taskDetails: "",
          associate: [], // Change to an array
          startDate: new Date(),
          endDate: new Date(),
          headCount: 0,
          comments: "",
        },
      ]);
    } else {
      alert("Total headcount is 12 or more. Cannot add a new row. ");
    }
  }

  const currentDate = new Date();

  const lstOfProjects = [
    "ABC",
    "Articles",
    "Authors",
    "Newsstand",
    "Payments",
    "Periodicals",
    "Saga",
  ];
  const lstOfTasks = {
    ABC: ["Regression", "Sanity", "Meetings"],
    Articles: ["Regression", "Sanity", "Meetings"],
    Authors: ["Regression", "Sanity", "Meetings"],
    Newsstand: ["BVT", "OTA", "Platform Sign-off"],
    Payments: ["Regression", "Prop Sanity", "Feature"],
    Periodicals: ["Regression", "Prop Sanity", "Feature"],
    Saga: ["Regression", "Prop Sanity", "Feature"],
  };

  return (
    <div className="flex-container">
      <div className="side-by-side left-side">
        <ul>
          <li>
            <span onClick={() => setIsVisible(!isVisible)}>
              Task allocation
            </span>
          </li>
        </ul>
      </div>
      {isVisible && (
        <div className="side-by-side right-side">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Project</th>
                <th>Task Name</th>
                <th>Task Details</th>
                <th>Associate Name</th>
                <th>HC</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Comments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    {currentDate.toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <Projects
                      lstOfProjects={lstOfProjects}
                      project={row.project}
                      onStateChange={(value) =>
                        handleOnChangeProject(index, value)
                      }
                    />
                  </td>
                  <td>
                    <Tasks
                      lstOfProjects={lstOfProjects}
                      lstOfTasks={lstOfTasks}
                      project={row.project}
                      task={row.task}
                      onStateChange={(value) =>
                        handleOnChangeTask(index, value)
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      placeholder="Click to enter"
                      value={row.taskDetails}
                      onChange={(e) =>
                        handleOnChangeTaskDetails(index, e.target.value)
                      }
                      rows={3}
                      cols={22}
                    />
                  </td>
                  <td>
                    <Select
                      value={row.associate.map((associate) => ({
                        value: associate,
                        label: associate,
                      }))}
                      options={lstOfAssociates.map((associate) => ({
                        value: associate,
                        label: associate,
                      }))}
                      isMulti
                      onChange={(selectedOptions) =>
                        handleOnChangeAssociate(index, selectedOptions)
                      }
                      isClearable={false}
                      styles={customStyles}
                    />
                  </td>
                  <td>
                    <HeadCount
                      associate={row.associate}
                      headCount={row.headCount}
                      onStateChange={(e) =>
                        handleOnChangeHeadCount(index, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <MyCalendarStart
                      project={row.project}
                      startDate={row.startDate}
                      handleStartDateChange={(date) =>
                        handleOnChangeStartDate(index, date)
                      }
                    />
                  </td>
                  <td>
                    <MyCalendarEnd
                      endDate={row.endDate}
                      handleEndDateChange={(date) =>
                        handleOnChangeEndDate(index, date)
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      value={row.comments}
                      onChange={(e) =>
                        handleOnChangeComments(index, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {index === 0 ? (
                      <div>
                        <span> - </span>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="closeBtn"
                          onClick={() => handleDeleteRow(index)}
                        >
                          &times;
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isVisible && (
        <div className="btnContainer">
          <button className="rowBtn" onClick={addRow}>
            Add Row
          </button>
          <button className="submitBtn">Submit</button>
        </div>
      )}
    </div>
  );
}

function Projects({ lstOfProjects, project, onStateChange }) {
  return (
    <div>
      <select
        className="project"
        value={project}
        onChange={(e) => onStateChange(e.target.value)}
      >
        <option value="">Select a Project</option>
        {lstOfProjects.map((project, index) => (
          <option key={index} value={project}>
            {project}
          </option>
        ))}
      </select>
    </div>
  );
}

function Tasks({ lstOfTasks, project, task, onStateChange }) {
  return (
    <>
      {project ? (
        <div>
          <select
            className="tasks"
            value={task}
            onChange={(e) => onStateChange(e.target.value)}
          >
            <option value="">Select Task</option>
            {lstOfTasks[project].map((task, index) => (
              <option key={index} value={task}>
                {task}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <select
            disabled
            className="tasks"
            value={task}
            onChange={(e) => onStateChange(e.target.value)}
          >
            <option value="">Select Task</option>
            {/* Handle the case where project is not defined */}
          </select>
        </div>
      )}
    </>
  );
}

function MyCalendarStart({ startDate, handleStartDateChange }) {
  return (
    <div>
      <DatePicker
        showIcon
        className="calendar"
        selected={startDate}
        onChange={handleStartDateChange}
      />
    </div>
  );
}

function MyCalendarEnd({ endDate, handleEndDateChange }) {
  return (
    <div>
      <DatePicker
        showIcon
        classname="calendar"
        selected={endDate}
        onChange={handleEndDateChange}
      />
    </div>
  );
}

function HeadCount({ associate, headCount, onStateChange }) {
  return (
    <div>
      {/* <select value={headCount} onChange={(e) => onStateChange(e)}>
        {Array.from({ length: 25 }, (_, index) => index * 0.5).map(
          (count, index) => (
            <option key={index} value={count}>
              {count}
            </option>
          )
        )}
      </select> */}
      {associate.length >= 1 ? (
        <input
          type="number"
          min="0"
          max={associate.length}
          className="headcountbox"
          value={headCount}
          onChange={onStateChange}
        ></input>
      ) : (
        <input
          disabled
          type="number"
          className="headcountbox"
          value={headCount}
          onChange={onStateChange}
        ></input>
      )}
    </div>
  );
}
