import Avatar from './Avatar'
import { Link } from 'react-router-dom'

export default function AppBar() {
    return (
        <div className='border-b flex justify-between px-10 py-4'>
            <Link to={'/'} className='flex justify-center flex-col cursor-pointer'>
                Medium
            </Link>
                <div>
                    <Link to={'/publish'} >
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">new</button>
                    </Link>
                    <Avatar authorName='HAR' />
                </div>

        </div>
    )
}
