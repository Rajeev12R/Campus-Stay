import React from 'react'
import { DollarSign, MapPin, Shield, CheckCircle } from 'react-feather';


const Feature = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-12 px-6">
  <h2 className="text-3xl font-bold text-center text-gray-900 m-3">Why Choose Campus Stay?</h2>
  <p className="text-center text-gray-600 mt-6 mb-12">Find your ideal hostel or PG with top-notch services at affordable prices. Here's why students trust us :)</p>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <div className="flex flex-col items-center">
      <DollarSign className="h-12 w-12 mb-4 text-blue-600" />
      <h3 className="text-xl font-semibold text-gray-900">Affordable Pricing</h3>
      <p className="text-gray-600 text-center mt-2">Get the best rates for hostels and PGs around your campus without breaking the bank.</p>
    </div>
    
    <div className="flex flex-col items-center">
      <MapPin className="h-12 w-12 mb-4 text-green-600" />
      <h3 className="text-xl font-semibold text-gray-900">Nearby Location</h3>
      <p className="text-gray-600 text-center mt-2">All listings are located within a convenient distance to your campus for easy commuting.</p>
    </div>
    
    <div className="flex flex-col items-center">
      <CheckCircle className="h-12 w-12 mb-4 text-yellow-500" />
      <h3 className="text-xl font-semibold text-gray-900">Verified Listings</h3>
      <p className="text-gray-600 text-center mt-2">Each property is thoroughly checked and verified to ensure a safe and comfortable stay.</p>
    </div>
    
    <div className="flex flex-col items-center">
      <Shield className="h-12 w-12 mb-4 text-red-600" />
      <h3 className="text-xl font-semibold text-gray-900">Hygienic & Safe</h3>
      <p className="text-gray-600 text-center mt-2">We prioritize cleanliness and safety, ensuring peace of mind during your stay.</p>
    </div>
  </div>
</div>

  )
}

export default Feature