import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { interfaceConfigOverwrite, configOverwrite } from './config';
import './style.css';  // Ensure this points to your CSS file

const JitsiMeetingComponent = ({ roomName, userName }) => {
    const apiRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);

    const addCustomButton = (api) => {
        const button = document.createElement('button');
        button.innerText = 'View Profile';
        button.id = 'view-profile-button';
        button.style = 'margin-left: 10px; background-color: #0056e0; color: white; padding: 5px 10px; border: none; border-radius: 5px;';
        button.onclick = () => {
            // Fetch user profile data
            // For demonstration purposes, we'll use static data
            const userProfile = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                avatar: 'https://via.placeholder.com/150'
            };
            setProfileData(userProfile);
            setIsModalOpen(true);
        };

        const toolbar = document.querySelector('.toolbox-content-items');
        if (toolbar) {
            toolbar.appendChild(button);
        }
    };

    useEffect(() => {
        const loadJitsiScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://meet.jit.si/external_api.js';
                script.async = true;
                script.onload = resolve;
                document.body.appendChild(script);
            });
        };

        const initializeJitsi = async () => {
            await loadJitsiScript();

            const jitsiNode = document.getElementById('jitsi-container');
            const domain = 'meet.jit.si';

            const options = {
                roomName: roomName,
                parentNode: jitsiNode,
                interfaceConfigOverwrite: interfaceConfigOverwrite,
                configOverwrite: configOverwrite,
                userInfo: {
                    displayName: userName,
                },
            };

            const api = new window.JitsiMeetExternalAPI(domain, options);
            apiRef.current = api;

            // Custom Event Handlers
            api.addEventListener('videoConferenceJoined', () => {
                console.log('Local User Joined');
                // Remove any existing password
                api.executeCommand('password', '');
                // Automatically mute all participants
                api.executeCommand('muteEveryone');

                // Add custom button
                addCustomButton(api);
            });

            api.addEventListener('participantJoined', (event) => {
                console.log('Participant Joined:', event);
            });

            // Auto-mute participants after 5 minutes
            setTimeout(() => {
                api.executeCommand('muteEveryone');
            }, 300000); // 300000 ms = 5 minutes

            // Enable unmute 5 minutes before the end of the session (assuming a 1-hour session)
            setTimeout(() => {
                api.executeCommand('toggleAudio');
            }, 3300000); // 3300000 ms = 55 minutes

            return () => api.dispose();
        };

        initializeJitsi();
    }, [roomName, userName]);

    return (
        <div id="jitsi-container" style={{ height: '100vh', width: '100%' }}>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="User Profile"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    },
                }}
            >
                {profileData && (
                    <div>
                        <h2>{profileData.name}</h2>
                        <p>Email: {profileData.email}</p>
                        <img src={profileData.avatar} alt="Avatar" style={{ borderRadius: '50%' }} />
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default JitsiMeetingComponent;



// import React, { useEffect, useRef } from 'react';
// import { interfaceConfigOverwrite, configOverwrite } from './config';
// import './style.css';  // Ensure this points to your CSS file

// const JitsiMeetingComponent = ({ roomName, userName }) => {
//     const apiRef = useRef(null);

//     const addCustomButton = (api) => {
//         const button = document.createElement('button');
//         button.innerText = 'View Profile';
//         button.id = 'view-profile-button';
//         button.style = 'margin-left: 10px; background-color: #0056e0; color: white; padding: 5px 10px; border: none; border-radius: 5px;';
//         button.onclick = () => {
//             // Open Bubble popup here
//             // Replace with the actual logic to open the Bubble popup with the user's profile
//             alert('View Profile button clicked!');
//         };

//         const toolbar = document.querySelector('.toolbox-content-items');
//         if (toolbar) {
//             toolbar.appendChild(button);
//         }
//     };

//     useEffect(() => {
//         const loadJitsiScript = () => {
//             return new Promise((resolve) => {
//                 const script = document.createElement('script');
//                 script.src = 'https://meet.jit.si/external_api.js';
//                 script.async = true;
//                 script.onload = resolve;
//                 document.body.appendChild(script);
//             });
//         };

//         const initializeJitsi = async () => {
//             await loadJitsiScript();

//             const jitsiNode = document.getElementById('jitsi-container');
//             const domain = 'meet.jit.si';

//             const options = {
//                 roomName: roomName,
//                 parentNode: jitsiNode,
//                 interfaceConfigOverwrite: interfaceConfigOverwrite,
//                 configOverwrite: configOverwrite,
//                 userInfo: {
//                     displayName: userName,
//                 },
//             };

//             const api = new window.JitsiMeetExternalAPI(domain, options);
//             apiRef.current = api;

//             // Custom Event Handlers
//             api.addEventListener('videoConferenceJoined', () => {
//                 console.log('Local User Joined');
//                 // Remove any existing password
//                 api.executeCommand('password', '');
//                 // Automatically mute all participants
//                 api.executeCommand('muteEveryone');

//                 // Add custom button
//                 addCustomButton(api);
//             });

//             api.addEventListener('participantJoined', (event) => {
//                 console.log('Participant Joined:', event);
//             });

//             // Auto-mute participants after 5 minutes
//             setTimeout(() => {
//                 api.executeCommand('muteEveryone');
//             }, 300000); // 300000 ms = 5 minutes

//             // Enable unmute 5 minutes before the end of the session (assuming a 1-hour session)
//             setTimeout(() => {
//                 api.executeCommand('toggleAudio');
//             }, 3300000); // 3300000 ms = 55 minutes

//             return () => api.dispose();
//         };

//         initializeJitsi();
//     }, [roomName, userName]);

//     return <div id="jitsi-container" style={{ height: '100vh', width: '100%' }} />;
// };

// export default JitsiMeetingComponent;
