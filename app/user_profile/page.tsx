"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import UserImage from "@/asset/user-image.png"
import axiosClient from "@/utils/axiosClient"
import { getCookie, hasCookie, setCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"

import Alert from "@/components/Alert"
import ConfirmationModal from "@/components/ConfirmationModal"
import LoadingPage from "@/components/LoadingPage"
import Modal from "@/components/Modal"
import { SiteHeader } from "@/components/site-header"

export default function UserProfilePage() {
  const fileInputRef = useRef(null)
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("profile")
  const [userData, setUserData] = useState({})
  const [updateData, setUpdateData] = useState({
    name: "",
    gender: "",
    email: "",
  })
  const [selectedImg, setSelectedImg] = useState(null)
  const [updatedImg, setUpdatedImg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [passwordData, setPasswordData] = useState({
    password: "",
    new_password: "",
    new_password_confirmation: "",
  })
  const [loadingPage, setLoadingPage] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationError, setValidationError] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [dataAlert, setDataAlert] = useState({
    type: "",
    message: "",
  })

  const [modalReloadState, setModalReloadState] = useState(false)

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    setUpdateData({
      name: userData.name,
      gender: userData.gender,
      email: userData.email,
    })
    setPasswordData({
      password: "",
      new_password: "",
      new_password_confirmation: "",
    })
  }

  useEffect(() => {
    if (hasCookie("jwt")) {
      const token = getCookie("jwt")
      const data = jwtDecode(token)
      setUserData({
        name: data.data.user.name,
        gender: data.data.user.gender,
        username: data.data.user.username,
        email: data.data.user.email,
        photo: data.data.user.photo,
      })
      setUpdateData({
        name: data.data.user.name,
        gender: data.data.user.gender,
        email: data.data.user.email,
      })
    }
    setLoadingPage(false)
  }, [])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setUpdatedImg(selectedFile)
      const reader = new FileReader()

      reader.onload = () => {
        setSelectedImg(reader.result)
      }

      reader.readAsDataURL(selectedFile)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const submitUpdateUser = () => {
    const formData = new FormData()
    formData.append("realname", updateData.name)
    formData.append("gender", updateData.gender)
    formData.append("email", updateData.email)

    if (updatedImg) {
      formData.append("photo", updatedImg)
    }

    setLoading(true)
    axiosClient
      .post("/client/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUserData({
          name: res.data.data.user.realname,
          gender: res.data.data.user.gender,
          username: res.data.data.user.username,
          email: res.data.data.user.email,
          photo: res.data.data.user.photo,
        })
        document.cookie = `jwt=${res.data.data.token}; path=/`
        setValidationError({})
        setLoading(false)
        setModalReloadState(true)
      })
      .catch((err) => {
        if (err.response.status == 422) {
          setValidationError(err.response.data.errors)
        }
        setDataAlert({
          type: "error",
          message: "Failed to update data",
        })
        setShowAlert(true)
        setLoading(false)
      })
  }

  const submitUpdatePassword = () => {
    setLoading(true)
    axiosClient
      .post("/client/update-profile", passwordData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setDataAlert({
          type: "success",
          message: "Successfully changed your password.",
        })
        setPasswordData({
          password: "",
          new_password: "",
          new_password_confirmation: "",
        })
        setShowPassword(false)
        setShowNewPassword(false)
        setShowConfirmPassword(false)
        setValidationError({})
        setShowAlert(true)
        setLoading(false)
      })
      .catch((err) => {
        if (err.response.status == 422) {
          setValidationError(err.response.data.errors)
        }
        setDataAlert({
          type: "error",
          message: "Failed to change password",
        })
        setShowAlert(true)
        setLoading(false)
      })
  }

  const handleUserChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <SiteHeader />
      {loadingPage ? (
        <LoadingPage />
      ) : (
        <>
          <div className="container mx-auto py-5">
            <Alert
              type={dataAlert.type}
              message={dataAlert.message}
              flag={showAlert}
              setFlag={setShowAlert}
            />
            <div className="grid justify-center pt-2 grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 px-2 md:px-32">
              <button
                onClick={() => handleTabClick("profile")}
                className={`relative inline-flex py-3 rounded-full border-b-2 border-x-2 border-t-2 sm:border-x-0 sm:border-t-0 sm:rounded-none 
                                    ${
                                      activeTab === "profile" &&
                                      "text-blue-500 border-blue-500"
                                    }
                                `}
              >
                <span className="flex-grow">Profile</span>
                <div
                  className={`bg-blue-500 h-1 absolute bottom-0 left-0 right-0
                                        ${
                                          activeTab === "profile"
                                            ? "hidden sm:block"
                                            : "hidden"
                                        }
                                    `}
                ></div>
              </button>
              <button
                onClick={() => handleTabClick("editProfile")}
                className={`relative inline-flex py-3 rounded-full border-b-2 border-x-2 border-t-2 sm:border-x-0 sm:border-t-0 sm:rounded-none 
                                    ${
                                      activeTab === "editProfile" &&
                                      "text-blue-500 border-blue-500"
                                    }
                                `}
              >
                <span className="flex-grow">Edit Profile</span>
                <div
                  className={`bg-blue-500 h-1 absolute bottom-0 left-0 right-0
                                        ${
                                          activeTab === "editProfile"
                                            ? "hidden sm:block"
                                            : "hidden"
                                        }
                                    `}
                ></div>
              </button>
              <button
                onClick={() => handleTabClick("changePassword")}
                className={`relative inline-flex py-3 rounded-full border-b-2 border-x-2 border-t-2 sm:border-x-0 sm:border-t-0 sm:rounded-none 
                                    ${
                                      activeTab === "changePassword" &&
                                      "text-blue-500 border-blue-500"
                                    }
                                `}
              >
                <span className="flex-grow">Change Password</span>
                <div
                  className={`bg-blue-500 h-1 absolute bottom-0 left-0 right-0
                                        ${
                                          activeTab === "changePassword"
                                            ? "hidden sm:block"
                                            : "hidden"
                                        }
                                    `}
                ></div>
              </button>
            </div>
            {/* <TabsUserProfile /> */}

            <div className="flex flex-col items-center pb-10 px-2 md:px-32">
              {activeTab !== "changePassword" && (
                <>
                  <div>
                    {userData.photo ? (
                      <img
                        className="w-24 h-24 mt-8 mb-4 rounded-full shadow-lg object-cover bg-cover"
                        src={
                          activeTab === "editProfile"
                            ? selectedImg || userData.photo
                            : userData.photo
                        }
                        alt="User Image"
                      />
                    ) : (
                      <div className="w-24 h-24 mt-8 mb-4 rounded-full shadow-lg object-cover bg-cover">
                        <Image
                          src={UserImage}
                          alt="User Image"
                          className="w-auto h-full"
                        />
                      </div>
                    )}
                  </div>
                  {validationError.photo && (
                    <p className="text-red-500 text-sm">
                      {validationError.photo[0]}
                    </p>
                  )}
                </>
              )}

              <div className="w-full tab-content pt-4">
                {activeTab === "profile" && (
                  <div className="divide-y-2">
                    <div className="grid items-center grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10 p-4 border-t-2">
                      <label className="font-bold text-left sm:text-right">
                        Name
                      </label>
                      <label className="">{userData.name}</label>
                    </div>
                    <div className="grid items-center grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10 p-4">
                      <label className="font-bold text-left sm:text-right">
                        Gender
                      </label>
                      <label className="">{userData.gender}</label>
                    </div>
                    <div className="grid items-center grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10 p-4">
                      <label className="font-bold text-left sm:text-right">
                        Username
                      </label>
                      <label className="">{userData.username}</label>
                    </div>
                    <div className="grid items-center grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10 p-4">
                      <label className="font-bold text-left sm:text-right">
                        Email
                      </label>
                      <label className="">{userData.email}</label>
                    </div>
                  </div>
                )}
                {activeTab === "editProfile" && (
                  <>
                    <div className="divide-y-2">
                      <div className="flex justify-center p-4">
                        <button
                          className="btn btn-primary inline-flex items-center text-center hover:bg-black"
                          onClick={handleButtonClick}
                        >
                          Change Photo
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className="grid items-center grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10 p-4">
                        <label className="font-bold text-left sm:text-right">
                          Name
                        </label>
                        <div className="max-w-full h-full">
                          <input
                            className="max-w-full input input-ghost-primary"
                            value={updateData.name}
                            name="name"
                            onChange={handleUserChange}
                          />
                          {validationError.name && (
                            <p className="text-red-500 text-sm">
                              {validationError.name[0]}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid items-center grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10 p-4">
                        <label className="font-bold text-left sm:text-right">
                          Gender
                        </label>
                        <div className="flex flex-row gap-x-12">
                          <div className="flex gap-2 cursor-pointer">
                            <input
                              type="radio"
                              className="radio-primary radio"
                              value="Male"
                              name="gender"
                              checked={updateData.gender === "Male"}
                              onChange={handleUserChange}
                            />
                            <span>Male</span>
                          </div>
                          <div className="flex gap-2 cursor-pointer">
                            <input
                              type="radio"
                              className="radio-primary radio"
                              value="Female"
                              name="gender"
                              checked={updateData.gender === "Female"}
                              onChange={handleUserChange}
                            />
                            <span>Female</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid items-center grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10 p-4">
                        <label className="font-bold text-left sm:text-right">
                          Username
                        </label>
                        <div>{userData.username}</div>
                      </div>
                      <div className="grid items-center grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10 p-4">
                        <label className="font-bold text-left sm:text-right">
                          Email
                        </label>
                        <div className="max-w-full h-full">
                          <input
                            type="email"
                            className="w-full input input-ghost-primary"
                            value={updateData.email}
                            name="email"
                            onChange={handleUserChange}
                          />
                          {validationError.email && (
                            <p className="text-red-500 text-sm">
                              {validationError.email[0]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center p-4">
                      <button
                        className={
                          loading
                            ? "btn btn-loading"
                            : "btn btn-primary inline-flex items-center px-4 text-center"
                        }
                        onClick={submitUpdateUser}
                      >
                        Save
                      </button>
                    </div>
                  </>
                )}
                {activeTab === "changePassword" && (
                  <>
                    <div className="divide-y-2">
                      <div className="grid items-center grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10 p-4">
                        <label className="font-bold text-left sm:text-right">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="max-w-full input input-ghost-primary"
                            value={passwordData.password}
                            name="password"
                            onChange={handlePasswordChange}
                          />
                          <div className="absolute top-0 bottom-0 right-2 flex items-center">
                            <i
                              className={
                                showPassword
                                  ? "fa fa-eye text-cyan-300"
                                  : "fa fa-eye-slash"
                              }
                              aria-hidden="true"
                              onClick={() => setShowPassword(!showPassword)}
                            ></i>
                          </div>
                          {validationError.password && (
                            <p className="text-red-500 text-sm">
                              {validationError.password[0]}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid items-center grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10 p-4">
                        <label className="font-bold text-left sm:text-right">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            className="max-w-full input input-ghost-primary"
                            value={passwordData.new_password}
                            name="new_password"
                            onChange={handlePasswordChange}
                          />
                          <div className="absolute top-0 bottom-0 right-2 flex items-center">
                            <i
                              className={
                                showNewPassword
                                  ? "fa fa-eye text-cyan-300"
                                  : "fa fa-eye-slash"
                              }
                              aria-hidden="true"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            ></i>
                          </div>
                          {validationError.new_password && (
                            <p className="text-red-500 text-sm">
                              {validationError.new_password[0]}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid items-center grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-10 p-4">
                        <label className="font-bold text-left sm:text-right">
                          New Password Confirmation
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="max-w-full input input-ghost-primary"
                            value={passwordData.new_password_confirmation}
                            name="new_password_confirmation"
                            onChange={handlePasswordChange}
                          />
                          <div className="absolute top-0 bottom-0 right-2 flex items-center">
                            <i
                              className={
                                showConfirmPassword
                                  ? "fa fa-eye text-cyan-300"
                                  : "fa fa-eye-slash"
                              }
                              aria-hidden="true"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            ></i>
                          </div>
                          {validationError.new_password_confirmation && (
                            <p className="text-red-500 text-sm">
                              {validationError.new_password_confirmation[0]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center p-4">
                      <button
                        className={
                          loading
                            ? "btn btn-loading"
                            : "btn btn-primary inline-flex items-center px-4 text-center"
                        }
                        onClick={submitUpdatePassword}
                      >
                        Save
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <ConfirmationModal
            modalState={modalReloadState}
            text={`Do you want to reload page?`}
            smallText={`To see data updated, you need to reload page`}
            handleCloseModal={() => {
              setModalReloadState(false)
              setDataAlert({
                type: "success",
                message:
                  "Successfully changed profile data. Please login again to see the changes.",
              })
              setShowAlert(true)
            }}
            handleSubmit={() => window.location.reload()}
          />
        </>
      )}
    </>
  )
}
