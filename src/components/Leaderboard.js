import React, { useEffect, useState } from 'react'
import img1 from '../assets/Dashboardbg.jpg'
import '../styles/leader.css'

export default function Leaderboard() {

    const [animateCards, setAnimateCards] = useState(false);
    const [top1, setTop1] = useState(0);
    const [top2, setTop2] = useState(0);
    const [top3, setTop3] = useState(0);

    useEffect(() => {

        setAnimateCards(true);
        animateNumbers();

    }, []);

    const animateNumbers = () => {
        let k = 0, i = 0, j = 0;
        const interval1 = setInterval(() => {
            if (i >= 551 && j >= 600 && k >= 700) {
                setTop1(551);
                setTop2(600);
                setTop3(700);
                clearInterval(interval1);
            } else {
                i >= 551 ? i = 551 : i += 2;
                j >= 600 ? j = 600 : j += 2;
                k >= 700 ? k = 700 : k += 2;
                setTop1(i);
                setTop2(j);
                setTop3(k);
            }
        });
    }

    return (
        <div className='text-center'>

            <h1 className='p-3' style={{ color: "white", fontSize: "500%" }}>LeaderBoards</h1>

            <div className='leaderbody'>

                <div className='topuser row'>

                    <div className='col-lg-4'>

                        <div className={animateCards ? 'card' : 'opacity-0'} style={{ border: "3px solid yellow" }}>

                            <div style={{ marginTop: "-30%", alignItems: "center" }}>
                                <img src={img1} alt='photo1' style={{ border: "5px solid yellow" }} />
                            </div>
                            <div className='card-body text-center' style={{ marginTop: "12.5%", marginBottom: "12.5%" }}>
                                <h1>Hamood Arif Siddiqui</h1>
                                <div className='card bg-primary mt-3 mb-3' style={{ width: "auto", fontSize: "130%" }}>Professional</div>
                                <h1 style={{ fontSize: "600%" }}>{top1}</h1>
                                <h3>Questions</h3>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-4'>

                        <div className={animateCards ? 'card' : 'opacity-0'} style={{ border: "3px solid aqua", marginTop: "35%" }}>

                            <div style={{ marginTop: "-30%", alignItems: "center" }}>
                                <img src={img1} alt='photo1' style={{ border: "5px solid aqua" }} />
                            </div>
                            <div className='card-body text-center' style={{ marginTop: "5%", marginBottom: "5%" }}>
                                <h1>Utkarsh Vardhan Singh</h1>
                                <div className='card bg-primary mt-3 mb-3' style={{ width: "auto", fontSize: "130%" }}>Professional</div>
                                <h1 style={{ fontSize: "600%" }}>{top2}</h1>
                                <h3>Questions</h3>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-4'>
                        <div style={{ fontSize: "150%" }}>
                            <span style={{ padding: "2% 4% 2% 4%", backgroundColor: "rgba(0,0,0,1)", color: "white", borderRadius: "10px", border: "1px solid white", marginRight: "1%" }}>Criteria: </span>
                            <select style={{ padding: "2% 10% 2% 10%", backgroundColor: "rgba(0,0,0,1)", color: "white", borderRadius: "10px", border: "1px solid white" }}>
                                <option>No. Of Answers</option>
                                <option>Rating</option>
                            </select>
                        </div>
                        <div className={animateCards ? 'card' : 'opacity-0'} style={{ border: "3px solid green", marginTop: "40%" }}>

                            <div style={{ marginTop: "-30%", alignItems: "center" }}>
                                <img src={img1} alt='photo1' style={{ border: "5px solid green" }} />
                            </div>
                            <div className='card-body text-center' style={{ marginTop: "-4%", marginBottom: "-3%" }}>
                                <h1>Mohd Atif Ansari</h1>
                                <div className='card bg-primary mt-3 mb-3' style={{ width: "auto", fontSize: "130%" }}>Professional</div>
                                <h1 style={{ fontSize: "600%" }}>{top3}</h1>
                                <h3>Questions</h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
