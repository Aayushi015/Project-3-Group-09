const AqiTable = () => {
    const aqiCategories = [
      { 
        range: '0 - 50', 
        category: 'Good', 
        color: 'bg-green-500',
        description: 'Air quality is satisfactory with little to no risk'
      },
      { 
        range: '51 - 100', 
        category: 'Moderate', 
        color: 'bg-yellow-500',
        description: 'Acceptable quality, but some pollutants may affect sensitive individuals'
      },
      { 
        range: '101 - 150', 
        category: 'Unhealthy for Sensitive Groups', 
        color: 'bg-orange-500',
        description: 'General public not affected but people with respiratory/lung conditions at risk'
      },
      { 
        range: '151 - 200', 
        category: 'Unhealthy', 
        color: 'bg-red-500',
        description: 'Everyone may experience health effects; sensitive groups more severely affected'
      },
      { 
        range: '201 - 300', 
        category: 'Very Unhealthy', 
        color: 'bg-purple-500',
        description: 'Health warnings of emergency conditions for entire population'
      },
      { 
        range: '301 - 500', 
        category: 'Hazardous', 
        color: 'bg-rose-800',
        description: 'Health alert - serious risk of respiratory effects for all people'
      },
    ];
  
    return (
      <div className="overflow-x-auto rounded-lg shadow-lg mb-8 border border-gray-200">
        <table className="min-w-full table-auto">
          <caption className="sr-only">Air Quality Index (AQI) Categories and Health Implications</caption>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">AQI Range</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Health Implications</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Color</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {aqiCategories.map((category, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                  {category.range}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                  {category.category}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-normal max-w-xs">
                  {category.description}
                </td>
                <td className="flex justify-center px-4 py-4 whitespace-nowrap">
                  <div className={`w-12 h-6 rounded-md ${category.color} shadow-inner`}></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default AqiTable;