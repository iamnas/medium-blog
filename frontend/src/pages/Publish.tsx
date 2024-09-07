
import { useState } from 'react';
import AppBar from '../components/AppBar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export default function Publish() {


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')

    const nav = useNavigate()

    const handlePublish = () => {

        axios.post(`${BACKEND_URL}/api/v1/blog`, { title, content }, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then((response) => {
            // console.log(response);
            nav(`/blog/${response.data.blog.id}`)

        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <AppBar />

            <div className="bg-gray-100 flex items-center justify-center h-screen">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold mb-6">Publish Your Content</h1>

                    {/* Title Input */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            onChange={e => setTitle(e.target.value)}
                            type="text"
                            id="title"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            placeholder="Enter the title here"
                            required
                        />
                    </div>

                    {/* Content Textarea */}
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                            Content
                        </label>
                        <textarea
                            onChange={e => setContent(e.target.value)}
                            id="content"
                            className="w-full h-40 p-2 border border-gray-300 rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your content here..."
                            required
                        ></textarea>
                    </div>

                    {/* Publish Button */}
                    <button onClick={handlePublish} className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}
