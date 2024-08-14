"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import CompanyLogo from "@/asset/company-logo.png"
import axiosClient from "@/utils/axiosClient"
import { getCookie, hasCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"

import Alert from "@/components/Alert"
import LoadingPage from "@/components/LoadingPage"
import { SiteHeader } from "@/components/site-header"

export default function CompanyProfilePage() {
  const fileInputRef = useRef(null)

  const [activeTab, setActiveTab] = useState("profile")
  const [companyData, setCompanyData] = useState({})
  const [selectedImg, setSelectedImg] = useState(null)
  const [updatedImg, setUpdatedImg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const [validationError, setValidationError] = useState({})

  const [showAlert, setShowAlert] = useState(false)
  const [dataAlert, setDataAlert] = useState({
    type: "",
    message: "",
  })

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    if (hasCookie("jwt")) {
      const token = getCookie("jwt")
      const data = jwtDecode(token)
      setCompanyData({
        name: data.data.client.name,
        logo: data.data.client.logo,
        prefix: data.data.client.prefix,
        address: data.data.client.address,
        city: data.data.client.city,
        postcode: data.data.client.postcode,
        country: data.data.client.country,
        cp_phone_number: data.data.client.phone_number,
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

  const handleUpdate = () => {
    if (updatedImg) {
      setLoading(true)
      const formData = new FormData()
      formData.append("client_logo", updatedImg)
      axiosClient
        .post("/client/update-logo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setCompanyData({
            ...companyData,
            logo: res.data.data.client.client_logo,
          })
          document.cookie = `jwt=${res.data.data.token}; path=/`
          setValidationError({})
          setLoading(false)
          setDataAlert({
            type: "success",
            message: "Success to update data",
          })
          setShowAlert(true)
        })
        .catch((err) => {
          if (err.response.status == 422) {
            setValidationError(JSON.parse(err.response.data.error))
          } else {
            setDataAlert({
              type: "error",
              message: "Error: " + err.response.data.error,
            })
          }
          setShowAlert(true)
          setLoading(false)
        })
    }
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
            <div className="flex flex-row justify-center pt-2">
              <input
                type="radio"
                id="tab-4"
                name="tab-2"
                className={`tab-toggle ${activeTab === "profile" && "active"}`}
                onClick={() => handleTabClick("profile")}
                defaultChecked
              />
              <label htmlFor="tab-4" className="tab tab-bordered px-6">
                Company
              </label>

              <input
                type="radio"
                id="tab-5"
                name="tab-2"
                className={`tab-toggle ${
                  activeTab === "editProfile" && "active"
                }`}
                onClick={() => handleTabClick("editProfile")}
              />
              <label htmlFor="tab-5" className="tab tab-bordered px-6">
                Change Company Logo
              </label>
            </div>
            {/* <TabsUserProfile /> */}

            <div className="flex flex-col items-center pt-5 pb-10">
              <div className="">
                {companyData.logo ? (
                  <img
                    className="h-28 mt-8 mb-4 rounded-full shadow-lg object-cover bg-cover"
                    src={
                      activeTab === "editProfile"
                        ? selectedImg || companyData.logo
                        : companyData.logo
                    }
                    alt="Company Profile"
                    style={{
                      width: 150,
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 mt-8 mb-4 rounded-full shadow-lg object-cover bg-cover">
                    <Image
                      src={CompanyLogo}
                      alt="Compant Logo"
                      className="w-auto h-full"
                    />
                  </div>
                )}
              </div>
              {validationError.client_logo && (
                <p className="text-red-500 text-sm">
                  {validationError.client_logo[0]}
                </p>
              )}

              <div className="pt-4 px-48 tab-content">
                {activeTab === "profile" && (
                  <div className="divide-y-2 w-full">
                    <div className="grid grid-cols-2 gap-10 p-4 border-t-2">
                      <label className="font-bold text-right">
                        Client Name
                      </label>
                      <label className="">{companyData.name}</label>
                    </div>
                    <div className="grid grid-cols-2 gap-10 p-4">
                      <label className="font-bold text-right">
                        Client Prefix
                      </label>
                      <label className="">{companyData.prefix}</label>
                    </div>
                    <div className="grid grid-cols-2 gap-10 p-4">
                      <label className="font-bold text-right">Address</label>
                      <label className="">{companyData.address}</label>
                    </div>
                    <div className="grid grid-cols-2 gap-10 p-4">
                      <label className="font-bold text-right">City</label>
                      <label className="">{companyData.city}</label>
                    </div>
                    <div className="grid grid-cols-2 gap-10 p-4">
                      <label className="font-bold text-right">Postcode</label>
                      <label className="">{companyData.postcode}</label>
                    </div>
                    <div className="grid grid-cols-2 gap-10 p-4">
                      <label className="font-bold text-right">Country</label>
                      <label className="">{companyData.country}</label>
                    </div>
                    <div className="grid grid-cols-2 gap-10 p-4">
                      <label className="font-bold text-right">
                        Phone Number
                      </label>
                      <label className="">{companyData.cp_phone_number}</label>
                    </div>
                  </div>
                )}
                {activeTab === "editProfile" && (
                  <div className="flex items-center flex-col gap-5  w-96 ">
                    <div className="flex mt-2">
                      <button
                        className="btn btn-primary inline-flex items-center text-center hover:bg-black"
                        onClick={handleButtonClick}
                      >
                        Change Company Logo
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="flex mt-2">
                      <button
                        className={
                          loading
                            ? "btn btn-loading"
                            : "btn btn-primary inline-flex items-center text-center hover:bg-black"
                        }
                        onClick={handleUpdate}
                      >
                        {loading ? "Loading" : "Save"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
