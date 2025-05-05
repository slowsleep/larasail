import { useEffect, useState } from "react";

export default function TableActivity({activity}) {

    const [dates, setDates] = useState([]);
    const [color, setColor] = useState('emerald');

    const defaultColors = ['stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const paletteHints = [
        { num: '4', title: '1-5' },
        { num: '6', title: '6-10' },
        { num: '7', title: '11-25' },
        { num: '8', title: '26-50' },
        { num: '9', title: '50+' },
    ];

    useEffect(() => {
        generateDates();
    }, [activity]);

    const isSameDay = (d1, d2) => d1.setHours(0, 0, 0, 0) === d2.setHours(0, 0, 0, 0);

    const generateDates = () => {
        const currentDate = new Date();
        const count = currentDate.getDay() + (7 * 17);
        let datesArray = [];

        for (let i = 0; i < count; i++) {
                let newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() - i);

                if (activity.some((item) => isSameDay(newDate, new Date(item.created_at)))) {
                    datesArray.push({
                        date: newDate,
                        activity: activity.filter((item) => isSameDay(newDate, new Date(item.created_at)))
                    });
                } else {
                    datesArray.push({date: newDate});
                }
        }

        setDates(datesArray.reverse());
    };

    const getFormattedDate = (date) => {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    const colorOpacity = (activityLen) => {
        if (activityLen > 0 && activityLen <= 5) {
            return '4';
        } else if (activityLen > 5 && activityLen <= 10) {
            return '6';
        } else if (activityLen > 10 && activityLen <= 25) {
            return '7';
        } else if (activityLen > 25 && activityLen <= 50) {
            return '8';
        } else if (activityLen > 50) {
            return '9';
        } else {
            return false;
        }
    }

    const renderSquares = () => {
        let squares = [];
        for (let i = 0; i < dates.length; i += 7) {
            let week = dates.slice(i, i + 7);
            squares.push(
                <div key={i} className="flex flex-col">
                    {week.map(({date, activity}, index) => (
                        <Square key={index} title={getFormattedDate(date) + (activity?.length ? ` (${activity.length})` : "")} className={activity?.length ? `bg-${color}-${colorOpacity(activity.length)}00` : 'bg-white dark:bg-zinc-800'} />
                    ))}
                </div>
            );
        }
        return squares;
    }

    const changeColor = (e) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        let color = Object.fromEntries(formData).colors;
        setColor(color);
    }

    const renderMonthsRow = () => {
        let lastDateMonth = dates[0]?.date.getMonth();
        let curDateMonth = dates[dates.length - 1]?.date.getMonth();
        let months = [];

        for (; lastDateMonth <= curDateMonth; lastDateMonth++) {
            months.push(
                <p key={lastDateMonth}>{monthList[lastDateMonth]}</p>
            )
        }

        return months;
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex">
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            {weekDays.map((day) => (
                                <div key={day} className="w-10 h-4 m-1 text-sm">{day}</div>
                            ))}
                        </div>
                        {renderSquares()}
                    </div>
                    <div className="flex flex-row ml-12 items-center mt-2 text-sm justify-around">
                        {renderMonthsRow()}
                    </div>
                    <div className="flex flex-row self-end items-center mt-2 text-xs text-zinc-400">
                        <p>~ less</p>
                        {paletteHints.map(({num, title}) => (
                            <Square key={num} className={`w-3.5 h-3.5 bg-${color}-${num}00 cursor-auto hover:border-zinc-500`} title={title} />
                        ))}
                        <p>more ~</p>
                    </div>
                    <div className="flex mt-3 flex-col">
                        <p>switch color:</p>
                        <form onSubmit={changeColor}>
                            <fieldset id="colors" className="flex flex-row">
                                {defaultColors.map((color) => (
                                    <label key={color} className="content-center">
                                        <div className={`w-4 h-4 m-1 border rounded bg-${color}-600`} title={color}></div>
                                        <input className="m-1" type="radio" name="colors" value={color} required />
                                    </label>
                                ))}
                            </fieldset>
                            <button type="submit" className="p-2 rounded bg-cyan-600 hover:bg-cyan-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Square({className, ...props}) {
    return (
        <div className={"w-4 h-4 m-1 border border-zinc-500 cursor-pointer hover:border-violet-500 " + (className ? className : "bg-zinc-600")} {...props}></div>
    )
}
