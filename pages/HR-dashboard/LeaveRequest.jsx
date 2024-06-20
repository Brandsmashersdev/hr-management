// LeaveRequest.jsx

import React, { useState } from 'react';
import Layout from "../HR-Layout";

const LeaveRequest = () => {
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [leaveMessage, setLeaveMessage] = useState('');
    const [requests, setRequests] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    // Calculate number of leave days
    const calculateLeaveDays = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Include both start and end date
        return daysDiff;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (leaveType === '' || startDate === '' || endDate === '') {
            alert('Please fill out all required fields.');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert('End date must be after start date.');
            return;
        }

        const newRequest = {
            leaveType,
            startDate,
            endDate,
            leaveMessage,
            status: 'pending',
            leaveDays: calculateLeaveDays() // Add number of leave days
        };

        // Update state with the new request
        setRequests([...requests, newRequest]);

        // Reset the form fields after submission
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        setLeaveMessage('');

        alert('Leave request submitted successfully!');

        // Close the modal after submission
        setIsModalOpen(false);
    };

    return (
        <Layout>
                    <button 
                        className="btn create-request-btn" 
                        onClick={() => setIsModalOpen(true)}
                    >
                        Create New Request
                    </button>
            <div className="leave-request-container">
                <div className="left-panel">
               
            <div className="pending-requests">
                <h2>Pending Leave Requests</h2>
                {requests.length > 0 ? (
                    <div className="card-container">
                        {requests.map((request, index) => (
                            request.status === 'pending' && (
                                <div className="request-card" key={index}>
                                    <strong>Type:</strong> {request.leaveType}<br />
                                    <strong>Dates:</strong> {request.startDate} to {request.endDate}<br />
                                    <strong>Days:</strong> {request.leaveDays} days<br />
                                    <strong>Message:</strong> {request.leaveMessage}
                                </div>
                            )
                        ))}
                    </div>
                ) : (
                    <p>No pending requests.</p>
                )}
                 </div>
            </div>
                

                <div className="Approved-Request">
                    <div className="Right-Panel">
                        <h2>Approved Requests</h2>
                        <p>No Approved Requests</p>
                        {/* Add more content or elements as needed */}
                    </div>
                </div>

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button 
                                className="modal-close" 
                                onClick={() => setIsModalOpen(false)}
                            >
                                X
                            </button>
                            <h1>Leave Request Form</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="leaveType">Leave Type:</label>
                                    <select 
                                        id="leaveType" 
                                        value={leaveType} 
                                        onChange={(e) => setLeaveType(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Leave Type</option>
                                        <option value="sick">Sick Leave</option>
                                        <option value="vacation">Vacation Leave</option>
                                        <option value="personal">Personal Leave</option>
                                        {/* Add more leave types as needed */}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startDate">Start Date:</label>
                                    <input 
                                        type="date" 
                                        id="startDate" 
                                        value={startDate} 
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endDate">End Date:</label>
                                    <input 
                                        type="date" 
                                        id="endDate" 
                                        value={endDate} 
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>No. of Leave Days:</label>
                                    <p>{calculateLeaveDays()} days</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="leaveMessage">Additional Message:</label>
                                    <textarea 
                                        id="leaveMessage" 
                                        value={leaveMessage} 
                                        onChange={(e) => setLeaveMessage(e.target.value)}
                                        rows="4" 
                                        placeholder="Enter your message here..."
                                    />
                                </div>
                                <button className="btn" type="submit">Submit</button>
                                <button 
                                    className="btn-secondary" 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default LeaveRequest;
