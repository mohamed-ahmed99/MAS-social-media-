import React from 'react'
import { Link } from 'react-router-dom'
import CircularImage from '../../../CircularImage'

export default function CreateCommentsFromData({ comments }) {
    return (
        comments.map((comment, index) => (
            <div
                key={index}
                className="flex items-start gap-2"
            >
                {/* author image */}
                <Link
                    to={'/profile'}
                    className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                >
                    <CircularImage
                        src={comment.img}
                        firstName='Mohamed'
                        lastName='Ahmed'
                    />
                </Link>

                {/* comment content */}
                <div className="flex-1">
                    <Link
                        to={'/profile'}
                        className="font-semibold text-sm">{comment.author}
                    </Link>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                </div>
            </div>
        ))
    )
}