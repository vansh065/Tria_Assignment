import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import AddContactForm from './components/AddContactForm';
import ContactInsights from './components/ContactInsights';
import contactsData from './data/contacts.json';

/**
 * Main App Component
 * 
 * Manages the entire contact list application:
 * - Fetches contacts from JSON file (simulated async with delay)
 * - Handles search functionality (case-insensitive, real-time filtering)
 * - Manages adding new contacts
 * - Handles favorite/starred contacts (sorted first)
 * - Delete with undo functionality
 * - Displays contact insights and analytics
 * - Displays toast notifications
 */
function App() {
  // State Management
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [deletedContact, setDeletedContact] = useState(null);

  /**
   * Simulate async API fetch of contacts on component mount
   * Uses setTimeout to mimic network delay
   * Adds isFavorite property to each contact
   */
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      
      // Simulate API call with 1.5 second delay
      setTimeout(() => {
        // Add isFavorite property to each contact (default false)
        const contactsWithFavorites = contactsData.map(contact => ({
          ...contact,
          isFavorite: false
        }));
        setContacts(contactsWithFavorites);
        setFilteredContacts(contactsWithFavorites);
        setLoading(false);
      }, 1500);
    };

    fetchContacts();
  }, []);

  /**
   * Filter contacts based on search query and sort by favorites
   * Triggered whenever searchQuery or contacts array changes
   * Case-insensitive search on contact names
   * Favorites are always displayed first
   */
  useEffect(() => {
    let filtered;
    if (searchQuery.trim() === '') {
      filtered = [...contacts];
    } else {
      filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort: Favorites first, then alphabetically
    const sorted = filtered.sort((a, b) => {
      // Favorites come first
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      // Within same favorite status, sort alphabetically
      return a.name.localeCompare(b.name);
    });
    
    setFilteredContacts(sorted);
  }, [searchQuery, contacts]);

  /**
   * Handle search input changes
   * @param {string} query - Search query string
   */
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  /**
   * Add new contact to the contacts list
   * @param {Object} newContact - New contact object to add
   */
  const handleAddContact = (newContact) => {
    const contactWithFavorite = { ...newContact, isFavorite: false };
    setContacts((prevContacts) => [contactWithFavorite, ...prevContacts]);
    showToast(`✓ ${newContact.name} added successfully!`, 'success');
  };

  /**
   * Toggle favorite status of a contact
   * @param {number} contactId - ID of contact to toggle
   */
  const handleToggleFavorite = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
    
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      const action = contact.isFavorite ? 'removed from' : 'added to';
      showToast(`${contact.name} ${action} favorites`, 'success');
    }
  };

  /**
   * Delete a contact
   * @param {number} contactId - ID of contact to delete
   */
  const handleDeleteContact = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      setDeletedContact(contact);
      setContacts((prevContacts) => prevContacts.filter(c => c.id !== contactId));
      showToast(`${contact.name} deleted — Undo?`, 'delete');
    }
  };

  /**
   * Undo the last delete action
   */
  const handleUndoDelete = () => {
    if (deletedContact) {
      setContacts((prevContacts) => [...prevContacts, deletedContact]);
      showToast(`${deletedContact.name} restored!`, 'success');
      setDeletedContact(null);
    }
  };

  /**
   * Display toast notification
   * @param {string} message - Toast message to display
   * @param {string} type - Type of toast (success or delete)
   */
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    
    // Auto-hide toast after 5 seconds (longer for delete to allow undo)
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
      // Clear deleted contact after toast disappears
      if (type === 'delete') {
        setDeletedContact(null);
      }
    }, 5000);
  };

  // Calculate favorite count for insights
  const favoriteCount = contacts.filter(c => c.isFavorite).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Contact List
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your contacts efficiently
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contact Insights (shown when not loading) */}
        {!loading && (
          <ContactInsights 
            contacts={contacts}
            favoriteCount={favoriteCount}
          />
        )}

        {/* Add Contact Form */}
        <AddContactForm onAddContact={handleAddContact} />

        {/* Search Bar */}
        <SearchBar 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
        />

        {/* Stats Bar (shown when not loading) */}
        {!loading && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-blue-600">{filteredContacts.length}</span> of{' '}
              <span className="font-semibold text-blue-600">{contacts.length}</span> contacts
              {favoriteCount > 0 && (
                <span className="ml-2">
                  · <span className="font-semibold text-yellow-600">{favoriteCount}</span> favorited
                </span>
              )}
            </p>
          </div>
        )}

        {/* Contact List */}
        <ContactList 
          contacts={filteredContacts} 
          loading={loading}
          searchQuery={searchQuery}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDeleteContact}
        />
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-gray-500">
        <p>Built with React & TailwindCSS</p>
        <p className="text-sm mt-1">Tria Assignment - Contact List App</p>
      </footer>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-8 right-8 px-6 py-3 rounded-lg shadow-lg animate-slide-up flex items-center gap-3 ${
          toast.type === 'delete' 
            ? 'bg-orange-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          <span>{toast.message}</span>
          
          {/* Undo Button (only for delete toasts) */}
          {toast.type === 'delete' && deletedContact && (
            <button
              onClick={handleUndoDelete}
              className="ml-2 px-3 py-1 bg-white text-orange-600 rounded font-semibold hover:bg-orange-50 transition-colors"
            >
              UNDO
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

