import React, { useState } from "react";
import { getISOWeek } from "date-fns";

import CustomModal from "./CustomModal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Select from "react-select";
import "boxicons/css/boxicons.min.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./style.css";
// import Teams from "./Teams";

export default function App() {
  const [team, setTeam] = useState("");
  const [manager, setManager] = useState("");
  const [menuVisible, setMenuVisible] = useState(true);
  const [isAllocationOpen, setIsAllocationOpen] = useState(false);
  const [isDashboardOpen, setDashboardOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleOnClick() {
    setIsMenuOpen((cur) => !cur);
  }

  function handleTeamChange(e) {
    setTeam(e.target.value);
  }

  function handleManagerChange(e) {
    setManager(e.target.value);
    setMenuVisible(false);
    setDashboardOpen((cur) => !cur);
  }

  function handleOnChangeAllocation(e) {
    if (isAllocationOpen) return;
    setIsAllocationOpen((cur) => !cur);
    setDashboardOpen(false);
    setIsMenuOpen((cur) => !cur);
  }

  function handleOnChangeDashboard(e) {
    if (isDashboardOpen) return;

    setDashboardOpen((cur) => !cur);
    setIsAllocationOpen(false);
    setIsMenuOpen((cur) => !cur);
  }

  function handleBackToTeamSelection() {
    setTeam("");
    setManager("");
    setMenuVisible(true);
    setIsAllocationOpen(false);
    setDashboardOpen(false);
    setIsMenuOpen(false);
  }

  return (
    <div>
      <Header
        manager={manager}
        onChange={handleOnChangeAllocation}
        onChangeDashboard={handleOnChangeDashboard}
        isMenuOpen={isMenuOpen}
        onChangeMenu={handleOnClick}
        backToTeamSelection={handleBackToTeamSelection}
      />
      <SelectedTeam
        team={team}
        manager={manager}
        onTeamChange={handleTeamChange}
        onManagerChange={handleManagerChange}
        menuVisible={menuVisible}
        isAllocationOpen={isAllocationOpen}
        isDashboardOpen={isDashboardOpen}
      />
      {/* <Teams /> */}
      {/* <SideBar isAllocationOpen={isAllocationOpen} onVisible={setIsVisible} /> */}
    </div>
  );
}

function Header({
  manager,
  onChange,
  onChangeDashboard,
  isMenuOpen,
  onChangeMenu,
  backToTeamSelection,
}) {
  return (
    <div className="header">
      {/* {menuVisible || ( 
      <SideBar isAllocationOpen={isAllocationOpen} onVisible={setIsVisible} />
       )}  */}
      {/* <h1 className="maintitle">Task Allocation</h1> */}
      {/* <nav>
        <div className="logo">
          <i className="bx bx-menu"></i>
          <span className="logo_name">Task Allocation</span>
        </div>
      </nav> */}

      {!manager && <h2 className="title">Task Allocation</h2>}

      {manager && (
        <nav>
          <div className="logo">
            <i className="bx bx-menu menu-icon" onClick={onChangeMenu}></i>
            <span className="logo-name">Task Allocation</span>
          </div>
          <div className="back-btn-box">
            <span className="backBtn" onClick={backToTeamSelection}>
              &larr; Back to team selection
            </span>
          </div>
          {isMenuOpen && (
            <>
              <div className="sidebar">
                <div className="logo">
                  <i
                    className="bx bx-menu menu-icon"
                    onClick={onChangeMenu}
                  ></i>
                  <span className="logo-name">Task Allocation</span>
                </div>
                <div className="sidebar-content">
                  <ul className="lists">
                    <li className="list">
                      <span className="nav-link">
                        <i className="bx bx-home-alt icon"></i>
                        <span
                          className="link"
                          onClick={(e) => onChangeDashboard(e.target.value)}
                        >
                          Dashboard
                        </span>
                      </span>
                    </li>
                    <li className="list">
                      <span className="nav-link">
                        <i className="bx bx-task icon"></i>
                        <span
                          className="link"
                          onClick={(e) => onChange(e.target.value)}
                        >
                          Allocation
                        </span>
                      </span>
                    </li>
                    <li className="list">
                      <span className="nav-link">
                        <i className="bx bxs-report icon"></i>
                        <span className="link">Reports</span>
                      </span>
                      <ul className="report-options">
                        <li>Week</li>
                        <li>Month</li>
                        <li>Vertical</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </nav>
      )}
    </div>
  );
}

function SelectedTeam({
  team,
  manager,
  onTeamChange,
  onManagerChange,
  menuVisible,
  isAllocationOpen,
  isDashboardOpen,
}) {
  return (
    <div>
      <Teams
        team={team}
        onTeamChange={onTeamChange}
        manager={manager}
        onManagerChange={onManagerChange}
        menuVisible={menuVisible}
      />
      {isAllocationOpen && <Menu />}
      {isDashboardOpen && <Dashboard />}
      {/* {menuVisible || (
        <SideBar isVisible={isVisible} onVisible={setIsVisible} />
      )} */}
    </div>
  );
}

function Teams({ team, onTeamChange, manager, onManagerChange, menuVisible }) {
  const teams = ["DBS", "Audible", "ICB"];
  const managers = {
    DBS: ["ChinniKrishnan", "SugaPriya"],
    Audible: ["Saranya"],
    ICB: ["Priyadarshini"],
  };

  return (
    <>
      {menuVisible && (
        <div className="select-team">
          <span className="teams">Teams</span>
          <select className="team-options" value={team} onChange={onTeamChange}>
            <option value="">Select a Team</option>
            {teams.map((team, index) =>
              team === "DBS" ? (
                <option key={index} value={team}>
                  {team}
                </option>
              ) : (
                <option key={index} value={team} disabled>
                  {team}
                </option>
              )
            )}
          </select>

          <span className="managers">Managers</span>
          {!team ? (
            <select
              disabled
              className="manager-options"
              value={manager}
              onChange={onManagerChange}
            >
              <option value="">Select a Manager</option>
            </select>
          ) : (
            <select
              className="manager-options"
              value={manager}
              onChange={onManagerChange}
            >
              <option value="">Select a Manager</option>
              {managers[team].map((manager, index) =>
                manager === "ChinniKrishnan" ? (
                  <option key={index} value={manager}>
                    {manager}
                  </option>
                ) : (
                  <option key={index} value={manager} disabled>
                    {manager}
                  </option>
                )
              )}
            </select>
          )}
        </div>
      )}
      {/* {menuVisible || (
        <Menu
          setMenuVisible={setMenuVisible}
          setTeam={setTeam}
          setManager={setManager}
          isVisible={isVisible}
        />
      )} */}
    </>
  );
}

function Menu({ setMenuVisible, setTeam, setManager, isVisible }) {
  const [taskRows, setTaskRows] = useState([
    {
      date: new Date(),
      project: "",
      task: "",
      taskDetails: "",
      otherTaskDetails: "",
      weekNo: 0,
      associate: [""],
      headCount: [0],
      startDate: new Date(),
      endDate: new Date(),
      status: "",
      comments: "",
    },
  ]);

  const [leaveRows, setLeaveRows] = useState([
    {
      date: new Date(),
      project: "",
      category: "",
      type: "",
      associate: "",
      headCount: 0,
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);

  const [modalData, setModalData] = useState({
    showModal: false,
    title: "",
    message: "",
  });

  const handleShowModal = (title, message) => {
    setModalData({
      showModal: true,
      title,
      message,
    });
  };

  const handleCloseModal = () => {
    setModalData({
      showModal: false,
      title: "",
      message: "",
    });
  };

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    //check for duplicate associates
    if (hasDuplicateAssociates(taskRows, leaveRows)) {
      handleShowModal(
        "Validation Error",
        "Duplicate associates found in both tables. Please check."
      );
      return;
    }

    // const totalHC = taskRows.length + leaveRows.length;

    // for (let i = 0; i < totalHC; i++) {
    //   if (taskRows[i].headCount > taskRows[i].associate.length) {
    //     handleShowModal(
    //       "Validation Error",
    //       "Please check Util - HC can't be more than the No. of selected associates"
    //     );

    //     return;
    //   } else if (leaveRows[i].headCount > leaveRows[i].associate.length) {
    //     return handleShowModal(
    //       "Validation Error",
    //       "Please check Non-util - HC can't be more than the No. of selected associates"
    //     );
    //   }
    // }

    // Calculate total headcount, leave count, and TBH count
    // const totalUtilHC = taskRows.reduce(
    //   (total, row) => total + Number(row.headCount),
    //   0
    // );

    // const totalNonUtilHC = leaveRows.reduce(
    //   (total, row) => total + Number(row.headCount),
    //   0
    // );

    // if (totalUtilHC + totalNonUtilHC > 15) {
    //   handleShowModal("Validation Error", "HC exceeds MAX HC");
    //   return;
    // }

    setShowModal((showModal) => !showModal);
  };

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

  const lstOfAssociates = [
    "Andrew Jacob",
    "Gousi Karthikeyan",
    "Manish",
    "Keerthana",
    "Sachin",
    "Anandhu",
    "Ajesh",
    "Gopi",
    "Sarath",
    "Kiruthiga",
    "Shanthini",
    "Karthikeyan L",
    "Karthikeyan Ayyadurai",
    "Afrid",
    "Rashad",
  ];

  const noOfHeadCount = [0, 0.25, 0.5, 0.75, 1];

  // const lstOfAssociatesInProjects = {
  //   ABC: ["Gousi Karthikeyan"],
  //   Articles: ["Karthikeyan Ayyadurai", "Shanthini"],
  //   Authors: ["Kiruthiga"],
  //   Newsstand: ["Andrew Jacob"],
  //   Payments: [
  //     "Manish",
  //     "Keerthana",
  //     "Anandhu",
  //     "Karthikeyan L",
  //     "Afrid",
  //     "Rashad",
  //   ],
  //   Periodicals: ["Ajesh"],
  //   Saga: ["Sachin", "Gopi", "Sarath"],
  // };

  const lstOfTasks = {
    ABC: ["Regression", "Sanity", "Feature", "Other"],
    Articles: ["Regression", "Sanity", "Feature", "Other"],
    Authors: ["Regression", "Sanity", "Feature", "Other"],
    Newsstand: ["Regression", "Sanity", "Feature", "Other"],
    Payments: ["Regression", "Sanity", "Feature", "Other"],
    Periodicals: ["Regression", "Sanity", "Feature", "Other"],
    Saga: ["Regression", "Sanity", "Feature", "Other"],
  };

  const lstOfStatus = ["In-Progress", "Yet to start", "On-hold"];

  const lstOfNonProd = ["Leave", "TBH"];

  const lstOfLeave = ["Planned Leave", "Unplanned Leave", "SickLeave"];

  const containerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: 140,
      margin: 2,
      fontSize: 13,
      position: "relative",
    }),
    control: (provided, state) => ({
      ...provided,
      border: "1.5px  solid #0000001b",
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

  function handleTaskDateChange(index, value) {
    setTaskRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, date: value } : row))
    );
  }

  function handleLeaveDateChange(index, value) {
    setLeaveRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, date: value } : row))
    );
  }

  function handleOnChangeProject(index, value) {
    setTaskRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, project: value } : row))
    );
  }

  function handleOnChangeLeaveProject(index, value) {
    setLeaveRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, project: value } : row))
    );
  }

  function handleOnChangeTask(index, value) {
    setTaskRows((prevRows) =>
      prevRows.map((row, i) =>
        //     if (i === index) {
        //       const updatedRow = { ...row, task: value };

        //       // Fetch task details based on the selected project and task name
        //       // const taskDetails = getTaskDetails(updatedRow.project, value);
        //       const taskDetails = getTaskDetails(updatedRow.project, value);

        //       return { ...updatedRow, taskDetails };
        //     } else {
        //       return row;
        //     }
        //   })
        // );
        i === index ? { ...row, task: value } : row
      )
    );
  }

  function getTaskDetails(project, task) {
    // Example data (replace this with your actual data retrieval logic)
    const taskDetailsMap = {
      ABC: {
        Regression: ["ABC Regression", "Other"],
        Sanity: ["Prod Sanity"],
      },
      Articles: {
        Regression: ["Horizonte Regression", "Pre-OTA Regression", "Other"],
        Sanity: ["Prod Sanity"],
      },
      Authors: {
        Regression: ["NA"],
        Sanity: ["Prod Sanity"],
      },
      Newsstand: {
        Regression: ["OTA Regression", "FOS Platform Sign-off", "Other"],

        Sanity: ["BVT - Build Verification Testing"],
      },
      Payments: {
        Regression: ["DPPUI Regression", "EU MFA Regression", "Other"],
        Sanity: ["Prod Sanity"],
      },
      Periodicals: {
        Regression: [
          "DPX Regression",
          "SBR Sign-off",
          "FOS Platform Sign-off",
          "Other",
        ],

        Sanity: ["Prod Sanity", "Weblab Sanity", "Testport Sanity"],
      },
      Saga: {
        Regression: [
          "SDP Regression AF",
          "Hulk Buy & Bnx Regression",
          "Prod Sanity",
          "SBR Build Sign-off",
          "Dramabot Migration Testing",
          "Other",
        ],
        Sanity: ["NA"],
      },
      // ... Add details for other projects and tasks
    };

    // Fetch task details based on project and task name
    return taskDetailsMap[project] ? taskDetailsMap[project][task] : "";
  }

  function handleOnChangeTaskDetails(index, value) {
    setTaskRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, taskDetails: value } : row
      )
    );
  }

  // function renderTaskDetailsColumn(row, index) {
  //   const taskDetails1 = getTaskDetails(row.project, row.task);

  //   if (row.task === "Regression") {
  //     return (
  //       <select
  //         value={row.taskDetails}
  //         onChange={(e) => handleOnChangeTaskDetails(index, e.target.value)}
  //       >
  //         {/* <option value="">Select Regression Type</option> */}
  //         {taskDetails1.map((option, index) => (
  //           <option key={index} value={option}>
  //             {option}
  //           </option>
  //         ))}

  //         {/* Add more options as needed */}
  //       </select>
  //     );
  //   } else if (row.task === "Feature" || row.task === "Other") {
  //     return (
  //       <textarea
  //         placeholder="Click to enter"
  //         value={row.taskDetails}
  //         onChange={(e) => handleOnChangeTaskDetails(index, e.target.value)}
  //         rows={4}
  //         cols={16}
  //       />
  //     );
  //   } else {
  //     return <span>{row.taskDetails}</span>;
  //   }
  // }

  function handleWeekChange(index, value) {
    setTaskRows((prevRows) =>
      prevRows.map((row, i) =>
        // if (i === index) {
        //   //Calculate week number based on the current date
        //   const currentDate = new Date();
        //   const weekNo = getISOWeek(currentDate);

        //   return { ...row, weekNo };
        // } else {
        //   return row;
        // }
        i === index ? { ...row, weekNo: value } : row
      )
    );
  }

  // function handleOnChangeTaskAssociate(index, selectedOptions) {
  //   // Extract values from selectedOptions
  //   const values = selectedOptions.map((option) => option.value);

  //   setTaskRows((prevRows) =>
  //     prevRows.map((row, i) =>
  //       i === index ? { ...row, associate: values } : row
  //     )
  //   );
  // }

  // function handleOnChangeTaskAssociate(index, value) {
  //   setTaskRows((prevRows) =>
  //     prevRows.map((row, i) =>
  //       i === index ? { ...row, associate: value } : row
  //     )
  //   );
  // }

  function handleOnChangeTaskAssociateOption(rowIndex, associateIndex, value) {
    setTaskRows((prevRows) =>
      prevRows.map((row, i) =>
        i === rowIndex
          ? {
              ...row,
              associate: row.associate.map((assoc, index) =>
                index === associateIndex ? value : assoc
              ),
            }
          : row
      )
    );
  }

  // function handleOnChangeLeaveAssociate(index, selectedOptions) {
  //   // Extract values from selectedOptions
  //   const values = selectedOptions.map((option) => option.value);

  //   setLeaveRows((prevRows) =>
  //     prevRows.map((row, i) =>
  //       i === index ? { ...row, associate: values } : row
  //     )
  //   );
  // }

  //

  function handleOnChangeLeaveAssociate(index, value) {
    setLeaveRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, associate: value } : row
      )
    );
  }

  // function handleOnChangeTaskHeadCount(index, value) {
  //   setTaskRows((prevRows) =>
  //     prevRows.map((row, i) =>
  //       i === index ? { ...row, headCount: value } : row
  //     )
  //   );
  // }

  function handleOnChangeTaskHeadCountOption(rowIndex, headCountIndex, value) {
    setTaskRows((prevRows) =>
      prevRows.map((row, i) =>
        i === rowIndex
          ? {
              ...row,
              headCount: row.headCount.map((count, index) =>
                index === headCountIndex ? value : count
              ),
            }
          : row
      )
    );
    // if (headCountIndex === taskRows[rowIndex].headCount.length - 1) {
    //   addAssociateHeadCount(rowIndex);
    // }
  }

  // function handleOnChangeLeaveHeadCount(rowIndex, headCountIndex, value) {
  //   setLeaveRows((prevRows) =>
  //     prevRows.map((row, i) =>
  //       i === rowIndex
  //         ? {
  //             ...row,
  //             headCount: row.headCount.map((count, index) =>
  //               index === headCountIndex ? value : count
  //             ),
  //           }
  //         : row
  //     )
  //   );
  // }

  function handleOnChangeLeaveHeadCount(index, value) {
    setLeaveRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, headCount: value } : row
      )
    );
  }

  function handleOnChangeTaskStartDate(index, date) {
    setTaskRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, startDate: date } : row
      )
    );
  }

  function handleOnChangeLeaveStartDate(index, date) {
    setLeaveRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, startDate: date } : row
      )
    );
  }

  function handleOnChangeTaskEndDate(index, date) {
    setTaskRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, endDate: date } : row))
    );
  }

  function handleOnChangeLeaveEndDate(index, date) {
    setLeaveRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, endDate: date } : row))
    );
  }

  function handleOnChangeStatus(index, value) {
    setTaskRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, status: value } : row))
    );
  }

  function handleOnChangeComments(index, value) {
    setTaskRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, comments: value } : row
      )
    );
  }

  function handleTaskDeleteRow(index) {
    setTaskRows((prevRows) => prevRows.filter((_, i) => i !== index));
  }

  function handleLeaveDeleteRow(index) {
    setLeaveRows((prevRows) => prevRows.filter((_, i) => i !== index));
  }
  function addRowForTask() {
    // const totalHeadCount = taskRows.reduce(
    //   (total, row) => total + Number(row.headCount[]),
    //   0
    // );
    // Calculate total headcount in existing rows
    const totalHeadCount = taskRows.reduce(
      (total, row) =>
        total + row.headCount.reduce((sum, count) => sum + Number(count), 0),
      0
    );
    console.log(totalHeadCount);

    const totalNonUtilHC = leaveRows.reduce(
      (total, row) => total + Number(row.headCount),
      0
    );

    if (totalHeadCount + totalNonUtilHC + 0.5 > 15) {
      handleShowModal("Error adding Row", "Every member utilized");
      return;
    }

    for (let i = 0; i < taskRows.length; i++) {
      if (!taskRows[i].project) {
        handleShowModal("Validation Error", "Please Select a Project");
        return;
      }
      if (!taskRows[i].task) {
        return handleShowModal("Validation Error", "Please Select a Task");
      }
      if (!taskRows[i].taskDetails) {
        return handleShowModal("Validation Error", "Please Enter Task Details");
      }
      if (taskRows[i].associate.length === 0) {
        return handleShowModal(
          "Validation Error",
          "Please Select atleast one associate"
        );
      }
      if (taskRows[i].headCount === 0) {
        return handleShowModal("Validation Error", "Please provide HC");
      } else if (taskRows[i].headCount > taskRows[i].associate.length) {
        return handleShowModal(
          "Validation Error",
          "HC can't be more than the No. of selected associates"
        );
      }

      if (!taskRows[i].status) {
        return handleShowModal("Validation Error", "Please Select Status");
      }
    }

    // Allow adding a new row only if the new total headcount is less than or equal to 12
    if (totalHeadCount + 0.5 < 15) {
      setTaskRows((prevRows) => [
        ...prevRows,
        {
          date: new Date(),
          project: "",
          task: "",
          taskDetails: "",
          weekNo: 0,
          associate: [""],
          headCount: [0],
          startDate: new Date(),
          endDate: new Date(),
          status: "",
          comments: "",
        },
      ]);
    } else {
      handleShowModal("Error adding a row", `Max HC Reached`);

      return;
    }
  }

  function addAssociateHeadCount(index) {
    setTaskRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index
          ? {
              ...row,
              associate: [...row.associate, ""],
              headCount: [...row.headCount, 0],
            }
          : row
      )
    );
  }

  function deleteAssociateHeadCount(rowIndex) {
    // setTaskRows((prevRows) =>
    //   prevRows.map((row, i) =>
    //     i === index
    //       ? {
    //           ...row,
    //           associate: row.associate.filter(
    //             (_, index) => index !== associateIndex
    //           ),
    //           headCount: row.headCount.filter(
    //             (_, index) => index !== headCountIndex
    //           ),
    //         }
    //       : row
    //   )
    // );
    setTaskRows((prevRows) =>
      prevRows.map((row, index) =>
        index === rowIndex ? { ...row, associate: [""], headCount: [0] } : row
      )
    );
  }

  function addRowForLeave() {
    // const totalUtilHC = taskRows.reduce(
    //   (total, row) => total + Number(row.headCount),
    //   0
    // );

    const totalNonUtilHC = leaveRows.reduce(
      (total, row) => total + Number(row.headCount),
      0
    );

    console.log(`totalNonUtilHC: ${totalNonUtilHC}`);
    // console.log(`totalutil - ${totalUtilHC}, totalNonUtil - ${totalNonUtilHC}`);

    // if (totalUtilHC + totalNonUtilHC + 0.5 > 15) {
    //   handleShowModal("Error adding Row", "Every member utilized");
    //   return;
    // }

    for (let i = 0; i < leaveRows.length; i++) {
      if (!leaveRows[i].category) {
        return handleShowModal("Validation Error", "Please Select a category");
      }
      if (leaveRows[i].category === "Leave" && !leaveRows[i].type) {
        return handleShowModal(
          "Validation Error",
          "Please Select a Leave type"
        );
      }
      if (
        leaveRows[i].category === "Leave" &&
        leaveRows[i].associate.length === 0
      ) {
        return handleShowModal(
          "Validation Error",
          "Please Select atleast one assocaite"
        );
      }
      if (leaveRows[i].headCount === 0) {
        return handleShowModal("Validation Error", "Please provide HC");
      } else if (leaveRows[i].headCount > leaveRows[i].associate.length) {
        return handleShowModal(
          "Validation Error",
          "HC can't be more than the No. of selected associates"
        );
      }
    }

    setLeaveRows((prevRows) => [
      ...prevRows,
      {
        category: "",
        type: "",
        associate: [""],
        headCount: [0],
        startDate: new Date(),
        endDate: new Date(),
      },
    ]);
  }

  function handleOnChangeNonProd(index, value) {
    setLeaveRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, category: value } : row
      )
    );
  }

  function handleOnChangeType(index, value) {
    setLeaveRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, type: value } : row))
    );
  }

  function hasDuplicateAssociates(taskRows, leaveRows) {
    const taskAssociates = taskRows.flatMap((row) => row.associate);
    const leaveAssociates = leaveRows.flatMap((row) => row.associate);

    const duplicates = taskAssociates.filter((associate) =>
      leaveAssociates.includes(associate)
    );

    return duplicates.length > 0;
  }

  async function handleSubmit() {
    // const totalUtilHC = taskRows.reduce(
    //   (total, row) => total + Number(row.headCount),
    //   0
    // );
    const totalUtilHC = taskRows.reduce(
      (total, row) =>
        total + row.headCount.reduce((sum, count) => sum + Number(count), 0),
      0
    );

    const totalNonUtilHC = leaveRows.reduce(
      (total, row) => total + Number(row.headCount),
      0
    );

    const totalHC = totalUtilHC + totalNonUtilHC;

    let leaveCount = 0;
    let tbhCount = 0;
    let plannedLeaves = [];
    let unplannedLeaves = [];

    for (let i = 0; i < leaveRows.length; i++) {
      if (leaveRows[i].category === "Leave") {
        leaveCount = leaveCount + Number(leaveRows[i].headCount);
        const leaveType =
          leaveRows[i].type === "Planned Leave" ? "planned" : "unplanned";
        const leaveString = `${leaveRows[i].associate} is on a ${leaveType} leave`;

        if (leaveType === "planned") {
          plannedLeaves.push(leaveString);
        } else {
          unplannedLeaves.push(leaveString);
        }
      } else if (leaveRows[i].category === "TBH") {
        tbhCount = tbhCount + Number(leaveRows[i].headCount);
      }
    }

    // Calculate total headcount, leave count, and TBH count

    // // Overall HC, Utilization, Leave, and TBH data for the second table
    const overallHC = totalHC;
    const utilization = totalUtilHC;
    const leave = leaveCount;
    const tbh = tbhCount;

    // Additional rows for the second table
    const secondTableRows = [
      `<tr>
      <td>${overallHC}</td>
      <td>${utilization}</td>
      <td>${leave}</td>
      <td>${tbh}</td>
    </tr>`,
    ];

    // Assuming rows is your data that you want to send in the email
    const tableRows = taskRows.map(
      (row, index) =>
        `<tr key=${index}>
        <td>${row.date}</td>
        <td>${row.project}</td>
        <td>${row.task}</td>
        <td>${row.taskDetails}</td>
        <td>${row.weekNo}</td>
        <td>${row.associate}</td>
        <td>${row.headCount.reduce((acc, cur) => acc + Number(cur), 0)}</td>
        <td>${row.startDate.toLocaleDateString()}</td>
        <td>${row.endDate.toLocaleDateString()}</td>
        <td>${row.status}</td>l
        <td>${row.comments}</td>
      </tr>`
    );
    let verticalsLeaveCount = {
      Payments: 0,
      Articles: 0,
      Authors: 0,
      ABC: 0,
      Newsstand: 0,
      Periodicals: 0,
      Saga: 0,
    };
    let verticalsTbhCount = {
      Payments: 0,
      Articles: 0,
      Authors: 0,
      ABC: 0,
      Newsstand: 0,
      Periodicals: 0,
      Saga: 0,
    };
    let verticals = [];

    for (let i = 0; i < leaveRows.length; i++) {
      verticals.push(leaveRows[i].project);
      if (leaveRows[i].category === "Leave") {
        verticalsLeaveCount = {
          ...verticalsLeaveCount,
          [leaveRows[i].project]: Number(leaveRows[i].headCount),
        };
      }
      if (leaveRows[i].category === "TBH") {
        verticalsTbhCount = {
          ...verticalsTbhCount,
          [leaveRows[i].project]: Number(leaveRows[i].headCount),
        };
      }
    }

    const verticalSplit = [
      {
        id: 1,
        vertical: "Payments",
        allocatedHC: 6,
        availableHC: 6,
        leave: 0,
        tbh: 0,
      },
      {
        id: 2,
        vertical: "Articles",
        allocatedHC: 2,
        availableHC: 2,
        leave: 0,
        tbh: 0,
      },
      {
        id: 3,
        vertical: "Authors",
        allocatedHC: 1,
        availableHC: 1,
        leave: 0,
        tbh: 0,
      },
      {
        id: 4,
        vertical: "ABC",
        allocatedHC: 1,
        availableHC: 1,
        leave: 0,
        tbh: 0,
      },
      {
        id: 5,
        vertical: "Newsstand",
        allocatedHC: 1,
        availableHC: 1,
        leave: 0,
        tbh: 0,
      },
      {
        id: 6,
        vertical: "Periodicals",
        allocatedHC: 1,
        availableHC: 1,
        leave: 0,
        tbh: 0,
      },
      {
        id: 7,
        vertical: "Saga",
        allocatedHC: 3,
        availableHC: 3,
        leave: 0,
        tbh: 0,
      },
    ];

    const verticalSplitTable = verticalSplit.map(
      (row) =>
        `<tr key=${row.id}>
      <td>${row.vertical}</td>
      <td>${row.allocatedHC}</td>
      <td>${
        verticals.includes(row.vertical)
          ? row.availableHC - verticalsLeaveCount[row.vertical]
          : row.availableHC
      }</td>
      <td>${
        verticals.includes(row.vertical)
          ? row.leave + verticalsLeaveCount[row.vertical]
          : row.leave
      }</td>
      <td>${
        verticals.includes(row.vertical)
          ? row.tbh + verticalsTbhCount[row.vertical]
          : row.tbh
      }</td>
      </tr>`
    );

    const emailData = {
      to: "fandrewj@amazon.com",
      subject: "Task Allocation Details",
      html: `
        <html>
          <head>
            <style>
              table {
                border-collapse: collapse;
                width: 100%;
              }
              th, td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
              }
            </style>
          </head>
          <body>
            <p>Hi Team,</p>
            <p>Please find below the allocation for today,</p>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Project</th>
                  <th>Task Name</th>
                  <th>Task Details</th>
                  <th>Week No.</th>
                  <th>Associate Name</th>
                  <th>HC</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows.join("")}
              </tbody>
            </table>
            <p>Overall Team Utilization</p>
          <table>
            <thead>
              <tr>
                <th>Overall HC</th>
                <th>Utilization</th>
                <th>Leave</th>
                <th>TBH</th>
              </tr>
            </thead>
            <tbody>
              ${secondTableRows.join("")}
            </tbody>
          </table>
          <p>${plannedLeaves.join("<br>")}</p>
      <p>${unplannedLeaves.join("<br>")}</p>
      <h3>Vertical wise split</h3>
      <table>
      <thead>
      <tr>
      <th>Vertical</th>
      <th>Allocated HC</th>
      <th>Available HC</th>
      <th>Leave</th>
      <th>TBH</th>
      </tr>
      </thead>
      <tbody>
      ${verticalSplitTable.join("")}
      </tbody>
      </table>
          </body>
        </html>`,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/send-email",
        emailData
      );
      console.log(response.data);
      alert("Email sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Error sending email.");
    }

    const reset = taskRows.splice(0, 1).map((data, i) =>
      i === 0
        ? {
            ...data,
            project: "",
            task: "",
            taskDetails: "",
            associate: [""],
            startDate: new Date(),
            endDate: new Date(),
            headCount: [0],
            comments: "",
          }
        : data
    );

    console.log(reset);
    setShowModal((showModal) => !showModal);
    // setTaskRows(reset);
  }

  return (
    <>
      <div>
        {/* {isVisible && ( */}
        <div className="center">
          <p>Utilization</p>
          <div className="task-row">
            <div className="task-table-container">
              <table className="taskTable">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Project</th>
                    <th>Task Name</th>
                    <th>Task Details</th>
                    <th>Week No.</th>
                    <th>Associate Name</th>
                    <th>HC</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Comments</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {taskRows.map((row, index) => (
                    <tr key={index}>
                      <td>
                        {/* {currentDate.toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                          })} */}
                        <DatePicker
                          showIcon
                          className="calendar"
                          selected={row.date}
                          onChange={(date) => handleTaskDateChange(index, date)}
                        />
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
                        {/* {row.task === "Feature" ? (
                            <textarea
                              placeholder="Click to enter"
                              value={row.taskDetails}
                              onChange={(e) =>
                                handleOnChangeTaskDetails(index, e.target.value)
                              }
                              rows={4}
                              cols={16}
                            />
                          ) : row.task === "Other" ? (
                            <textarea
                              placeholder="Click to enter"
                              value={row.taskDetails}
                              onChange={(e) =>
                                handleOnChangeTaskDetails(index, e.target.value)
                              }
                              rows={4}
                              cols={16}
                            />
                          ) : (
                            <span>{row.taskDetails}</span>
                          )} */}
                        {/* {renderTaskDetailsColumn(row)} */}

                        {row.task === "Regression" ? (
                          <select
                            className="task-details"
                            value={row.taskDetails}
                            onChange={(e) =>
                              handleOnChangeTaskDetails(index, e.target.value)
                            }
                          >
                            <option value="">Select a Regression</option>
                            {getTaskDetails(row.project, row.task).map(
                              (option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              )
                            )}
                          </select>
                        ) : row.task === "Sanity" ? (
                          <select
                            className="task-details"
                            value={row.taskDetails}
                            onChange={(e) =>
                              handleOnChangeTaskDetails(index, e.target.value)
                            }
                          >
                            <option value="">Select a Sanity</option>
                            {getTaskDetails(row.project, row.task).map(
                              (option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              )
                            )}
                          </select>
                        ) : row.task === "Feature" ? (
                          <textarea
                            placeholder="Click to enter"
                            value={row.taskDetails}
                            onChange={(e) =>
                              handleOnChangeTaskDetails(index, e.target.value)
                            }
                            rows={4}
                            cols={16}
                          />
                        ) : row.task === "Other" ? (
                          <textarea
                            placeholder="Click to enter"
                            value={row.taskDetails}
                            onChange={(e) =>
                              handleOnChangeTaskDetails(index, e.target.value)
                            }
                            rows={4}
                            cols={16}
                          />
                        ) : (
                          <span>{row.taskDetails}</span>
                        )}
                        {row.taskDetails === "Other" ? (
                          <textarea
                            placeholder="Click to enter"
                            value={row.otherTaskDetails}
                            onChange={(e) =>
                              setTaskRows((prevRows) =>
                                prevRows.map((r, i) =>
                                  i === index
                                    ? {
                                        ...r,
                                        otherTaskDetails: e.target.value,
                                      }
                                    : r
                                )
                              )
                            }
                            rows={4}
                            cols={16}
                          />
                        ) : null}
                      </td>
                      <td>
                        <select
                          className="week"
                          value={row.weekNo}
                          onChange={(e) =>
                            handleWeekChange(index, e.target.value)
                          }
                        >
                          {Array.from(
                            { length: 50 },
                            (_, index) => index * 1
                          ).map((count, index) => (
                            <option key={index} value={count}>
                              {count}
                            </option>
                          ))}
                        </select>

                        {/* {getISOWeek(currentDate)} */}
                      </td>
                      {/* style={containerStyles} use this style in your td if your using the Select react drowdown*/}
                      {/* <td>
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
                              handleOnChangeTaskAssociate(
                                index,
                                selectedOptions
                              )
                            }
                            isClearable={false}
                            styles={customStyles}
                          />

                          <select
                            value={row.associate}
                            onChange={(e) =>
                              handleOnChangeTaskAssociate(index, e.target.value)
                            }
                          >
                            <option value="">Select an associate</option>
                            {lstOfAssociates.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </td> */}
                      <td>
                        {row.associate.map((associate, associateIndex) => (
                          <div key={associateIndex} className="add-associate">
                            <div style={{ display: "inline-block" }}>
                              <select
                                className="associate-name"
                                value={associate}
                                onChange={(e) =>
                                  handleOnChangeTaskAssociateOption(
                                    index,
                                    associateIndex,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select an associate</option>
                                {lstOfAssociates.map((option, optionIndex) => (
                                  <option key={optionIndex} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                      </td>
                      <td>
                        <div className="hc-flex">
                          <div className="add-associate">
                            {row.headCount.map((headCount, headCountIndex) => (
                              <div style={{ display: "inline-block" }}>
                                {/* <HeadCount
                                  associate={row.associate}
                                  headCount={row.headCount}
                                  onStateChange={(e) =>
                                    handleOnChangeTaskHeadCount(
                                      index,
                                      Number(e.target.value)
                                      )
                                  }
                                /> */}
                                <select
                                  className="headCount"
                                  value={headCount}
                                  onChange={(e) =>
                                    handleOnChangeTaskHeadCountOption(
                                      index,
                                      headCountIndex,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select HC</option>
                                  {noOfHeadCount.map((option, optionIndex) => (
                                    <option key={optionIndex} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ))}
                          </div>

                          <button
                            className="add-associate-headcount-btn"
                            onClick={() => addAssociateHeadCount(index)}
                          >
                            +
                          </button>

                          <button
                            className="delete-associate-headcount-btn"
                            onClick={() => deleteAssociateHeadCount(index)}
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td>
                        <MyCalendarStart
                          project={row.project}
                          startDate={row.startDate}
                          handleStartDateChange={(date) =>
                            handleOnChangeTaskStartDate(index, date)
                          }
                        />
                      </td>
                      <td>
                        <MyCalendarEnd
                          endDate={row.endDate}
                          handleEndDateChange={(date) =>
                            handleOnChangeTaskEndDate(index, date)
                          }
                        />
                      </td>
                      <td>
                        <select
                          className="status"
                          value={row.status}
                          onChange={(e) =>
                            handleOnChangeStatus(index, e.target.value)
                          }
                        >
                          <option value="">Select a Status</option>
                          {lstOfStatus.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
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
                              onClick={() => handleTaskDeleteRow(index)}
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
            <div className="btnContainer1">
              <button className="rowBtn" onClick={addRowForTask}>
                Add Row
              </button>
            </div>
          </div>

          <p>Non-Utilization</p>
          <div className="leave-row">
            <table className="leaveTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Project</th>
                  <th>Absentees</th>
                  <th>Type</th>
                  <th>Associate Name</th>
                  <th>HC</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRows.map((row, index) => (
                  <tr>
                    <td>
                      <DatePicker
                        showIcon
                        className="calendar"
                        selected={row.date}
                        onChange={(date) => handleLeaveDateChange(index, date)}
                      />
                    </td>
                    <td>
                      <Projects
                        lstOfProjects={lstOfProjects}
                        project={row.project}
                        onStateChange={(value) =>
                          handleOnChangeLeaveProject(index, value)
                        }
                      />
                    </td>
                    <td>
                      <select
                        className="non-prod"
                        value={row.category}
                        onChange={(e) =>
                          handleOnChangeNonProd(index, e.target.value)
                        }
                      >
                        <option value="">Select a Category</option>
                        {lstOfNonProd.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      {row.category === "Leave" && (
                        <select
                          className="leave"
                          value={row.type}
                          onChange={(e) =>
                            handleOnChangeType(index, e.target.value)
                          }
                        >
                          <option value="">Select a Leave type</option>
                          {lstOfLeave.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                      {row.category === "TBH" && <span>NA</span>}
                      {!row.category && <span>-</span>}
                    </td>
                    <td style={containerStyles}>
                      {row.category === "TBH" ? (
                        <span>NA</span>
                      ) : (
                        // <Select
                        //   value={row.associate.map((associate) => ({
                        //     value: associate,
                        //     label: associate,
                        //   }))}
                        //   options={lstOfAssociates.map((associate) => ({
                        //     value: associate,
                        //     label: associate,
                        //   }))}
                        //   isMulti
                        //   onChange={(selectedOptions) =>
                        //     handleOnChangeLeaveAssociate(index, selectedOptions)
                        //   }
                        //   isClearable={false}
                        //   styles={customStyles}
                        // />
                        // row.associate.map((associate, associateIndex) => (
                        //   <select
                        //     value={associate}
                        //     onChange={(e) =>
                        //       handleOnChangeLeaveAssociate(
                        //         index,
                        //         associateIndex,
                        //         e.target.value
                        //       )
                        //     }
                        //   >
                        //     <option>Select an Associate</option>
                        //     {lstOfAssociates.map((option, optionIndex) => (
                        //       <option value={option} key={optionIndex}>
                        //         {option}
                        //       </option>
                        //     ))}
                        //   </select>
                        // ))
                        <div>
                          <select
                            className="associate-name"
                            value={row.associate}
                            onChange={(e) =>
                              handleOnChangeLeaveAssociate(
                                index,
                                e.target.value
                              )
                            }
                          >
                            <option>Select an Associate</option>
                            {lstOfAssociates.map((option, index) => (
                              <option value={option} key={index}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </td>
                    <td>
                      {/* {
                        <HeadCount
                          category={row.category}
                          associate={row.associate}
                          headCount={row.headCount}
                          onStateChange={(e) =>
                            handleOnChangeLeaveHeadCount(
                              index,
                              Number(e.target.value)
                            )
                          }
                        />
                      } */}
                      {/* {row.headCount.map((headCount, headCountIndex) => (
                        <select
                          className="headCount"
                          value={headCount}
                          onChange={(e) =>
                            handleOnChangeLeaveHeadCount(
                              index,
                              headCountIndex,
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select HC</option>
                          {noOfHeadCount.map((option, optionIndex) => (
                            <option key={optionIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ))} */}
                      <div>
                        <select
                          className="headCount"
                          value={row.headCount}
                          onChange={(e) =>
                            handleOnChangeLeaveHeadCount(index, e.target.value)
                          }
                        >
                          {noOfHeadCount.map((count, index) => (
                            <option value={count} key={index}>
                              {count}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    <td>
                      {row.category === "Leave" ? (
                        <MyCalendarStart
                          project={row.project}
                          startDate={row.startDate}
                          handleStartDateChange={(date) =>
                            handleOnChangeLeaveStartDate(index, date)
                          }
                        />
                      ) : (
                        <span>NA</span>
                      )}
                    </td>
                    <td>
                      {row.category === "Leave" ? (
                        <MyCalendarEnd
                          endDate={row.endDate}
                          handleEndDateChange={(date) =>
                            handleOnChangeLeaveEndDate(index, date)
                          }
                        />
                      ) : (
                        <span>NA</span>
                      )}
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
                            onClick={() => handleLeaveDeleteRow(index)}
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
            <div className="btnContainer2">
              <button className="rowBtn" onClick={addRowForLeave}>
                Add Row
              </button>
            </div>
            <div style={{ textAlign: "center" }}>
              <p>Click "Proceed" to confirm your allocation </p>
              <button className="confirmBtn" onClick={toggleModal}>
                Proceed
              </button>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
      <CustomModal
        showModal={modalData.showModal}
        handleClose={handleCloseModal}
        title={modalData.title}
        message={modalData.message}
      />
      {/* Modal for displaying table details */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-close" onClick={toggleModal}>
              <button className="closeBtn">&times;</button>
            </div>
            <h3 className="modal-title">
              Allocation for -
              {currentDate.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })}
            </h3>
            <h4 className="modal-subtitles">Utilization</h4>
            <table className="modal-table">
              {/* ... (details for the first table) */}
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Project</th>
                  <th>Task Name</th>
                  <th>Task Details</th>
                  <th>Associate Name</th>
                  <th>Week No.</th>
                  <th>HC</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {taskRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      {/* {currentDate.toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })} */}
                      {row.date}
                    </td>
                    <td>{row.project}</td>
                    <td>{row.task}</td>
                    <td>{row.taskDetails}</td>
                    <td>{row.associate.join(", ")}</td>
                    <td>{row.weekNo}</td>
                    <td>
                      {row.headCount.reduce((acc, cur) => acc + Number(cur), 0)}
                    </td>
                    <td>{row.startDate.toLocaleDateString()}</td>
                    <td>{row.endDate.toLocaleDateString()}</td>
                    <td>{row.status}</td>
                    <td>{row.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4 className="modal-subtitles">Non-Utilization</h4>
            <table className="modal-table">
              {/* ... (details for the second table) */}
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Project</th>
                  <th>Absentees</th>
                  <th>Type</th>
                  <th>Associate Name</th>
                  <th>HC</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {leaveRows.map((row, index) => (
                  <tr>
                    <td key={index}>{row.date}</td>
                    <td>{row.project}</td>
                    <td>{row.category}</td>
                    <td>{row.type}</td>
                    <td>{row.associate}</td>
                    <td>{row.headCount}</td>
                    <td>{row.startDate.toLocaleDateString()}</td>
                    <td>{row.endDate.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="modal-submit">
              <p>
                Click on "Submit" button to send the allocation through mail
              </p>
              <button className="submitBtn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
        className="calendar"
        selected={endDate}
        onChange={handleEndDateChange}
      />
    </div>
  );
}

// function HeadCount({ associate, category, headCount, onStateChange }) {
//   return (
//     <div>
//       {associate.length >= 1 || category === "TBH" ? (
//         <input
//           type="number"
//           min="0"
//           max={category === "TBH" ? "5" : associate.length}
//           className="headcountbox"
//           value={headCount}
//           onChange={onStateChange}
//         ></input>
//       ) : (
//         <input
//           disabled
//           type="number"
//           className="headcountbox"
//           value="0"
//         ></input>
//       )}
//     </div>
//   );
// }

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="card">
        <img
          className="avatar"
          src="afrid.jfif"
          alt="Afrid"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Afrid</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Ajesh.jfif"
          alt="Ajesh"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Ajesh</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Anandhu.jfif"
          alt="Anandhu"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Anandhu</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Andrew.jfif"
          alt="Andrew"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Andrew</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Gopi.jfif"
          alt="Gopi"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Gopi</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Gousi.jfif"
          alt="Gousi"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Gousi</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Karthikeyan.jfif"
          alt="Karthikeyan"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Karthikeyan</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Keerthana.jfif"
          alt="Keerthana"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Keerthana</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Kiruthiga.jfif"
          alt="Kiruthiga"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Kiruthiga</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="l Karthikeyan.jfif"
          alt="Karthikeyan"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Karthikeyan</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Manish.jfif"
          alt="Manish"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Manish</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Raguram.jfif"
          alt="Raguram"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Raguram</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Rashad.jfif"
          alt="Rashad"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Rashad</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Sachin.jfif"
          alt="Sachin"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Sachin</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Sarath.jfif"
          alt="Sarath"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Sarath</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Shanthini.jfif"
          alt="Shanthini"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Shanthini</p>
        </div>
      </div>
      <div className="card">
        <img
          className="avatar"
          src="Vijayalakshmi.jfif"
          alt="Vijayalakshmi"
          style={{ width: "105px", height: "145px" }}
        />
        <div className="data">
          <p>Vijayalakshmi</p>
        </div>
      </div>
    </div>
  );
}
