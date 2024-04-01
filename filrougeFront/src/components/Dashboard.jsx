import Loading from "./Loading";
import { FaBan } from "react-icons/fa";
import React, { useEffect ,useState} from 'react'
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import Reports from "./Reports";
import { getUsers ,ban } from "../Redux/Admin/actions";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { user } = useSelector(state => state.users);
    const { users } = useSelector(state => state.admin);
    const searchedUsers = users.filter(user => user._id.toLowerCase().includes(search.toLowerCase()));

    if (user.role !== 'admin') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You are not authorized to view this page',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/')
            }
        })
    } else {

        useEffect(() => {
            dispatch(getUsers());
        }, []);
        const banUser = (id) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, ban it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(ban(id));
                    Swal.fire(
                        'Banned!',
                        'User has been banned.',
                        'success'
                    )
                }
            })
        }

        const dispatch = useDispatch();
        return (
            <>
                {user.role !== 'admin' ? <Loading /> : (<div className="container mx-auto">
                    <div className="flex w-full justify-around mt-7">
                        <h2 className="p-4 text-xl font-semibold ">Reports</h2>
                        <Reports />
    
                    </div>
                    <div className='max-w-md mx-auto'>
                        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg border bg-white overflow-hidden">
                            <div className="grid place-items-center h-full w-12 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
    
                            <input
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                id="search"
                                name="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for a user" />
                        </div>
                    </div>
                    <div className="my-4 bg-white rounded-lg p-4  shadow-black/30">
                        <div className="p-4 text-xl font-semibold ">
                            <p>Users</p>
                        </div>
                        {false && <Loading />}
                        <div className="relative overflow-x-auto">
                            {
                                searchedUsers?.length > 0 ?
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs uppercase text-[#555a61]">
                                            <tr className="border-b border-[#a0a4ab]">
                                                <th scope="col" className="px-6 py-3">
                                                    name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    email
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Role
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Statu
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {
                                                searchedUsers && searchedUsers?.map((user) => (
                                                    <tr key={user._id} className="border-b border-[#dedddd] hover:bg-[#e9e9e9]">
                                                        <td className="px-6 py-4 font-medium whitespace-nowrap flex items-center mx-w-[300px]">
                                                            {/* <ReactPlayer url={user.videos[0]} width={'120px'} height={'70px'} className="w-20 aspect-square object-contain" /> */}
                                                            <div className="ps-3">
                                                                <div className="text-base font-semibold">{user.name}</div>
                                                                <p className="text-ellipsis font-normal text-gray-500 break-word max-w-[300px] overflow-hidden">{user.description}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {user.email}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {user.role}
                                                        </td>
                                                        <td className={`px-6 py-4 font-semibold ${user.banned ? 'text-red-500' : 'text-black'} `}>
                                                            {user.banned ? 'Banned' : 'Active'}
                                                        </td>
                                                        <td className="px-6 gap-6">
                                                            {/* <button className="text-green-500">Edit</button> */}
                                                            <button className="text-banner flex items-center gap-2"
                                                            onClick={() => banUser(user._id)}
                                                            >
                                                                <FaBan /> Ban
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table> :
                                    <div className="p-4">No course Found, create your own course</div>
                            }
                        </div>
                    </div>
    
                </div>)}
    
            </>
        )
    }
}

export default Dashboard