import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';
import propertyService from '../services/propertyService';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await propertyService.getProperties(filters);
      setProperties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties(getDemoProperties());
    } finally {
      setLoading(false);
    }
  };


  const getDemoProperties = () => [
    {
      _id: '1',
      title: '3BHK Apartment in South Delhi',
      price: 8500000,
      location: 'South Delhi, Delhi',
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      type: 'For Sale',
    },
    {
      _id: '2',
      title: 'Luxury Villa in Bandra West',
      price: 35000000,
      location: 'Mumbai, Maharashtra',
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
      bedrooms: 5,
      bathrooms: 4,
      area: 4200,
      type: 'For Sale',
    },
    {
      _id: '3',
      title: '2BHK Flat near IT Hub',
      price: 6800000,
      location: 'Whitefield, Bengaluru',
      images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
      bedrooms: 2,
      bathrooms: 2,
      area: 1150,
      type: 'For Sale',
    },
    {
      _id: '4',
      title: 'Penthouse in Koregaon Park',
      price: 12500000,
      location: 'Pune, Maharashtra',
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
      bedrooms: 3,
      bathrooms: 3,
      area: 2100,
      type: 'For Sale',
    },
    {
      _id: '5',
      title: 'Independent House',
      price: 9200000,
      location: 'Jaipur, Rajasthan',
      images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800'],
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      type: 'For Sale',
    },
    {
      _id: '6',
      title: '2BHK Apartment in Gachibowli',
      price: 7200000,
      location: 'Hyderabad, Telangana',
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: 'For Sale',
    },
  ];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchProperties();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
    });
    setLoading(true);
    fetchProperties();
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 pt-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Properties Across India
            </h1>
            <p className="text-xl text-white/90">
              Browse {properties.length}+ verified homes & apartments
            </p>
          </motion.div>
        </div>
      </section>

   
      <section className="bg-white shadow-md sticky top-20 z-40">
        <div className="container mx-auto px-4 py-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by city, area or project..."
              className="md:col-span-2 input-field"
            />

            <select name="type" value={filters.type} onChange={handleFilterChange} className="input-field">
              <option value="">Buy / Rent</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min Price (₹)"
              className="input-field"
            />

            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max Price (₹)"
              className="input-field"
            />

            <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange} className="input-field">
              <option value="">BHK</option>
              <option value="1">1 BHK+</option>
              <option value="2">2 BHK+</option>
              <option value="3">3 BHK+</option>
              <option value="4">4 BHK+</option>
            </select>
          </form>

          <div className="flex gap-4 mt-4">
            <button onClick={handleSearch} className="btn-primary">
              Apply Filters
            </button>
            <button onClick={clearFilters} className="btn-outline">
              Clear
            </button>
          </div>
        </div>
      </section>

     
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-dark-600">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-2">No Properties Found</h3>
              <p className="text-dark-600">Try changing filters or search location</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  {properties.length} Properties Available
                </h2>
                <select className="input-field w-52">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;
