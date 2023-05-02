import React, { useEffect, useRef } from 'react'
import './main.css'

const FormAnim = () => {
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const mailRef = useRef(null);
    const msgRef = useRef(null);
    const sendBtnRef = useRef(null);
    const formCardRef = useRef(null);

    const links = {
        left: "translateX(0)",
        right: "translateX(0)",
        top: "translateY(0)",
        bottom: "translateX(0)"
    };
    const linksReverse = {
        left: "translateX(10%)",
        right: "translateX(-10%)",
        top: "translateY(10%)",
        bottom: "translateY(-10%)"
    };

    const lines = [
        'branch_right_1', 'branch_right_2', 'branch_right_3', 'branch_right_4',
        'branch_top_1', 'branch_top_2', 'branch_top_3', 'branch_top_4',
        'branch_left_1', 'branch_left_2', 'branch_left_3', 'branch_left_4',
        'branch_bottom_1', 'branch_bottom_2', 'branch_bottom_3', 'branch_bottom_4'
    ]

    function typeText(inputRef, text) {
        return new Promise((resolve, reject) => {
            let i = 0;
            const intervalId = setInterval(() => {
                if (inputRef.current !== null) {
                    inputRef.current.value = text.slice(0, i);
                    i++;
                    if (i > text.length) {
                        clearInterval(intervalId);
                    }
                } else resolve();
            }, 150);
            setTimeout(resolve, 150 * (text.length + 1))
        })
    }

    function clickButton() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (sendBtnRef.current !== null)
                    sendBtnRef.current.style.transform = "scale(.95)"
                setTimeout(() => {
                    if (sendBtnRef.current !== null)
                        sendBtnRef.current.style.transform = "scale(1)"
                    if (formCardRef.current !== null)
                        formCardRef.current.classList.add('is-flipped');
                }, 100)
            }, 1000)
            resolve();
        })
    }

    const backSideAnimation = async () => {

        await new Promise(resolve => setTimeout(resolve, 600));
        for (let link in links) {
            const linkElement = document.getElementById(link);
            if (linkElement !== null) {
                const childLinks = linkElement.querySelectorAll("*")
                childLinks.forEach((child) => {
                    child.style.transform = links[link];
                });
            } else return
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
        for (let line in lines) {
            const branches = document.getElementById(lines[line]);
            if (branches !== null) {
                const childLines = branches.querySelectorAll("path");
                childLines.forEach((line) => {
                    line.classList.add("draw");
                })
            } else return
        }
        await new Promise(resolve => setTimeout(resolve, 1200))
        for (let circle in lines) {
            const circleGrp = document.getElementById(lines[circle]);
            if (circleGrp !== null) {
                const childCircle = circleGrp.querySelectorAll("circle");
                const image = circleGrp.querySelectorAll('image');
                childCircle.forEach((circle) => {
                    circle.style.opacity = 1;
                })
                image.forEach((img) => {
                    img.style.opacity = 1;
                })
            } else return
        }

        const inputRef = [nameRef, phoneRef, mailRef, msgRef]
        inputRef.forEach((input) => {
            if (input.current !== null)
                input.current.value = '';
        })

        setTimeout(() => {
            if (formCardRef.current !== null)
                formCardRef.current.classList.remove('is-flipped');
            else return;
            setTimeout(() => {
                resetAnimation()
                loadAnim()
            }, 500)
        }, 2500)
    }

    const resetAnimation = async () => {

        for (let link in linksReverse) {
            const linkElement = document.getElementById(link);
            if (linkElement !== null) {
                const childLinks = linkElement.querySelectorAll("*");
                childLinks.forEach((child) => {
                    child.style.transform = linksReverse[link];
                });
            }
        }

        for (let line in lines) {
            const branches = document.getElementById(lines[line]);
            if (branches !== null) {
                const childLines = branches.querySelectorAll("path");
                childLines.forEach((line) => {
                    line.classList.remove("draw");
                })
            }
        }

        for (let circle in lines) {
            const circleGrp = document.getElementById(lines[circle]);
            if (circleGrp !== null) {
                const childCircle = circleGrp.querySelectorAll("circle");
                const image = circleGrp.querySelectorAll('image');
                childCircle.forEach((circle) => {
                    circle.style.opacity = 0;
                })
                image.forEach((img) => {
                    img.style.opacity = 0;
                })
            }
        }
    }

    async function loadAnim() {
        await typeText(nameRef, 'Prajil')
        await typeText(phoneRef, '8129721766')
        await typeText(mailRef, 'prajilk@gmail.com')
        await typeText(msgRef, "Hi, Try using formease it's free!")
        await clickButton()
        backSideAnimation()
    }

    useEffect(() => {
        loadAnim();
    });

    return (
        <div className="card">
            <div className="card__inner" ref={formCardRef}>
                <div className="card__face card__face--front">
                    <div className="input-con">
                        <h1>New Contact Form</h1>
                        <p>We are here to help.</p>
                        <input className="rowtext" id="name" placeholder="Name*" ref={nameRef} spellCheck="false"
                            disabled />
                        <input className="rowtext" id="phone" placeholder="Phone" ref={phoneRef} spellCheck="false" disabled />
                        <input id="mail" placeholder="Email*" spellCheck="false" disabled ref={mailRef} />
                        <textarea id="msg" cols="22" rows="3" placeholder="Message..." ref={msgRef} spellCheck="false"
                            disabled></textarea>
                        <button className="send-btn" ref={sendBtnRef} id="btn" disabled>Send now</button>
                    </div>
                </div>
                <div className="card__face card__face--back">
                    <div className="card__content">
                        <svg width="350" height="350" viewBox="0 0 340 350" fill="none"
                            xmlns="http://www.w3.org/2000/svg">

                            <defs>
                                <linearGradient id="gradientBorder" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#005cb8" />
                                    <stop offset="100%" stopColor="#0077b8" />
                                </linearGradient>
                            </defs>

                            <rect width="350" height="350" />
                            <g id="Frame-1">
                                <rect width="350" height="350" />
                                <g id="link_bottom_grp">
                                    <g id="branch_bottom_4">
                                        <circle id="shadow_bottom_3" cx="123" cy="264" r="15" fill="#5BDCF7"
                                            filter="blur(10px)" opacity="0" />
                                        <circle id="circle_bottom_4" cx="123" cy="264" r="10" fill="#5BDCF7"
                                            opacity="0" />
                                        <path id="line_bottom_4"
                                            d="M148 213V226.5V240.802C148 244.334 146.137 247.604 143.098 249.405L134.5 254.5L129 258"
                                            stroke="#5BDCF7" strokeWidth="2" strokeDasharray="140"
                                            strokeDashoffset="140" />
                                    </g>
                                    <g id="branch_bottom_3">
                                        <circle id="circle_bottom_3" cx="164" cy="287" r="30" fill="#5BDCF7"
                                            opacity="0" />
                                        <image href="pics/server.png" x="144" y="267" width="40" height="40"
                                            opacity="0" />
                                        <path id="line_bottom_3" d="M163 214V257" stroke="#5BDCF7" strokeWidth="2"
                                            strokeLinecap="round" strokeDasharray="140" strokeDashoffset="140" />
                                    </g>
                                    <g id="branch_bottom_2">
                                        <circle id="circle_bottom_2" cx="178.5" cy="243.5" r="5" stroke="#5BDCF7"
                                            strokeWidth="5" opacity="0" />
                                        <path id="line_bottom_2" d="M178 214V236.5" stroke="#5BDCF7" strokeWidth="2"
                                            strokeLinecap="round" strokeDasharray="140" strokeDashoffset="140" />
                                    </g>
                                    <g id="branch_bottom_1">
                                        <circle id="circle_bottom_1" cx="211.5" cy="259.5" r="5" stroke="#5BDCF7"
                                            strokeWidth="5" opacity="0" />
                                        <path id="line_bottom_1"
                                            d="M193 213.5V228.5V242.802C193 246.334 194.863 249.604 197.902 251.405L206.5 256.5"
                                            stroke="#5BDCF7" strokeWidth="2" strokeDasharray="140"
                                            strokeDashoffset="140" />
                                    </g>

                                    <g id="bottom">
                                        <g id="bottom-4">
                                            <circle id="shadow-bottom-4" cx="148" cy="220" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="link_bottom_4" x="145" y="210" width="6" height="15" rx="3"
                                                fill="#5BDCF7" />
                                        </g>

                                        <g id="bottom-3">
                                            <circle id="shadow-bottom-3" cx="163" cy="220" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="link_bottom_3" x="160" y="210" width="6" height="15" rx="3"
                                                fill="#5BDCF7" />
                                        </g>

                                        <g id="bottom-2">
                                            <circle id="shadow-bottom-2" cx="178" cy="220" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="link_bottom_2" x="175" y="210" width="6" height="15" rx="3"
                                                fill="#5BDCF7" />
                                        </g>

                                        <g id="bottom-1">
                                            <circle id=" shadow-bottom-1" cx="193" cy="220" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="link_bottom_1" x="190" y="210" width="6" height="15" rx="3"
                                                fill="#5BDCF7" />
                                        </g>
                                    </g>
                                </g>
                                <g id="link_top_grp">
                                    <g id="branch_top_4">
                                        <circle id="circle_top_4" cx="120.5" cy="73.5" r="5" stroke="#5BDCF7"
                                            strokeWidth="5" opacity="0" />
                                        <path id="line_top_4"
                                            d="M148 126.5V109V94.698C148 91.1659 146.137 87.8958 143.098 86.0951L134.5 81L127 77"
                                            stroke="#5BDCF7" strokeWidth="2" strokeDasharray="140"
                                            strokeDashoffset="140" />
                                    </g>
                                    <g id="branch_top_3">
                                        <circle id="shadow_top_3" cx="163" cy="96.5" r="12" fill="#5BDCF7"
                                            filter="blur(10px)" opacity="0" />
                                        <circle id="circle_top_3" cx="163" cy="96.5" r="7.5" fill="#5BDCF7"
                                            opacity="0" />
                                        <path id="line_top_3" d="M163 125.5V104" stroke="#5BDCF7" strokeWidth="2"
                                            strokeLinecap="round" strokeDasharray="140" strokeDashoffset="140" />
                                    </g>
                                    <g id="branch_top_2">
                                        <circle id="circle_top_2" cx="178.5" cy="73.5" r="5" stroke="#5BDCF7"
                                            strokeWidth="5" opacity="0" />
                                        <path id="line_top_2" d="M178 125.5V81" stroke="#5BDCF7" strokeWidth="2"
                                            strokeLinecap="round" strokeDasharray="140" strokeDashoffset="140" />
                                    </g>
                                    <g id="branch_top_1">
                                        <circle id="circle_top_1" cx="231" cy="73" r="30" fill="#5BDCF7" opacity="0" />
                                        <image href="pics/db.png" x="208" y="49" width="46" height="49.62"
                                            opacity="0" />
                                        <path id="line_top_1"
                                            d="M193 126V118V103.698C193 100.166 194.863 96.8958 197.902 95.0951L206.5 90"
                                            stroke="#5BDCF7" strokeWidth="2" strokeDasharray="140"
                                            strokeDashoffset="140" />
                                    </g>

                                    <g id="top">
                                        <g id="top-4">
                                            <circle id="shadow_top_4" cx="148" cy="125" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="link_top_4" x="145" y="115" width="6" height="15" rx="3"
                                                fill="#5BDCF7" />
                                        </g>

                                        <g id="top-3">
                                            <circle id="shadow_top_3" cx="163" cy="125" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="link_top_3" x="160" y="115" width="6" height="15" rx="3"
                                                fill="#5BDCF7" />
                                        </g>

                                        <g id="top-2">
                                            <circle id="shadow_top_2" cx="178" cy="125" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="link_top_2" x="175" y="115" width="6" height="15" rx="3"
                                                fill="#5BDCF7" />
                                        </g>

                                        <g id="top-1">
                                            <circle id="shadow_top_1" cx="193" cy="125" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="link_top_1" x="190" y="115" width="6" height="15" rx="3"
                                                fill="#5BDCF7" />
                                        </g>
                                    </g>
                                </g>
                                <g id="link_left_grp">
                                    <g id="branch_left_4">
                                        <circle id="circle_left_4" cx="54" cy="215" r="7.5" stroke="#5BDCF7"
                                            strokeWidth="5" opacity="0" />
                                        <path id="line_left_4"
                                            d="M126.5 193H85.5H71.198C67.6659 193 64.3958 194.863 62.5951 197.902L57.5 206.5"
                                            stroke="#5BDCF7" strokeWidth="2" strokeDasharray="140"
                                            strokeDashoffset="140" />
                                    </g>
                                    <g id="branch_left_3">
                                        <circle id="circle_left_3" cx="88.5" cy="178.5" r="5" stroke="#5BDCF7"
                                            strokeWidth="5" opacity="0" />
                                        <path id="line_left_3" d="M126 178H96" stroke="#5BDCF7" strokeWidth="2"
                                            strokeLinecap="round" strokeDasharray="140" strokeDashoffset="140" />
                                    </g>
                                    <g id="branch_left_2">
                                        <circle id="circle_left_2" cx="34" cy="162" r="30" fill="#5BDCF7" opacity="0" />
                                        <image href="pics/form.png" x="16" y="144" width="35" height="35"
                                            opacity="0" />
                                        <path id="line_left_2" d="M125.5 163H63" stroke="#5BDCF7" strokeWidth="2"
                                            strokeLinecap="round" strokeDasharray="140" strokeDashoffset="140" />
                                    </g>
                                    <g id="branch_left_1">
                                        <circle id="shadow_left_1" cx="77" cy="127" r="15" fill="#5BDCF7"
                                            filter="blur(10px)" opacity="0" />
                                        <circle id="circle_left_1" cx="77" cy="127" r="10" fill="#5BDCF7" opacity="0" />
                                        <path id="line_left_1"
                                            d="M126 148H109.5H95.198C91.6659 148 88.3958 146.137 86.5951 143.098L81.5 134.5"
                                            stroke="#5BDCF7" strokeWidth="2" strokeDasharray="140"
                                            strokeDashoffset="140" />
                                    </g>

                                    <g id="left">
                                        <g id="left-4">
                                            <circle id="shadow_left_4" cx="125" cy="193" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="link_left_4" x="115" y="190" width="15" height="6" rx="3"
                                                fill="#5BDCF7" />
                                        </g>

                                        <g id="left-3">
                                            <circle id="shadow_left_3" cx="125" cy="178" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="link_left_3" x="115" y="175" width="15" height="6" rx="3"
                                                fill="#5BDCF7" />
                                        </g>

                                        <g id="left-2">
                                            <circle id="shadow_left_2" cx="125" cy="163" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="link_left_2" x="115" y="160" width="15" height="6" rx="3"
                                                fill="#5BDCF7" />
                                        </g>

                                        <g id="left-1">
                                            <circle id="shadow_left_1" cx="125" cy="148" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="link_left_1" x="115" y="145" width="15" height="6" rx="3"
                                                fill="#5BDCF7" />
                                        </g>
                                    </g>
                                </g>
                                <g id="link_right_grp">
                                    <g id="branch_right_4">
                                        <circle id="circle_right_4" cx="283" cy="232" r="30" fill="#5BDCF7"
                                            opacity="0" />
                                        <image href="pics/cloud.png" x="262" y="216" width="44" height="29.92"
                                            opacity="0" />
                                        <path id="line_right_4"
                                            d="M214 193H241.5H255.802C259.334 193 262.604 194.863 264.405 197.902L269.5 206.5"
                                            stroke="#5BDCF7" strokeWidth="2" strokeDasharray="140"
                                            strokeDashoffset="140" />
                                    </g>
                                    <g id="branch_right_3">
                                        <circle id="circle_right_3" cx="280.5" cy="177.5" r="5" stroke="#5BDCF7"
                                            strokeWidth="5" opacity="0" />
                                        <path id="line_right_3" d="M214 178H273.5" stroke="#5BDCF7" strokeWidth="2"
                                            strokeLinecap="round" strokeDasharray="140" strokeDashoffset="140" />
                                    </g>
                                    <g id="branch_right_2">
                                        <circle id="shadow_right_2" cx="292" cy="142" r="15" fill="#5BDCF7"
                                            filter="blur(10px)" opacity="0" />
                                        <circle id="circle_right_2" cx="292" cy="142" r="10" fill="#5BDCF7"
                                            opacity="0" />
                                        <path id="line_right_2"
                                            d="M213.5 163H260.5H274.802C278.334 163 281.604 161.137 283.405 158.098L288.5 149.5"
                                            stroke="#5BDCF7" strokeWidth="2" strokeDasharray="140"
                                            strokeDashoffset="140" />
                                    </g>
                                    <g id="branch_right_1">
                                        <circle id="circle_right_1" cx="261.5" cy="147.5" r="5" stroke="#5BDCF7"
                                            strokeWidth="5" opacity="0" />
                                        <path id="line_right_1" d="M214 148H255" stroke="#5BDCF7" strokeWidth="2"
                                            strokeLinecap="round" strokeDasharray="140" strokeDashoffset="140" />
                                    </g>

                                    <g id="right">
                                        <g id="right-1">
                                            <circle id="shadow 5_4" cx="220" cy="193" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="Rectangle 5_4" x="210" y="190" width="15" height="6" rx="3"
                                                fill="#5BDCF7" />
                                        </g>

                                        <g id="right-1">
                                            <circle id="shadow 4_4" cx="220" cy="178" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="Rectangle 4_4" x="210" y="175" width="15" height="6" rx="3"
                                                fill="#5BDCF7" />
                                        </g>

                                        <g id="right-1">
                                            <circle id="shadow 3_4" cx="220" cy="163" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="Rectangle 3_4" x="210" y="160" width="15" height="6" rx="3"
                                                fill="#5BDCF7" />
                                        </g>

                                        <g id="right-1">
                                            <circle id="shadow 2_4" cx="220" cy="148" r="8" fill="#5BDCF7"
                                                strokeWidth="5" filter="blur(10px)" />
                                            <rect id="Rectangle 2_4" x="210" y="145" width="15" height="6" rx="3"
                                                fill="#5BDCF7" />
                                        </g>
                                    </g>
                                </g>
                                <rect id="logo_container" x="130" y="130" width="80" height="80" rx="6" fill="#2343B5"
                                    stroke="url(#gradientBorder)" strokeWidth="10" />
                                <image href="logo.png" x="142" y="149" width="55" height="42.34" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAnim;
