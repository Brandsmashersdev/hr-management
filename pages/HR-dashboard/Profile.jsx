import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaPhone, FaEnvelope, FaCamera, FaTrash, FaArrowLeft, FaLinkedin } from 'react-icons/fa';
import Layout from "../HR-Layout";

const Profile = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [userInfo, setUserInfo] = useState({
        name: "Hitanshi Lalwani",
        designation: "Software Engineer",
        email: "hitanshi@example.com",
        phoneNumber: "+1 123-456-7890",
        address: "123 Main St, Springfield, USA",
        hireDate: "January 1, 2020",
        dob: "January 1, 2002 ",
        age: 22,
        whatsappNumber: "+1 123-456-7890",
        emergencyContact: "+1 987-654-3210",
        linkedin: "https://www.linkedin.com/in/johndoe",
        department: "Engineering",
        workingHours: "9 AM - 5 PM",
        employmentType: "Full-Time"
    });

    const [employmentTypeOptions] = useState(["Full-Time", "Part-Time"]);
    const [departmentOptions] = useState(["Development", "HR Management", "Others"]);
    const [workingHoursOptions, setWorkingHoursOptions] = useState([
        "9:30 AM - 6:30 PM",
        "10:30 AM - 7:30 PM",
        "2:00 PM - 6:30 PM",
        "3:00 PM - 7:30 PM"
    ]);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (userInfo.employmentType === "Full-Time") {
            setWorkingHoursOptions(["9:00 AM - 6:00 PM", "10:00 AM - 7:00 PM"]);
        } else if (userInfo.employmentType === "Part-Time") {
            setWorkingHoursOptions(["2:00 PM - 6:00 PM", "3:00 PM - 7:00 PM"]);
        }
    }, [userInfo.employmentType]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleAddImage = () => {
        fileInputRef.current.click();
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleGoBack = () => {
        setIsEditing(false);
    };

    const defaultImage = "/img/image.png"; // Path to your default image

    return (
        <Layout>
        <div className="profile-container">
            <h2 className="welcome-message">Welcome, Hitanshi</h2>
            <div className="profile-and-details">
                <div className="profile-box">
                    <div className="profile-content">
                        <div className="profile-photo-container">
                    {isEditing && (
                        <div className="back-arrow" onClick={handleGoBack}>
                            <FaArrowLeft />
                        </div>
                    )}
                            {!preview && <img src={defaultImage} alt="Default Profile" className="profile-photo" />}
                            {preview && <img src={preview} alt="Profile Preview" className="profile-photo" />}
                            {isEditing && (
                                <div className="photo-hover-options">
                                    <button className="edit-button" onClick={handleAddImage}>
                                        <FaCamera />
                                        {image ? "Change Image" : "Add Image"}
                                    </button>
                                    {image && (
                                        <button className="edit-button" onClick={handleRemoveImage}>
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
                            )}
                            {!isEditing && (
                                <div className="edit-icon" onClick={handleEditClick}>
                                    <FaEdit />
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                        <div className="user-info">
                            <p className="user_name">{userInfo.name}</p>
                            <p className="designation">{userInfo.designation}</p>
                        </div>
                    </div>
                </div>
                
                {/* Additional Details Card */}
                <div className="additional-details">
                    <h3>Personal Information</h3>
                    <div className="detail"><strong>Name:</strong> {userInfo.name}</div>
                    {isEditing ? (
                        <div className="detail">
                            <strong>Date of Birth:</strong>
                            <input
                                type="text"
                                name="dob"
                                value={userInfo.dob}
                                onChange={handleInputChange}
                            />
                        </div>
                    ) : (
                        <div className="detail"><strong>Date of Birth:</strong> {userInfo.dob}</div>
                    )}
                    {isEditing ? (
                        <div className="detail">
                            <strong>Date of Joining:</strong>
                            <input
                                type="text"
                                name="hireDate"
                                value={userInfo.hireDate}
                                onChange={handleInputChange}
                            />
                        </div>
                    ) : (
                        <div className="detail"><strong>Date of Joining:</strong> {userInfo.hireDate}</div>
                    )}
                    <div className="detail"><strong>Age:</strong> {userInfo.age}</div>
                    {isEditing ? (
                        <>
                            <div className="detail">
                                <strong>Phone Number:</strong>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={userInfo.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="detail">
                                <strong>WhatsApp Number:</strong>
                                <input
                                    type="text"
                                    name="whatsappNumber"
                                    value={userInfo.whatsappNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="detail">
                                <strong>Emergency Contact:</strong>
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    value={userInfo.emergencyContact}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="detail">
                                <strong>LinkedIn:</strong>
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={userInfo.linkedin}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="detail"><strong>Phone Number:</strong> {userInfo.phoneNumber}</div>
                            <div className="detail"><strong>WhatsApp Number:</strong> {userInfo.whatsappNumber}</div>
                            <div className="detail"><strong>Emergency Contact:</strong> {userInfo.emergencyContact}</div>
                            <div className="detail"><strong>LinkedIn:</strong> <a href={userInfo.linkedin} target="_blank" rel="noopener noreferrer">{userInfo.linkedin}</a></div>
                        </>
                    )}

                    <h3>Additional Details</h3>
                    {isEditing ? (
                        <>
                            <div className="detail">
                                <strong>Department:</strong>
                                <select
                                    name="department"
                                    value={userInfo.department}
                                    onChange={handleInputChange}
                                >
                                    {departmentOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="detail">
                                <strong>Employment Type:</strong>
                                <select
                                    name="employmentType"
                                    value={userInfo.employmentType}
                                    onChange={handleInputChange}
                                >
                                    {employmentTypeOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="detail">
                                <strong>Working Hours:</strong>
                                <select
                                    name="workingHours"
                                    value={userInfo.workingHours}
                                    onChange={handleInputChange}
                                >
                                    {workingHoursOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="detail"><strong>Department:</strong> {userInfo.department}</div>
                            <div className="detail"><strong>Employment Type:</strong> {userInfo.employmentType}</div>
                            <div className="detail"><strong>Working Hours:</strong> {userInfo.workingHours}</div>
                        </>
                    )}

                    {isEditing && (
                        <>
                            <button className="save-button" onClick={handleEditClick}>Save</button>
                            <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </>
                    )}
                </div>
            </div>
        </div>
        </Layout>
    );
}

export default Profile;
