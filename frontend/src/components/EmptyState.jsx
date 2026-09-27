import React from 'react'

const EmptyState = ({ message }) => {
    return (
        <div className="bg-gray-900 border border-gray-700 rounded-xl px-8 py-12 text-center text-gray-400">
            {message}
        </div>
    )
}

export default EmptyState
