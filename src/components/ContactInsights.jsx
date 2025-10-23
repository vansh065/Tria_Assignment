import React from 'react';

/**
 * ContactInsights Component
 * 
 * Displays analytics and insights about the contact list
 * 
 * @param {Array} contacts - All contacts
 * @param {number} favoriteCount - Number of favorited contacts
 */
const ContactInsights = ({ contacts, favoriteCount }) => {
  // Calculate unique first letters
  const uniqueFirstLetters = new Set(
    contacts.map(contact => contact.name.charAt(0).toUpperCase())
  ).size;

  // Find most recently added contact
  const mostRecentContact = contacts.length > 0 
    ? contacts.reduce((latest, contact) => 
        contact.id > latest.id ? contact : latest
      )
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg 
          className="w-6 h-6 text-blue-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
          />
        </svg>
        Contact Insights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Contacts */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Contacts</p>
              <p className="text-3xl font-bold text-blue-700 mt-1">{contacts.length}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        {/* Favorite Contacts */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Favorites</p>
              <p className="text-3xl font-bold text-yellow-700 mt-1">{favoriteCount}</p>
            </div>
            <div className="text-4xl">⭐</div>
          </div>
        </div>

        {/* Unique First Letters */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">First Letters</p>
              <p className="text-3xl font-bold text-purple-700 mt-1">{uniqueFirstLetters}</p>
            </div>
            <div className="text-4xl">🔤</div>
          </div>
        </div>

        {/* Most Recent Contact */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Most Recent</p>
              <p className="text-lg font-bold text-green-700 mt-1 truncate">
                {mostRecentContact ? mostRecentContact.name : 'None'}
              </p>
            </div>
            <div className="text-4xl">🆕</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInsights;

