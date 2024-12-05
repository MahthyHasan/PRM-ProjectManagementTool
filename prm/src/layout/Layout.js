import React, { useState, useEffect } from "react";
import Profile from "../assets/profile-img.svg";
import SideClose from "../assets/icons/left-arrow.svg";
import FeatherIcon from "feather-icons-react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeToggle } from "../redux/actions";
import { EditProfile } from "./EditProfile";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import logopath from "../assets/logo-white.png";

function Layout({ children }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const open = useSelector((state) => {
    return state.setting.toggle;
  });
  const [modalType, setModalType] = useState("view");
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState(false);

  function toggleDrawer() {
    dispatch(changeToggle(!open));
    // setOpen(!open)
  }
  //   const toggleNotification = () => {
  //     setShowNotification(!showNotification);
  // };

  // console.log(open);
  // console.log(show);

  const [profilePopupShow, setProfilePopupShow] = useState(false);

  const handleProfileClick = () => {
    setProfilePopupShow(!profilePopupShow);
  };
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div
          className={
            (!open ? " col-xl-2" : " w-100px") +
            (!show ? " mobile-navbar-hide " : " mobile-show ") +
            " col-auto col-md-1 px-0 side-bg-color border-right min-vh-100 trans"
          }
        >
          <div className="row">
            <div className="col">
              <img src={logopath} className={open ? "hide-logo" : "logo-prm"} />
            </div>
            <div className="col">
              <div
                className={"close-btn-container mobile-hide"}
                onClick={toggleDrawer}
              >
                <img
                  src={SideClose}
                  alt="SideClose"
                  className={!!open && "rotate-180"}
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 nav-link-text-color pt-4">
            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active "
                    : "side-menu-item "
                }
                to={"/home"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="briefcase"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={"trans-1"}>Projects</div>}
                </div>
              </NavLink>
            </div>

            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active"
                    : "side-menu-item"
                }
                to={"/tdb"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="file-text"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Tasks</div>}
                </div>
              </NavLink>
            </div>
            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active"
                    : "side-menu-item"
                }
                to={"/members"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="user"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Members</div>}
                </div>
              </NavLink>
            </div>

            {/* <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active"
                    : "side-menu-item"
                }
                to={"/member"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="users"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Member </div>}
                </div>
              </NavLink>
            </div> */}
            <div className={"w-100 border-bottom-d1d1d1 mb-3"} />

            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active"
                    : "side-menu-item"
                }
                to={"/settings"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="settings"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Settings</div>}
                </div>
              </NavLink>
            </div>
            <div className=" w-24 px-sm-2 logout-bottom-left  ">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active "
                    : "side-menu-item"
                }
                to={"/logout"}
              >
                <div className={"d-flex "}>
                  <FeatherIcon
                    icon="log-out"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Logout</div>}
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col p-0">
          <nav className="navbar navbar-expand-lg bg-white border-bottom-d1d1d1 px-4">
            <div className="container-fluid nav-iconset flex-nowrap">
              <button
                className="navbar-toggler "
                type="button"
                onClick={() => setShow(!show)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse " id="">
                <ul className="navbar-nav ms-auto align-items-center flex-row">
                  <Dropdown className="bg-white">
                    <Dropdown.Toggle variant="white" id="dropdown-basic">
                      <div
                        className="d-flex align-items-center icon-hover rounded"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src={Profile}
                          alt="avatar"
                          height="38px"
                          width="38px"
                          className="rounded-circle me-2"
                        />
                        <p className="mb-0 text-dark">navaneethan</p>
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="p-3 text-left">
                        <p>Navaneethan</p>
                        <p>nava@gmail.com</p>

                        <button
                          type="button"
                          className={
                            "btn btn-primary tasks-dropdown-btn padding-none d-flex   align-items"
                          }
                          onClick={() => {
                            setModalType("Edit");
                            setModalShow(true);
                          }}
                        >
                          Profile Edit
                        </button>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </ul>
              </div>
            </div>
          </nav>
          <div>
            <div />
            {children}
          </div>
        </div>
      </div>
      <EditProfile
        show={modalShow}
        type={modalType}
        onHide={() => {
          setModalShow(false);
        }}
        modelData={modalData}
      />
    </div>
  );
}

export default Layout;
