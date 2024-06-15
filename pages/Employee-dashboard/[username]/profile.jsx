import { useRouter } from 'next/router';
import Layout from '../../Layout';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaPhone, FaEnvelope, FaCamera, FaTrash, FaArrowLeft, FaLinkedin } from 'react-icons/fa';

export default function ProfilePage() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [userInfo, setUserInfo] = useState({
      name: '',
      image:'',
      designation: '',
      email: '',
      phoneNumber: '',
      address: '',
      hireDate: '',
      dob: '',
      age: '',
      whatsappNumber: '',
      emergencyContact: '',
      department: '',
      employmentType: '',
      workingHours: '', // Default value for Full-Time
    });
    const handleGoBack = () => {
                setIsEditing(false);
            };

            function calculateAge(dobString) {
                const dob = new Date(dobString);
                const today = new Date();
                let age = today.getFullYear() - dob.getFullYear();
                const monthDifference = today.getMonth() - dob.getMonth();
                const dayDifference = today.getDate() - dob.getDate();
                // Adjust age if today's date is before the birthday in the current year
                if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
                    age--;
                }
                return age;
            }
            
    const router = useRouter();
    const { username } = router.query;
    const fileInputRef = useRef(null);
  
    useEffect(() => {
      if (username) {
        fetchProfileData(username);
      }
    }, [username]);
    useEffect(() => {
      if (profileData) {
        setUserInfo({
          username: profileData.username || '',
          name: profileData.name || '',
          image:profileData.image|| '',
          designation: profileData.designation || '',
          email: profileData.email || '',
          phoneNumber: profileData.phoneNumber || '+1 123-456-7890',
          address: profileData.address || '',
          hireDate: profileData.hireDate || '',
          dob: profileData.dob || '',
          age: calculateAge(profileData.dob) || '',
          whatsappNumber: profileData.whatsappNumber || '+1 123-456-7890',
          emergencyContact: profileData.emergencyContact || '+1 987-654-3210',
          department: profileData.department || 'Engineering',
          employmentType: profileData.employmentType || 'Full-Time',
          workingHours: profileData.workingHours || '9:00 AM - 6:00 PM', // Default value for Full-Time
        });
      }
    }, [profileData]);
  
    const fetchProfileData = async (username) => {
      try {
        const response = await axios.get(`/api/profile/${username}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
  
    
    const handleSave = async () => {
      try {
        const response = await axios.post('/api/updateUserInfo', userInfo);
        if (response.status === 200) {
          setIsEditing(false); // Exit editing mode after successful save
          fetchProfileData(username); // Refresh profile data after save
        } else {
          throw new Error('Failed to update user info');
        }
      } catch (error) {
        console.error('Error updating user info:', error);
      }
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result; // This is the URL of the selected image
      console.log('Image URL:', imageUrl); // Print the URL to the console
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
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [name]: value,
        ...(name === 'dob' && { age: calculateAge(value) })
      }));
    };
    
    const handleAddImage = () => {
      fileInputRef.current.click();
    };
  
    const handleRemoveImage = () => {
      setImage(null);
      setPreview(null);
    };
  
    const defaultImage = '/img/image.png';

  return (
    <Layout>
      {profileData && (
            <div className="profile-container">
                <h2 className="welcome-message">Welcome, {profileData.username}</h2>
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
                        <div className="detail"><strong>Username:</strong> {userInfo.username}</div>
                        {isEditing ? (
                        <div className="detail">
                            <strong>Date of Birth:</strong>
                            <input
                                type="date"
                                name="dob"
                                value={userInfo.dob}
                                onChange={handleInputChange}
                            />
                        </div>
                    ) : (
                        <div className="detail"><strong>Date of Birth:</strong> {userInfo.dob}</div>
                    )}
                        {/* <div className="detail"><strong>Date of Birth:</strong> {userInfo.dob}</div> */}
                        <div className="detail"><strong>Date of Joining:</strong> {userInfo.hireDate}</div>
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
                                    <strong>Email:</strong>
                                    <input
                                        type="text"
                                        name="linkedin"
                                        value={userInfo.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="detail">
                                    <strong>Address:</strong>
                                    <input
                                        type="text"
                                        name="address"
                                        value={userInfo.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="detail"><strong>Phone Number:</strong> {userInfo.phoneNumber}</div>
                                <div className="detail"><strong>WhatsApp Number:</strong> {userInfo.whatsappNumber}</div>
                                <div className="detail"><strong>Emergency Contact:</strong> {userInfo.emergencyContact}</div>
                                <div className="detail"><strong>Email:</strong> {userInfo.email}</div>
                                <div className="detail"><strong>Address:</strong> {userInfo.address}</div>
                            </>
                        )}
    
                        <h3>Additional Details</h3>
                        <div className="detail"><strong>Department:</strong> {userInfo.department}</div>
                        <div className="detail"><strong>Employment Type:</strong> {userInfo.employmentType}</div>
                        <div className="detail"><strong>Working Hours:</strong> {userInfo.workingHours}</div>
    
                        {isEditing && (
                            <>
                                <button className="save-button" onClick={handleSave}>Save</button>
                                <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )}
            </Layout>
  );
}
