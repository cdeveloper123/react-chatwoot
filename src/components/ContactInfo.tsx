import React from "react"

interface ContactInfoProps {
  conversationId: string
}

const ContactInfo: React.FC<ContactInfoProps> = ({ conversationId }) => {
  return (
    <div className="w-64 border-l border-gray-200 p-4">
      <h2 className="font-semibold mb-4">Contact Info</h2>
      <div className="space-y-4">
        <button className="w-full px-4 py-2 bg-white text-primary border border-primary rounded-md hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary">
          View Profile
        </button>
        <button className="w-full px-4 py-2 bg-white text-primary border border-primary rounded-md hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary">
          Add Note
        </button>
        <button className="w-full px-4 py-2 bg-white text-primary border border-primary rounded-md hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary">
          Block Contact
        </button>
      </div>
    </div>
  )
}

export default ContactInfo

