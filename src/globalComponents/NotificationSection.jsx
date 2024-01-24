import React from 'react';

function NotificationSection() {
    return (
            <ul className="navbar-item flex-row navbar-dropdown">
                <li className="nav-item dropdown language-dropdown more-dropdown">
                    <div className="dropdown  custom-dropdown-icon">
                        <a className="nav-link dropdown-toggle" href="#" id="customDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="/convergence/assets/img/flag-ca.svg" className="flag-width" alt="flag" /><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg></a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="customDropdown">
                            <a className="dropdown-item" data-img-value="flag-de" data-value="German" href="#"><img src="/convergence/assets/img/flag-de.svg" className="flag-width" alt="flag" /> German</a>
                            <a className="dropdown-item" data-img-value="flag-sp" data-value="Japanese" href="#"><img src="/convergence/assets/img/flag-sp.svg" className="flag-width" alt="flag" /> Spanish</a>
                            <a className="dropdown-item" data-img-value="flag-fr" data-value="French" href="#"><img src="/convergence/assets/img/flag-fr.svg" className="flag-width" alt="flag" /> French</a>
                            <a className="dropdown-item" data-img-value="flag-ca" data-value="English" href="#"><img src="/convergence/assets/img/flag-ca.svg" className="flag-width" alt="flag" /> English</a>
                        </div>
                    </div>
                </li>
                <li className="nav-item dropdown message-dropdown">
                    <a href="#" className="nav-link dropdown-toggle" id="messageDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg><span className="badge badge-primary" />
                    </a>
                    <div className="dropdown-menu position-absolute" aria-labelledby="messageDropdown">
                        <div>
                            <a className="dropdown-item">
                                <div >
                                    <div className="media">
                                        <div className="user-img">
                                            <div className="avatar avatar-xl">
                                                <span className="avatar-title rounded-circle">KY</span>
                                            </div>
                                        </div>
                                        <div className="media-body">
                                            <div >
                                                <h5 className="usr-name">Kara Young</h5>
                                                <p className="msg-title">ACCOUNT UPDATE</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a className="dropdown-item">
                                <div >
                                    <div className="media">
                                        <div className="user-img">
                                            <div className="avatar avatar-xl">
                                                <span className="avatar-title rounded-circle">DA</span>
                                            </div>
                                        </div>
                                        <div className="media-body">
                                            <div >
                                                <h5 className="usr-name">Daisy Anderson</h5>
                                                <p className="msg-title">ACCOUNT UPDATE</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a className="dropdown-item">
                                <div >
                                    <div className="media">
                                        <div className="user-img">
                                            <div className="avatar avatar-xl">
                                                <span className="avatar-title rounded-circle">OG</span>
                                            </div>
                                        </div>
                                        <div className="media-body">
                                            <div >
                                                <h5 className="usr-name">Oscar Garner</h5>
                                                <p className="msg-title">ACCOUNT UPDATE</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </li>
                <li className="nav-item dropdown notification-dropdown">
                    <a href="#" className="nav-link dropdown-toggle" id="notificationDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg><span className="badge badge-success" />
                    </a>
                    <div className="dropdown-menu position-absolute" aria-labelledby="notificationDropdown">
                        <div className="notification-scroll">
                            <div className="dropdown-item">
                                <div className="media server-log">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-server"><rect x={2} y={2} width={20} height={8} rx={2} ry={2} /><rect x={2} y={14} width={20} height={8} rx={2} ry={2} /><line x1={6} y1={6} x2={6} y2={6} /><line x1={6} y1={18} x2={6} y2={18} /></svg>
                                    <div className="media-body">
                                        <div className="data-info">
                                            <h6 >Server Rebooted</h6>
                                            <p >45 min ago</p>
                                        </div>
                                        <div className="icon-status">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-item">
                                <div className="media ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                    <div className="media-body">
                                        <div className="data-info">
                                            <h6 >Licence Expiring Soon</h6>
                                            <p >8 hrs ago</p>
                                        </div>
                                        <div className="icon-status">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-item">
                                <div className="media file-upload">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1={16} y1={13} x2={8} y2={13} /><line x1={16} y1={17} x2={8} y2={17} /><polyline points="10 9 9 9 8 9" /></svg>
                                    <div className="media-body">
                                        <div className="data-info">
                                            <h6 >Kelly Portfolio.pdf</h6>
                                            <p >670 kb</p>
                                        </div>
                                        <div className="icon-status">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
    )
}

export default NotificationSection