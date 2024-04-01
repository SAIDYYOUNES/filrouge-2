import React, { useEffect } from 'react'
import Modal from '../utils/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { getReports,markRead } from '../Redux/Admin/actions'

export default function Reports() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getReports())
    }, [])
    function reportClick(id) {
        console.log('first')
        dispatch(markRead(id))
        setModal(false)
    }
    const { reports } = useSelector(state => state.admin);
    const count = reports.filter(report => !report.read).length
    const [modal, setModal] = React.useState(false)
    console.log(reports)
    return (
        <div className="flex items-center relative">
            <button onClick={() => setModal(true)}
                className="relative bg-green-700 hover:bg-green-800 duration-300  px-3 py-2 text-blue-100 rounded-full">reports
                <span className="absolute bg-green-700 text-green-100 px-2 py-1 text-xs font-bold rounded-full -top-3 -right-3">{count}</span>
            </button>

            <Modal modal={modal} setModal={setModal}>
                <div
                    className={`${modal ? "visible opacity-100%" : "invisible opacity-0"
                        } transition-all duration-100`}>

                    <section
                        className="absolute w-[18rem] h-[355px] overflow-y-scroll  bg-white right-0 top-[100%]
    shadows rounded-md z-50 text-gray-500 ">

                        <div className="flex flex-col border-b border-gray-300 ">
                            {reports.map((report, i) => (
                                <a
                                    onClick={()=>reportClick(report._id)}
                                    className={`flex items-center gap-2 ${report.read ? 'bg-gray-100' : 'bg-white'} hover:text-black/70 border-b border-gray-300 px-4 py-3 dark:bg-[#1a1a1a] dark:border-[#2e2005] dark:text-[#f0f0f0]`}
                                    key={i}
                                    href={'/post/' + report.post._id}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <div className="w-full items-center rounded-lg bg-warning-800 px-6 py-5 text-base text-warning-800 dark:bg-[#2e2005] dark:text-warning-500" role="alert" id="alert-static-warning" data-twe-alert-init="">
                                        {report.reason}
                                    </div>
                                </a>
                            ))}
                        </div>

                    </section>
                </div>
            </Modal>
        </div>
    )
}
