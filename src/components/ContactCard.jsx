import React from 'react';

/**
 * ContactCard Component
 * 
 * Displays an individual contact's information in a card layout
 * 
 * @param {Object} contact - Contact object containing id, name, email, phone, isFavorite
 * @param {function} onToggleFavorite - Callback to toggle favorite status
 * @param {function} onDelete - Callback to delete contact
 */
const ContactCard = ({ contact, onToggleFavorite, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 animate-slide-up relative">
      {/* Star/Favorite Button */}
      <button
        onClick={() => onToggleFavorite(contact.id)}
        className="absolute top-4 right-4 text-2xl transition-transform hover:scale-110"
        title={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {contact.isFavorite ? '⭐' : '☆'}
      </button>

      <div className="flex items-center mb-4">
        {/* Avatar with first letter of name */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
          {contact.isFavorite && (
            <span className="text-xs text-yellow-600 font-medium">Favorite</span>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        {/* Email */}
        <div className="flex items-center text-gray-600">
          <svg 
            className="w-4 h-4 mr-2 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
          <span className="text-sm break-all">{contact.email}</span>
        </div>
        
        {/* Phone */}
        <div className="flex items-center text-gray-600">
          <svg 
            className="w-4 h-4 mr-2 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
            />
          </svg>
          <span className="text-sm">{contact.phone}</span>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(contact.id)}
        className="mt-4 w-full py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
          />
        </svg>
        Delete Contact
      </button>
    </div>
  );
};

export default ContactCard;

